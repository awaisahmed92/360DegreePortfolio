<?php
declare(strict_types=1);

if (realpath((string) ($_SERVER['SCRIPT_FILENAME'] ?? '')) === __FILE__) {
    http_response_code(403);
    exit;
}

const ADMIN_PAGE_SIZE = 50;
const ADMIN_MAX_FAILURES = 5;
const ADMIN_LOCK_SECONDS = 120;
const ADMIN_DUMMY_HASH = '$2y$10$./HoqazXnfcrxEs3FLB7buRF4DpAusfbx2prJ.ofjAIaRMdtrxTDy';

function admin_base_path(): string
{
    $script = str_replace('\\', '/', (string) ($_SERVER['SCRIPT_NAME'] ?? '/admin/index.php'));
    $dir = rtrim(dirname($script), '/');

    return ($dir === '' || $dir === '.') ? '/admin' : $dir;
}

function admin_boot(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }

    $https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');

    session_name('TECHXADMIN');
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => admin_base_path(),
        'httponly' => true,
        'samesite' => 'Lax',
        'secure' => $https,
    ]);
    session_start();
}

function admin_pdo(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $host = getenv('MASTER_HOST') ?: '127.0.0.1';
    $port = getenv('MASTER_PORT') ?: '3306';
    $dbName = getenv('MASTER_DB') ?: 'hr360_master';
    $user = getenv('MASTER_USER') ?: 'root';
    $pass = getenv('MASTER_PASS') !== false ? (string) getenv('MASTER_PASS') : '';

    if (!preg_match('/^[A-Za-z0-9_]+$/', $dbName) || !preg_match('/^\d+$/', (string) $port)) {
        throw new RuntimeException('Master database settings are invalid.');
    }

    $pdo = new PDO(
        "mysql:host={$host};port={$port};dbname={$dbName};charset=utf8mb4",
        $user,
        $pass,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );

    return $pdo;
}

function admin_h(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function admin_url(array $query = []): string
{
    $base = admin_base_path() . '/';
    if ($query === []) {
        return $base;
    }

    return $base . '?' . http_build_query($query);
}

function admin_csrf_token(): string
{
    if (empty($_SESSION['csrf']) || !is_string($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }

    return $_SESSION['csrf'];
}

function admin_csrf_ok(): bool
{
    $sent = (string) ($_POST['csrf'] ?? '');
    $known = (string) ($_SESSION['csrf'] ?? '');

    return $sent !== '' && $known !== '' && hash_equals($known, $sent);
}

function admin_logged_in(): bool
{
    return !empty($_SESSION['admin_id']) && is_string($_SESSION['admin_username'] ?? null) && $_SESSION['admin_username'] !== '';
}

function admin_lock_remaining(): ?int
{
    $until = (int) ($_SESSION['login_locked_until'] ?? 0);
    if ($until > time()) {
        return $until - time();
    }

    unset($_SESSION['login_locked_until']);

    return null;
}

function admin_note_failure(): void
{
    $count = (int) ($_SESSION['login_failures'] ?? 0) + 1;
    $_SESSION['login_failures'] = $count;
    if ($count >= ADMIN_MAX_FAILURES) {
        $_SESSION['login_locked_until'] = time() + ADMIN_LOCK_SECONDS;
        $_SESSION['login_failures'] = 0;
    }
}

function admin_attempt(PDO $pdo, string $username, string $password): bool
{
    $stmt = $pdo->prepare(
        'SELECT id, username, password_hash FROM platform_admins WHERE username = ? LIMIT 1'
    );
    $stmt->execute([$username]);
    $row = $stmt->fetch();

    $hash = is_array($row) ? (string) $row['password_hash'] : ADMIN_DUMMY_HASH;
    $ok = password_verify($password, $hash);
    if (!$ok || !is_array($row)) {
        admin_note_failure();

        return false;
    }

    session_regenerate_id(true);
    $_SESSION['admin_id'] = (int) $row['id'];
    $_SESSION['admin_username'] = (string) $row['username'];
    $_SESSION['login_failures'] = 0;
    unset($_SESSION['login_locked_until']);
    $_SESSION['csrf'] = bin2hex(random_bytes(32));

    return true;
}

function admin_tables(PDO $pdo): array
{
    $stmt = $pdo->query(
        "SELECT TABLE_NAME
         FROM information_schema.TABLES
         WHERE TABLE_SCHEMA = DATABASE()
           AND TABLE_TYPE = 'BASE TABLE'
         ORDER BY TABLE_NAME"
    );

    $names = [];
    foreach ($stmt->fetchAll() as $row) {
        $name = (string) $row['TABLE_NAME'];
        if (preg_match('/^[A-Za-z0-9_]+$/', $name)) {
            $names[] = $name;
        }
    }

    return $names;
}

function admin_columns(PDO $pdo, string $table): array
{
    $stmt = $pdo->prepare(
        'SELECT COLUMN_NAME, DATA_TYPE, COLUMN_KEY
         FROM information_schema.COLUMNS
         WHERE TABLE_SCHEMA = DATABASE()
           AND TABLE_NAME = ?
         ORDER BY ORDINAL_POSITION'
    );
    $stmt->execute([$table]);

    $columns = [];
    foreach ($stmt->fetchAll() as $row) {
        $name = (string) $row['COLUMN_NAME'];
        if (!preg_match('/^[A-Za-z0-9_]+$/', $name)) {
            continue;
        }
        $columns[] = [
            'name' => $name,
            'type' => strtolower((string) $row['DATA_TYPE']),
            'key' => (string) $row['COLUMN_KEY'],
        ];
    }

    return $columns;
}

function admin_is_text(string $type): bool
{
    return in_array($type, [
        'char',
        'varchar',
        'tinytext',
        'text',
        'mediumtext',
        'longtext',
        'enum',
        'set',
    ], true);
}

function admin_is_sensitive(string $column): bool
{
    return (bool) preg_match('/password|secret|token/i', $column);
}

function admin_quote(string $ident): string
{
    return '`' . str_replace('`', '``', $ident) . '`';
}

function admin_page(PDO $pdo, string $table, array $columns, string $search, int $page): array
{
    $textColumns = [];
    $orderColumns = [];
    foreach ($columns as $column) {
        if (admin_is_text($column['type'])) {
            $textColumns[] = $column['name'];
        }
        if ($column['key'] === 'PRI') {
            $orderColumns[] = $column['name'];
        }
    }
    if ($orderColumns === [] && $columns !== []) {
        $orderColumns[] = $columns[0]['name'];
    }

    $where = '';
    $params = [];
    $search = trim($search);
    if ($search !== '' && $textColumns !== []) {
        $like = '%' . addcslashes($search, "\\%_") . '%';
        $parts = [];
        foreach ($textColumns as $name) {
            $parts[] = admin_quote($name) . ' LIKE ?';
            $params[] = $like;
        }
        $where = ' WHERE (' . implode(' OR ', $parts) . ')';
    }

    $from = admin_quote($table);
    $count = $pdo->prepare('SELECT COUNT(*) FROM ' . $from . $where);
    $count->execute($params);
    $total = (int) $count->fetchColumn();

    $pages = max(1, (int) ceil($total / ADMIN_PAGE_SIZE));
    $page = min(max(1, $page), $pages);
    $offset = ($page - 1) * ADMIN_PAGE_SIZE;

    $order = '';
    if ($orderColumns !== []) {
        $order = ' ORDER BY ' . implode(', ', array_map('admin_quote', $orderColumns));
    }

    $sql = 'SELECT * FROM ' . $from . $where . $order
        . ' LIMIT ' . ADMIN_PAGE_SIZE . ' OFFSET ' . $offset;
    $rows = $pdo->prepare($sql);
    $rows->execute($params);

    return [
        'rows' => $rows->fetchAll(),
        'total' => $total,
        'page' => $page,
        'pages' => $pages,
        'searchable' => $textColumns !== [],
    ];
}

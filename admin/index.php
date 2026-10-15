<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

admin_boot();

header('Content-Type: text/html; charset=utf-8');
header('X-Robots-Tag: noindex, nofollow');
header('X-Frame-Options: DENY');
header('Referrer-Policy: no-referrer');
header('Cache-Control: no-store');

$error = '';
$pdo = null;

try {
    $pdo = admin_pdo();
} catch (Throwable $e) {
    $error = 'Master database is unavailable.';
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = (string) ($_POST['action'] ?? '');
    if (!admin_csrf_ok()) {
        $error = 'The form expired. Try again.';
    } elseif ($action === 'logout') {
        $_SESSION = [];
        if (ini_get('session.use_cookies')) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'] ?? '', (bool) $params['secure'], (bool) $params['httponly']);
        }
        session_destroy();
        header('Location: ' . admin_url());
        exit;
    } elseif ($action === 'login') {
        $wait = admin_lock_remaining();
        if ($pdo === null) {
            $error = $error !== '' ? $error : 'Master database is unavailable.';
        } elseif ($wait !== null) {
            $error = 'Too many attempts. Try again in ' . $wait . ' seconds.';
        } else {
            $username = trim((string) ($_POST['username'] ?? ''));
            $password = (string) ($_POST['password'] ?? '');
            if ($username === '' || $password === '') {
                $error = 'Username and password are required.';
            } else {
                try {
                    $ok = admin_attempt($pdo, $username, $password);
                } catch (PDOException $e) {
                    $ok = false;
                    $error = (string) $e->getCode() === '42S02'
                        ? 'Admin login is not set up yet.'
                        : 'Master database is unavailable.';
                }
                if ($ok) {
                    header('Location: ' . admin_url());
                    exit;
                }
                if ($error === '') {
                    $wait = admin_lock_remaining();
                    $error = $wait !== null
                        ? 'Too many attempts. Try again in ' . $wait . ' seconds.'
                        : 'Invalid username or password.';
                }
            }
        }
    }
}

if (!admin_logged_in() || $pdo === null) {
    admin_render_login($error);
    exit;
}

$tables = admin_tables($pdo);
$requested = isset($_GET['table']) ? (string) $_GET['table'] : '';
$unknown = false;
if ($requested === '') {
    $active = $tables[0] ?? '';
} elseif (!in_array($requested, $tables, true)) {
    $active = '';
    $unknown = true;
} else {
    $active = $requested;
}

$search = trim((string) ($_GET['q'] ?? ''));
$page = (int) ($_GET['page'] ?? 1);
$columns = [];
$result = null;
if ($active !== '') {
    $columns = admin_columns($pdo, $active);
    $result = admin_page($pdo, $active, $columns, $search, $page);
}

admin_render_app($tables, $active, $unknown, $search, $columns, $result);

function admin_render_login(string $error): void
{
    $token = admin_csrf_token();
    ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title>Sign in — 360techx</title>
  <style><?php admin_styles(); ?></style>
</head>
<body class="login-body">
  <main class="login-card">
    <p class="brand">360techx</p>
    <h1>Master database</h1>
    <p class="lede">Sign in to review registry data.</p>
    <?php if ($error !== ''): ?>
      <p class="alert" role="alert"><?= admin_h($error) ?></p>
    <?php endif; ?>
    <form method="post" action="<?= admin_h(admin_url()) ?>" autocomplete="off">
      <input type="hidden" name="csrf" value="<?= admin_h($token) ?>">
      <input type="hidden" name="action" value="login">
      <label>
        Username
        <input name="username" type="text" required autofocus autocomplete="username">
      </label>
      <label>
        Password
        <input name="password" type="password" required autocomplete="current-password">
      </label>
      <button type="submit">Sign in</button>
    </form>
  </main>
</body>
</html>
    <?php
}

function admin_render_app(array $tables, string $active, bool $unknown, string $search, array $columns, ?array $result): void
{
    $username = (string) $_SESSION['admin_username'];
    $token = admin_csrf_token();
    ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title><?= $active !== '' ? admin_h($active) . ' — ' : '' ?>360techx master</title>
  <style><?php admin_styles(); ?></style>
</head>
<body class="app-body">
  <aside class="sidebar">
    <div class="sidebar-head">
      <p class="brand">360techx</p>
      <p class="sidebar-label">Master tables</p>
    </div>
    <nav>
      <?php if ($tables === []): ?>
        <p class="empty-nav">No tables found.</p>
      <?php endif; ?>
      <?php foreach ($tables as $table): ?>
        <a class="<?= $table === $active ? 'is-active' : '' ?>" href="<?= admin_h(admin_url(['table' => $table])) ?>"><?= admin_h($table) ?></a>
      <?php endforeach; ?>
    </nav>
  </aside>
  <div class="main">
    <header class="topbar">
      <div>
        <p class="eyebrow">hr360_master</p>
        <h1><?= $active !== '' ? admin_h($active) : 'Master database' ?></h1>
      </div>
      <form method="post" action="<?= admin_h(admin_url()) ?>">
        <span class="who"><?= admin_h($username) ?></span>
        <input type="hidden" name="csrf" value="<?= admin_h($token) ?>">
        <input type="hidden" name="action" value="logout">
        <button type="submit" class="ghost">Log out</button>
      </form>
    </header>
    <section class="content">
      <?php if ($unknown): ?>
        <p class="empty">That table is not in the master database.</p>
      <?php elseif ($active === '' || $result === null): ?>
        <p class="empty">The master database has no tables yet.</p>
      <?php else: ?>
        <div class="toolbar">
          <p class="count"><?= (int) $result['total'] ?> row<?= $result['total'] === 1 ? '' : 's' ?></p>
          <?php if ($result['searchable']): ?>
            <form class="search" method="get" action="<?= admin_h(admin_url()) ?>">
              <input type="hidden" name="table" value="<?= admin_h($active) ?>">
              <input type="search" name="q" value="<?= admin_h($search) ?>" placeholder="Search text columns">
              <button type="submit">Search</button>
              <?php if ($search !== ''): ?>
                <a class="text-link" href="<?= admin_h(admin_url(['table' => $active])) ?>">Clear</a>
              <?php endif; ?>
            </form>
          <?php endif; ?>
        </div>
        <?php if ($result['rows'] === []): ?>
          <p class="empty"><?= $search !== '' ? 'No rows match that search.' : 'This table has no rows.' ?></p>
        <?php else: ?>
          <div class="grid-wrap">
            <table>
              <thead>
                <tr>
                  <?php foreach ($columns as $column): ?>
                    <th><?= admin_h($column['name']) ?></th>
                  <?php endforeach; ?>
                </tr>
              </thead>
              <tbody>
                <?php foreach ($result['rows'] as $row): ?>
                  <tr>
                    <?php foreach ($columns as $column): ?>
                      <td><?php admin_cell($row[$column['name']] ?? null, $column['name']); ?></td>
                    <?php endforeach; ?>
                  </tr>
                <?php endforeach; ?>
              </tbody>
            </table>
          </div>
          <?php if ($result['pages'] > 1): ?>
            <nav class="pager" aria-label="Pages">
              <?php if ($result['page'] > 1): ?>
                <a href="<?= admin_h(admin_url(admin_query($active, $search, $result['page'] - 1))) ?>">Previous</a>
              <?php endif; ?>
              <span>Page <?= (int) $result['page'] ?> of <?= (int) $result['pages'] ?></span>
              <?php if ($result['page'] < $result['pages']): ?>
                <a href="<?= admin_h(admin_url(admin_query($active, $search, $result['page'] + 1))) ?>">Next</a>
              <?php endif; ?>
            </nav>
          <?php endif; ?>
        <?php endif; ?>
      <?php endif; ?>
    </section>
  </div>
  <script>
    document.querySelectorAll('.secret-toggle').forEach(function (button) {
      button.addEventListener('click', function () {
        var cell = button.closest('.secret');
        var value = cell.querySelector('.secret-value');
        var mask = cell.querySelector('.secret-mask');
        var open = value.hidden;
        value.hidden = !open;
        mask.hidden = open;
        button.textContent = open ? 'Hide' : 'Show';
      });
    });
  </script>
</body>
</html>
    <?php
}

function admin_query(string $table, string $search, int $page): array
{
    $query = ['table' => $table];
    if ($search !== '') {
        $query['q'] = $search;
    }
    if ($page > 1) {
        $query['page'] = $page;
    }

    return $query;
}

function admin_cell(mixed $value, string $column): void
{
    if ($value === null) {
        echo '<span class="muted">—</span>';
        return;
    }

    $text = is_scalar($value) ? (string) $value : json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if ($text === false) {
        $text = '';
    }

    if (admin_is_sensitive($column)) {
        if ($text === '') {
            echo '<span class="muted">empty</span>';
            return;
        }
        echo '<span class="secret"><span class="secret-mask">••••••••</span><span class="secret-value" hidden>'
            . admin_h($text)
            . '</span> <button type="button" class="secret-toggle">Show</button></span>';
        return;
    }

    echo '<span class="cell">' . admin_h($text) . '</span>';
}

function admin_styles(): void
{
    ?>
    :root {
      --ink: #0f172a;
      --muted: #64748b;
      --line: #e2e8f0;
      --bg: #f8fafc;
      --card: #fff;
      --blue: #2563eb;
      --blue-dark: #1d4ed8;
      --sidebar: #0f172a;
      --sidebar-text: #e2e8f0;
      --danger-bg: #fef2f2;
      --danger: #b91c1c;
    }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: Inter, system-ui, Segoe UI, sans-serif; color: var(--ink); background: var(--bg); }
    button, input { font: inherit; }
    .brand { margin: 0; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; font-size: 0.78rem; }
    .login-body { min-height: 100vh; display: grid; place-items: center; padding: 24px; }
    .login-card { width: min(420px, 100%); background: var(--card); border: 1px solid var(--line); border-radius: 16px; padding: 32px; box-shadow: 0 12px 40px rgba(15, 23, 42, 0.08); }
    .login-card h1 { margin: 12px 0 4px; font-size: 1.6rem; }
    .lede { margin: 0 0 20px; color: var(--muted); }
    label { display: block; margin-bottom: 14px; font-size: 0.92rem; font-weight: 600; }
    input[type="text"], input[type="password"], input[type="search"] { width: 100%; margin-top: 6px; padding: 10px 12px; border: 1px solid var(--line); border-radius: 8px; background: #fff; }
    button { border: 0; border-radius: 8px; background: var(--blue); color: #fff; padding: 10px 16px; cursor: pointer; font-weight: 600; }
    button:hover { background: var(--blue-dark); }
    button.ghost { background: transparent; color: var(--ink); border: 1px solid var(--line); }
    button.ghost:hover { background: #f1f5f9; }
    .alert { background: var(--danger-bg); color: var(--danger); padding: 10px 12px; border-radius: 8px; margin: 0 0 16px; }
    .app-body { min-height: 100vh; display: grid; grid-template-columns: 260px 1fr; }
    .sidebar { background: var(--sidebar); color: var(--sidebar-text); padding: 20px 14px; }
    .sidebar-head { padding: 0 8px 16px; }
    .sidebar-label { margin: 8px 0 0; color: #94a3b8; font-size: 0.8rem; }
    .sidebar nav { display: flex; flex-direction: column; gap: 4px; }
    .sidebar a { color: var(--sidebar-text); text-decoration: none; padding: 8px 10px; border-radius: 8px; font-size: 0.92rem; word-break: break-word; }
    .sidebar a:hover, .sidebar a.is-active { background: #1e293b; }
    .sidebar a.is-active { color: #fff; }
    .empty-nav { color: #94a3b8; padding: 0 8px; }
    .main { min-width: 0; }
    .topbar { display: flex; justify-content: space-between; gap: 16px; align-items: center; padding: 20px 28px; border-bottom: 1px solid var(--line); background: var(--card); }
    .topbar h1 { margin: 0; font-size: 1.35rem; }
    .eyebrow { margin: 0 0 4px; color: var(--muted); font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.04em; }
    .topbar form { display: flex; align-items: center; gap: 12px; }
    .who { color: var(--muted); }
    .content { padding: 20px 28px 40px; }
    .toolbar { display: flex; justify-content: space-between; gap: 16px; align-items: center; margin-bottom: 16px; flex-wrap: wrap; }
    .count { margin: 0; color: var(--muted); }
    .search { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
    .search input { width: 240px; margin: 0; }
    .text-link { color: var(--blue); }
    .grid-wrap { overflow: auto; border: 1px solid var(--line); border-radius: 12px; background: var(--card); }
    table { border-collapse: collapse; width: max-content; min-width: 100%; }
    th, td { text-align: left; padding: 10px 12px; border-bottom: 1px solid var(--line); vertical-align: top; font-size: 0.9rem; }
    th { background: #f8fafc; position: sticky; top: 0; white-space: nowrap; }
    .cell { display: block; max-width: 360px; max-height: 120px; overflow: auto; white-space: pre-wrap; word-break: break-word; }
    .muted { color: var(--muted); }
    .secret-toggle { padding: 4px 8px; font-size: 0.78rem; }
    .empty { padding: 28px; background: var(--card); border: 1px dashed var(--line); border-radius: 12px; color: var(--muted); }
    .pager { display: flex; gap: 16px; align-items: center; margin-top: 16px; }
    .pager a { color: var(--blue); }
    @media (max-width: 800px) {
      .app-body { grid-template-columns: 1fr; }
      .sidebar nav { flex-direction: row; flex-wrap: wrap; }
      .content, .topbar { padding-left: 16px; padding-right: 16px; }
    }
    <?php
}

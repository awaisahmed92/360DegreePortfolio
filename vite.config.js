import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173,
    host: true,
    open: false
  },
  build: {
    target: 'esnext'
  },
  plugins: [
    {
      name: 'public-folder-prefix',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url && req.url.startsWith('/public/')) {
            const q = req.url.indexOf('?');
            const path = q === -1 ? req.url : req.url.slice(0, q);
            const query = q === -1 ? '' : req.url.slice(q);
            req.url = path.replace(/^\/public/, '') + query;
          }
          next();
        });
      },
      transformIndexHtml: {
        order: 'pre',
        handler(html, ctx) {
          if (ctx.server) return html;
          return html
            .replaceAll('href="public/', 'href="')
            .replaceAll('src="public/', 'src="')
            .replaceAll('url("public/', 'url("');
        }
      }
    }
  ]
});

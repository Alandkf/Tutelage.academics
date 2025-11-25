## Production Cookie & Session Checklist (Behind a Proxy)

Use this checklist when deploying the backend behind a TLS-terminating reverse proxy (e.g., Nginx, Cloudflare, Vercel/Render gateway) to ensure authentication cookies work.

### Environment
- Set `NODE_ENV=production` in `backend/.env`.
- Set `FRONTEND_URL=https://<your-frontend-domain>` (no trailing slash).
- Ensure HTTPS is enabled end-to-end on the public URL.

### Express Server
- Trust the proxy so Express recognizes HTTPS and sets `Secure` cookies:

```js
// backend/app.js
app.set('trust proxy', 1);

const SESSION_CONFIG = {
  proxy: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    httpOnly: true,
  },
  // ...other settings
};
```

### CORS & Credentials
- Backend CORS origin should match `FRONTEND_URL` exactly.
- Enable credentials and allow cookies:
  - `credentials: true` in CORS.
  - Frontend requests must send `credentials: 'include'`.

### Why This Matters
- Browsers require `Secure` when `SameSite=None`; without HTTPS, auth cookies won’t persist.
- Behind a proxy, Express needs `trust proxy` to treat requests as secure based on `X-Forwarded-Proto`.

### Validate Deployment
1. Check the root endpoint: `GET /` returns `environment: production`.
2. Login flow sets a cookie with attributes: `Secure; HttpOnly; SameSite=None`.
3. Cross-origin requests from your frontend succeed with cookies attached.
4. Inspect the network tab; confirm the `Set-Cookie` response and that subsequent requests include the cookie.

### Troubleshooting
- Cookie missing in production:
  - Confirm HTTPS is active and not downgraded by proxies.
  - Ensure `trust proxy` is set and `X-Forwarded-Proto: https` is forwarded.
  - Verify `FRONTEND_URL` matches the actual origin exactly.
- CORS preflight failures:
  - Check `Access-Control-Allow-Origin` equals your frontend.
  - Ensure `Access-Control-Allow-Credentials: true` is present.
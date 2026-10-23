# Workspace

React + Vite app with Material UI authentication screens and a protected dashboard.

Run `npm install`, then `npm run dev`. Validation: `npm run lint` and `npm run build`.

Routes: `/#/login`, `/#/register`, `/#/forgot-password`, `/#/reset-password?token=...`, and `/#/dashboard`.
Hash routing works on static hosting without rewrite rules.

Shared components live in `src/components`, screens in `src/pages`, authentication in `src/auth`, and styling in `src/theme.js`.

Registration signs the user in. Sessions last 24 hours. Recovery displays a demo link valid for 15 minutes; resetting consumes the token and signs the user out. Forms validate names, email addresses, password length, and matching passwords.

This is frontend demo authentication. Accounts and sessions are stored in localStorage; passwords are salted and derived using PBKDF2. Reset links appear on screen instead of being emailed. Browser storage and frontend route guards are not security boundaries. For production, replace `src/auth/authService.js` with a backend API providing server validation, secure cookie sessions, password hashing, rate limiting, and emailed recovery tokens. Use test credentials only.

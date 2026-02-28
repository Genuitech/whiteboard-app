# Secure Client Intake App Scaffold

## Run locally
```bash
cd secure-client-intake/app
npm install
npm run dev
```

Open: http://localhost:3000

## Included
- `/` public landing page
- `/intake` secure form scaffold
- `/api/auth/request-link` create one-time magic link
- `/api/auth/verify?token=...` consumes link and creates secure session cookie
- `/api/intake` authenticated + validated intake endpoint (Zod)
- AES-256-GCM encryption helper for sensitive field storage
- Audit event writer for key auth/submit events

## Setup
1. Copy `.env.example` to `.env.local` and fill values.
2. Run DB schema in `db/schema.sql`.
3. Start app with `npm run dev`.

## Important TODOs before production
1. Replace direct encryption key env with cloud KMS + envelope key management.
2. Add transactional email provider to send magic links (no devLink response in prod).
3. Add staff portal with MFA and RBAC.
4. Add rate limits, CAPTCHA/bot controls, and WAF policies.
5. Add redaction enforcement for all logs and downstream integrations.

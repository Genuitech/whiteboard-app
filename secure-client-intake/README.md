# Secure New Client Intake Portal (RHW)

This package sets up a secure replacement for sending fillable PDFs by email.

## What this includes
- Public landing-page copy + flow (`docs/landing-page-copy.md`)
- Secure intake architecture and controls (`docs/architecture.md`)
- Data model and encryption approach (`docs/data-model.md`)
- Automation mapping template (`automation/field-mapping-template.json`)
- Security + compliance baseline checklists (`policies/security-checklist.md`, `policies/wisp-intake-addendum.md`)
- MVP implementation backlog (`docs/mvp-backlog.md`)

## Recommended production stack
- Frontend: Next.js (hosted on Vercel/AWS)
- Backend/API: Node.js or serverless functions
- Database: Postgres
- Encryption: envelope encryption with KMS + per-record DEK
- Auth: one-time expiring magic links + optional SMS OTP
- Audit logs: immutable append-only table + daily export

## Immediate next actions
1. Confirm downstream software targets + API methods.
2. Pick hosting + KMS provider (AWS/GCP/Azure).
3. Build MVP screens and API endpoints from `docs/mvp-backlog.md`.
4. Run security test checklist before first client traffic.

> Important: Do not collect SSN/bank fields on a public marketing form.

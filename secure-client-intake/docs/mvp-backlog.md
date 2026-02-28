# MVP Backlog (7–14 Days)

## Phase 1 — Foundation
- [ ] Create app repo + environments (dev/stage/prod)
- [ ] Configure managed Postgres
- [ ] Configure KMS keys and secret manager
- [ ] Set up auth (magic link + expiry)

## Phase 2 — Intake UX
- [ ] Build non-sensitive landing page
- [ ] Build secure intake wizard sections:
  - [ ] Identity/contact
  - [ ] Filing profile and household
  - [ ] Income and entities
  - [ ] Banking and payment details (sensitive)
  - [ ] Prior-year tax context/doc upload
- [ ] Add validation + autosave + completion checks

## Phase 3 — Security Controls
- [ ] Implement field-level encryption helpers
- [ ] Add masking in UI and API responses
- [ ] Add RBAC for internal portal users
- [ ] Add immutable audit event pipeline

## Phase 4 — Integrations
- [ ] Finalize field mapping to each software
- [ ] Build connector workers (API-first)
- [ ] Retry/dead-letter queue for failed syncs
- [ ] Build ops dashboard for sync status

## Phase 5 — Launch Readiness
- [ ] Run security checklist
- [ ] Dry run with internal test client
- [ ] Pilot with 3–5 real clients
- [ ] Production rollout + monitoring

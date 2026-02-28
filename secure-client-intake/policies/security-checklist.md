# Security Checklist (Go-Live Gate)

## App + Infra
- [ ] TLS enforced and HSTS enabled
- [ ] WAF/rate limiting enabled
- [ ] Secrets stored in KMS/secret manager (not .env in prod)
- [ ] Encryption at rest enabled for DB + backups
- [ ] Field-level encryption for SSN/bank fields

## Access
- [ ] Staff MFA required
- [ ] RBAC roles defined (admin, preparer, reviewer, readonly)
- [ ] Session timeout + re-auth for sensitive views
- [ ] Break-glass procedure documented

## Logging + Monitoring
- [ ] No PII in application logs
- [ ] Audit trail records access/export/update/delete events
- [ ] Alerting enabled for auth failures + unusual access
- [ ] Daily audit export retained

## Compliance + Governance
- [ ] WISP updated with new portal controls
- [ ] Vendor DPAs/BAAs executed where needed
- [ ] Incident response runbook tested
- [ ] Data retention/deletion policy defined

## Testing
- [ ] SAST/dependency scan clean or accepted exceptions documented
- [ ] Basic penetration test performed
- [ ] Form validation and injection tests passed
- [ ] Disaster recovery restore tested

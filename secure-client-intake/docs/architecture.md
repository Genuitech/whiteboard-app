# Architecture (Secure Intake)

## Components
1. **Public landing page**
   - Collect only non-sensitive lead fields (name/email/phone)
   - Triggers secure intake invite

2. **Secure intake app**
   - One-time magic link (15–60 min expiry)
   - Optional second factor for high-risk fields
   - Multi-step form with autosave and validation

3. **Secure API layer**
   - Input validation + anti-automation controls
   - Field-level encryption before DB write
   - Emits integration-safe events (no raw secrets)

4. **Encrypted data store**
   - Structured profile + encrypted sensitive payload columns
   - Key version tracking for rotation

5. **Automation worker**
   - Maps standardized fields to downstream systems
   - Uses API credentials from secrets manager
   - Pushes tokens/masked data where possible

6. **Audit + monitoring**
   - Access logs, changes, exports, and failed auth events
   - Alerting on abnormal access patterns

## Security controls
- TLS 1.2+
- KMS-managed envelope encryption
- RBAC + MFA for staff users
- Session timeout + device/IP logging
- Immutable audit records
- PII redaction in app/server logs

## Data flow summary
Client -> secure form -> API validation/encryption -> encrypted DB -> automation worker -> internal software connectors

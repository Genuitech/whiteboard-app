# Data Model (Minimum)

## Core entities
- `clients`
  - id, created_at, status, intake_link_id, contact fields
- `intake_submissions`
  - id, client_id, section, completion_state, submitted_at
- `sensitive_payloads`
  - id, client_id, field_name, ciphertext, key_version, created_at
- `automation_jobs`
  - id, client_id, target_system, status, payload_hash, run_at, completed_at
- `audit_events`
  - id, actor_type, actor_id, action, resource_type, resource_id, metadata_json, ip, created_at

## Sensitive field handling
Fields like SSN, bank routing, bank account, DOB should be stored as:
- masked display value (optional)
- encrypted ciphertext
- last4 (if operationally needed)
- key version

Never store raw sensitive values in logs, webhook payloads, or analytics tools.

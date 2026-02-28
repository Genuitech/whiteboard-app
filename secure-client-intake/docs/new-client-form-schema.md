# New Client Sheet → Secure Intake Form Schema

Source file reviewed: `New Client Sheet-fillable.pdf` (2 pages)

## Step 1 — Taxpayer Identity
- taxpayer_full_name (required)
- taxpayer_dob (required, sensitive)
- taxpayer_ssn (required, highly_sensitive)
- taxpayer_cell_phone (required)
- taxpayer_email_primary (required)

## Step 2 — Address
- current_street_address (required)
- current_city (required)
- current_state (required)
- current_zip (required)

## Step 3 — Spouse (conditional)
- spouse_full_name
- spouse_dob (sensitive)
- spouse_ssn (highly_sensitive)
- spouse_cell_phone
- spouse_email_primary

## Step 4 — Dependents (repeatable group; 0..n)
- dependent_name
- dependent_ssn (highly_sensitive)
- dependent_dob (sensitive)

## Step 5 — Prior Firm + Estimated Payments
- prior_accounting_firm
- estimated_payments_made (yes/no)
- federal_april_amount
- federal_june_amount
- federal_sept_amount
- federal_jan_amount
- state_april_amount
- state_june_amount
- state_sept_amount
- state_jan_amount
- local_april_amount
- local_june_amount
- local_sept_amount
- local_jan_amount

## Step 6 — Preferences
- yearly_organizer_requested (yes/no)
- portal_type_preference (hybrid/full)

## Step 7 — Refund Deposit Banking (conditional)
- direct_deposit_refund (yes/no)
- bank_account_type
- bank_account_number (highly_sensitive)
- bank_routing_number (highly_sensitive)

## Step 8 — Referral
- referred_by

## Step 9 — Driver License Information
### Taxpayer DL
- taxpayer_dl_name
- taxpayer_dl_number (sensitive)
- taxpayer_dl_issue_state
- taxpayer_dl_issue_date
- taxpayer_dl_expiration_date

### Spouse DL
- spouse_dl_name
- spouse_dl_number (sensitive)
- spouse_dl_issue_state
- spouse_dl_issue_date
- spouse_dl_expiration_date

---
## Security classification tags
- `public`: non-sensitive contact metadata
- `sensitive`: DOB, DL numbers
- `highly_sensitive`: SSN, bank account/routing

## UX guardrails
- Mask SSN and account numbers after entry
- Save draft securely with short inactivity timeout
- Add consent checkbox before final submit
- Add e-sign acknowledgement at completion

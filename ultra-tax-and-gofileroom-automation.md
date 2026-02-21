# UltraTax + GoFileRoom Automation Plan

## Problem Statement
Chea has two software systems (Thomson Reuters UltraTax CS and GoFileRoom) that currently require manual administrative processing. The goal is to automatically move projects through GoFileRoom when specific actions/events happen in UltraTax.

## Recommended Approach

### Phase 1 (Quick Win: 3–5 days) — RPA Bot
Use UiPath or Power Automate Desktop to:
1. Read UltraTax output/event signal (status report, exported CSV, or completed print set)
2. Match client/return
3. Open GoFileRoom
4. Move workflow/project step automatically
5. Write audit log + exception queue

Why: fastest path to reduce admin burden without waiting for deep API implementation.

### Phase 2 (Robust Integration: 2–4 weeks) — API/Middleware
Replace UI automation with direct integration where possible:
- Trigger source: UltraTax status/export events
- Rules engine: If event X, move to GoFileRoom step Y
- Destination: GoFileRoom workflow/project update
- Add retries, monitoring dashboard, and alerting

## Example Workflow Rules
- UltraTax Event: Return marked "Ready for Review"
  - GoFileRoom Action: Move project to "Reviewer Queue"

- UltraTax Event: Return "E-file Accepted"
  - GoFileRoom Action: Move to "Assemble/Deliver"

- UltraTax Event: Return "Client Copy Delivered"
  - GoFileRoom Action: Move to "Complete"

## Info Needed to Build Exact Implementation
1. UltraTax trigger events (exact statuses/actions)
2. Current GoFileRoom workflow steps
3. Matching key between systems (Client ID, SSN, return ID, etc.)
4. Whether GoFileRoom API access/docs are available from Thomson Reuters
5. Preferred tool: UiPath, Power Automate, or fastest-recommended

## Outcome
A build-ready implementation spec can be produced immediately once the above inputs are provided.

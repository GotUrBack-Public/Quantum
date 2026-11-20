# Reports API module

Owns report creation, evidence references, triage state, assignment, decisions, appeals, and retention.

## E2EE boundary

The server cannot read ordinary E2EE messages. A client-generated Guardian detection is not itself evidence and is not automatically transmitted. The user must explicitly select and preview message content or attachments and confirm disclosure before submission.

## Data handling

- Store the minimum evidence necessary for case review.
- Restrict evidence to assigned staff and authorized escalations.
- Encrypt evidence in transit and at rest, with separately managed keys and access logs.
- Keep internal notes separate from user-visible report status.
- Define retention and deletion rules for report evidence and audit events.
- Provide report status and appeal mechanisms where consequential action is taken.

Never assume the server can inspect E2EE conversations or derive message plaintext from opaque message references.

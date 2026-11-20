# Support and moderation architecture

Status: Proposed

## Goals

Quantum provides a dedicated support workspace for authenticated staff accounts. The workspace is visible only when the account has an explicitly granted support or moderation capability. A staff label may be displayed on the public profile, but public display status does not grant permissions.

## Roles and permissions

Use capability-based authorization rather than trusting role names in the client.

Suggested roles are starting presets, not hard-coded authority boundaries:

- `support_agent`: view assigned reports, request additional information, add internal notes, and update report status.
- `moderator`: review reports, hide or remove eligible server-hosted content, apply time-limited freezes, and issue suspensions.
- `senior_moderator`: review escalations, reverse eligible moderation actions, and approve sensitive actions.
- `administrator`: manage staff access and system-wide policy. Administrative access must be separately protected.

Every endpoint and WebSocket action must enforce authorization server-side, including object-level checks and scope restrictions. The frontend tab is only a user-interface affordance.

## Report workflow

A report should have an opaque ID, category, status, priority, creation time, reporter reference (which may be pseudonymous), subject reference, assigned staff member, evidence references, decision, reason code, and timestamps.

Suggested states: `new`, `triaged`, `in_review`, `actioned`, `rejected`, `appealed`, `closed`.

Limit access to report evidence to staff with a case-related need. Keep internal notes separate from user-visible responses. Provide an appeal path for consequential actions.

## Moderation actions

Support scoped actions such as:

- temporary account freeze (login or selected actions restricted until expiry);
- account suspension or ban (with duration, reason code, and appeal state);
- hide/remove server-hosted content where policy and retention rules permit;
- revoke sessions or device access when account compromise is suspected.

A message deletion action must distinguish between public/server-readable content and E2EE content. The server cannot inspect or selectively delete plaintext from E2EE message history it does not possess. For E2EE reports, a user may voluntarily submit selected message content and context. Explain the evidence-sharing consequence before submission.

Do not silently rewrite or erase moderation history. Record the action, actor, target, scope, reason, timestamp, expiry, and any reversal in an append-only, access-controlled audit log. Protect audit integrity and define retention limits.

## Safety controls

- Least privilege and explicit permission checks.
- MFA or strong passkey-based authentication for staff accounts.
- Step-up authentication for bans, mass actions, and staff management.
- Two-person approval for high-impact or bulk actions.
- Rate limits and anomaly detection for staff actions.
- Separation of duties between report review and policy administration.
- Staff account revocation and emergency access procedures.
- User-visible notice and appeal mechanisms for consequential enforcement.

## Suggested modules

`support`, `reports`, `moderation`, `bans`, `audit-log`, and `staff-access`.

# ADR 0008: Chat core client and E2EE implementation boundary

- Status: Proposed
- Date: 2026-11-20

## Decision

Build the web chat client as the first vertical slice. Keep the first milestone local-only while identity, transport and protocol contracts are designed. Production messages must be encrypted on endpoints using a reviewed protocol implementation before any network transmission.

## Rationale

A visible chat UI allows interaction design to progress without prematurely shipping unsafe cryptography or sending plaintext to a server. Protocol selection, device identity, recovery, group key management and server authorization must be reviewed as a single system.

## Security constraints

- The current preview is explicitly not encrypted and is not connected to a network.
- No custom cryptographic primitives.
- TLS plus E2EE for every message type; public/private describes discoverability and admission, not server plaintext access.
- Server-side moderation cannot inspect E2EE message bodies. User-initiated reports may disclose selected plaintext and context only after an explicit confirmation.
- Server authorization, replay protection, rate limits, key rotation and auditability are mandatory.
- Do not claim production security before external review and release gates pass.

## Consequences

The first commit delivers a UI prototype, not a production messenger. Subsequent milestones implement identity/device keys, protocol integration, encrypted envelope transport, storage and security tests.

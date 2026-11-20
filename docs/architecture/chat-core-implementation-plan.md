# Quantum Chat Core — Implementation Plan

## Scope of the first vertical slice

1. Web chat shell: conversation list, selected conversation, message history, composer, responsive layout.
2. Identity and device registration: random Quantum ID, device key lifecycle, recovery and revocation design.
3. E2EE protocol integration: reviewed 1:1 protocol first; group protocol selected and integrated separately after review.
4. Transport: authenticated HTTPS bootstrap and WebSocket delivery of opaque encrypted envelopes.
5. Persistence: ciphertext-only message storage, minimal metadata, bounded retention and deletion semantics.
6. Verification: device identity fingerprints/safety numbers, new-device warnings, key-change handling.
7. Security validation: schema validation, object-level authorization, rate limits, replay protection, fuzzing and protocol test vectors.

## Non-negotiable security properties

- Plaintext is created and consumed only on authorized endpoints.
- No plaintext message bodies, attachments, private keys, recovery secrets, or access tokens are sent to the API.
- The server stores encrypted envelopes and the minimum metadata required for delivery.
- Transport security (TLS) remains mandatory; E2EE does not replace TLS.
- No silent downgrade to server-readable messaging.
- New devices are not silently trusted. Device enrollment and key changes require explicit verification.
- Group membership changes trigger protocol-defined key updates.
- Backups and multi-device sync must preserve end-to-end confidentiality; server-side plaintext backup is prohibited.
- Logs, traces, crash reports and analytics must not contain message bodies or secrets.
- Client-side authorization is UX only. The server validates membership and device permissions for every operation.

## Protocol selection

Do not invent cryptography. Evaluate maintained, independently reviewed implementations of a mature 1:1 protocol and Messaging Layer Security (MLS, RFC 9420) for groups. Record the exact library, version, platform support, threat model, interoperability status and audit evidence in an ADR before integration. OpenPGP may be offered for interoperability, not substituted as the chat session protocol without a separate design decision.

## Prototype boundary

The current web screen is a local-only UI prototype with fixture messages. It is not connected to a backend and does not yet encrypt messages. It must not be presented as a secure or usable messenger until protocol integration, server controls, key verification, and independent security review are complete.

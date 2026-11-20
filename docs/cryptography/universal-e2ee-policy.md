# Universal end-to-end encryption policy

Status: Proposed product requirement

## Requirement

All user message content is end-to-end encrypted by default across one-to-one conversations, groups, public rooms, private rooms, and P2P conversations. Room visibility and message encryption are independent properties: a public room is discoverable, but its message contents remain readable only by authorized members' devices.

The same client-side encryption principle applies to attachments and shared files. Voice and video require a separately reviewed media E2EE design; transport encryption alone must not be presented as end-to-end encryption.

## Server limitations

The service stores and routes ciphertext. It must not possess routine access to message plaintext or user message encryption keys. Server-side search, content scanning, message previews, and content-based moderation are therefore unavailable unless a user explicitly submits selected content or a separate, clearly disclosed protocol is designed and reviewed.

E2EE does not hide all metadata. The service may still observe some account, device, connection, room membership, timing, size, delivery, and abuse-prevention metadata. Minimize collection, retention, and exposure; document each field and its purpose.

## No silent downgrade

A conversation must never silently switch from E2EE to server-readable mode. Clients must show the actual security state and warn when a peer, device, or feature cannot meet the required security profile. Do not describe TLS-only transport encryption as E2EE.

## Protocol requirements

Use established, independently reviewed protocols and libraries. Evaluate a mature 1:1 protocol and MLS for groups. Define device identity, key verification, membership changes, forward secrecy, post-compromise security, recovery, key transparency, and migration behavior before implementation. Do not invent cryptographic primitives.

## Moderation compatibility

Content moderation that needs plaintext must run on the user's device or rely on content voluntarily submitted by a user in a report. A server-side support agent cannot inspect ciphertext. See `docs/privacy/client-side-moderation.md`.

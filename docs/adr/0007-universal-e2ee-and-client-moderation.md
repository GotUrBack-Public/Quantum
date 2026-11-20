# ADR 0007: Universal E2EE and client-side moderation

- Status: Proposed
- Date: 2026-11-20

## Context

Quantum requires strong privacy across public and private rooms, groups, direct messages, and P2P conversations, while also providing reporting and moderation tools.

## Decision proposal

1. Encrypt all message content end-to-end by default, independent of room visibility.
2. Keep room discovery metadata separate from message content.
3. Do not provide routine server-side plaintext access or server-side content scanning for E2EE conversations.
4. Implement an optional on-device moderation assistant that can locally detect selected content categories and suggest reports.
5. Require explicit user review and confirmation before message plaintext or attachments are disclosed to support.
6. Treat report evidence as a separately protected, access-controlled disclosure with audit and retention controls.
7. Never impose account penalties solely from an unreviewed client classifier result.

## Consequences

This provides a consistent content confidentiality model but limits centralized moderation, server-side search, and content previews. Local moderation is not tamper-proof and cannot guarantee that every client scans every message. Public rooms remain publicly discoverable, but their message contents are still E2EE and available only to authorized members.

## Open questions

- Should the local moderation assistant be enabled by default, with user controls?
- Which languages and content categories are in the first release?
- Should users be able to report messages from other devices where the original plaintext is unavailable?
- What exact retention period and appeal process apply to submitted report evidence?

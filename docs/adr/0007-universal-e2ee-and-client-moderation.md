# ADR 0007: Universal E2EE and client-side moderation

- Status: Accepted
- Date: 2026-11-20

## Context

Quantum requires strong privacy across public and private rooms, groups, direct messages, and P2P conversations, while also providing reporting and moderation tools.

## Decision

1. Encrypt all message content end-to-end by default, independent of room visibility.
2. Keep room discovery metadata separate from message content. Public means discoverable, not readable by non-members.
3. Do not provide routine server-side plaintext access or server-side content scanning for E2EE conversations.
4. Provide Quantum Guardian as an on-device moderation assistant. It is enabled by default for new accounts and installations; users can tune categories and sensitivity or disable it in privacy settings.
5. Guardian analyzes plaintext locally only. Routine scanning must not upload message text, classifier inputs, or plaintext-derived telemetry.
6. Guardian detections may produce local warnings and report suggestions. A detection alone must not automatically disclose content to staff or trigger punitive account actions.
7. Require explicit user review, preview, and confirmation before selected message plaintext or attachments are disclosed to support.
8. Treat submitted report evidence as a separately protected disclosure with strict access controls, audit, retention limits, and an appeal process.
9. Use established, independently reviewed cryptographic protocols and implementations. Do not invent cryptographic primitives.

## Consequences

This provides a consistent content confidentiality model but limits centralized moderation, server-side search, and content previews. Local moderation is not tamper-proof and cannot guarantee that every client scans every message. Public rooms remain publicly discoverable, but their message contents are E2EE and available only to authorized members' devices.

Transport encryption alone is not E2EE. Voice/video require a separately reviewed media E2EE design. E2EE does not conceal all metadata; metadata minimization remains mandatory.

## Implementation gates

- Threat model and protocol review for 1:1, groups, attachments, and media.
- Key verification, device lifecycle, membership changes, recovery, and key transparency design.
- Guardian false-positive, multilingual, privacy, and tamper-resistance tests.
- No plaintext in routine telemetry, logs, analytics, or crash reporting.
- Explicit report evidence disclosure UI and staff access auditing.

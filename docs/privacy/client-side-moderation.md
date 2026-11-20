# Client-side moderation assistant

Status: Proposed

## Purpose

Quantum may provide an on-device moderation assistant that checks message text locally for user-configured categories such as insults, harassment, threats, hate speech, spam, and suspicious links. It can warn the user, locally hide or mute content, and suggest creating a support report.

## Privacy boundary

The assistant processes plaintext only on the recipient's device after normal E2EE decryption, or on the sender's device before encryption for optional outgoing-message warnings. Plaintext must not be uploaded for classification. No server-side content scanner may claim to inspect E2EE messages.

The default behavior is local detection and local warning. A detection alone must not automatically disclose message text to Quantum support.

## Report submission

When a user chooses to report a message, show a clear review screen before submission. It must explain that selected message text, attachments, surrounding context, and relevant identifiers will be disclosed to the support team. Include a preview, allow the user to remove optional context, and require explicit confirmation.

A report should transmit only the minimum necessary evidence. Encrypt report evidence in transit and at rest, restrict access to assigned staff, record access in the audit log, and apply a documented retention and deletion policy. Report evidence is a deliberate exception to the normal E2EE content boundary; it must not be described as invisible to support.

## Detection design

- Start with deterministic local rules and user-configurable blocklists.
- If a local ML model is introduced, run inference on-device and document model provenance, limitations, supported languages, and update mechanism.
- Treat scores as signals, not proof. Provide confidence bands and avoid automatic punitive account actions based solely on classifier output.
- Support false-positive feedback, allow users to disable or tune categories, and provide accessible explanations.
- Test multilingual, dialect, quotation, reclaimed-language, sarcasm, and contextual cases.
- Never infer sensitive personal traits or build behavioral profiles from message text.

## Abuse and security controls

- Do not let untrusted room owners silently install or change a user's filter.
- Sign and version model/rule updates; protect update delivery against tampering and rollback.
- Avoid sending telemetry containing plaintext, tokens, or message-derived identifiers.
- Make filter status visible and distinguish local filtering from staff moderation.
- A malicious or modified client can disable local scanning. Therefore this feature is a user safety aid, not a guaranteed platform-wide enforcement mechanism.

## Support workflow

A client-generated suggestion may include a category, local timestamp, and a reference to the message held on the device. The reference alone is not readable by support. The user must explicitly choose and preview any plaintext evidence to submit.

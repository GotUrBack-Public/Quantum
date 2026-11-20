# Quantum Guardian

Quantum Guardian is Quantum's on-device moderation assistant.

## Default behavior

Guardian is enabled by default for new accounts and installations. Users can tune categories and sensitivity or disable it in privacy settings. The client must clearly show its current state.

## Privacy boundary

- Analyze message plaintext locally on the user's device.
- Never upload message text, classifier input, or plaintext-derived telemetry for routine scanning.
- A detection is a local signal, not proof of a violation.
- Do not automatically ban, freeze, or report a user to staff based only on a classifier result.
- A support report containing message content requires a review screen and explicit user confirmation.

## Initial categories

Insults and harassment, threats, hate speech, spam, and suspicious links. The first implementation should begin with transparent local rules and tests. An on-device ML model may be evaluated later.

## Planned structure

- `src/engine`: local rule/model orchestration.
- `src/rules`: versioned language and category rules.
- `src/scoring`: confidence and severity handling.
- `src/report-draft`: local report preparation; no network submission here.
- `src/settings`: per-user category and sensitivity preferences.
- `test-vectors`: benign, ambiguous, and violating examples.

This is a design scaffold. No classifier or production moderation engine is implemented yet.

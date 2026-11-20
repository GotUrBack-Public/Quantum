# Quantum Web

Next.js + React + TypeScript frontend prototype.

## Run

From the repository root:

```bash
pnpm install
pnpm --filter @quantum/web dev
```

## Included screens

Messages, Discover, Contacts, Profile, Settings (including Quantum Guardian preference mockups), and a visual-only Support console.

## Current state and limitations

All content is fictional fixture data. Interactions update local React state in the current browser tab only. There is no API, backend, authentication, WebSocket, database, network message delivery, persistent storage, or E2EE implementation.

The chat screen displays an explicit warning that encryption is not active. Do not enter real or confidential messages.

## Privacy and security constraints

- No third-party fonts, analytics, remote avatars, tracking pixels or advertising SDKs.
- No secrets, credentials or private keys in URLs, logs or telemetry.
- UI checks are never authorization. Future backend operations must validate permissions server-side.
- Production messaging must use a reviewed E2EE protocol; do not implement custom ciphers or key exchange.
- Keep UI components independent of transport and persistence so backend integration can be added later without embedding security decisions in presentation code.

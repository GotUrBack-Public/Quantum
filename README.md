# Quantum

Privacy-first communication platform. The first development milestone is a backend-free web frontend so the interface and product structure can be explored before server implementation begins.

> **Current status:** frontend prototype only. No backend, accounts, network messaging, or working E2EE exists yet. Do not enter real or confidential data.

## Run the frontend

Requirements: Node.js 22+ and pnpm 10+.

```bash
pnpm install
pnpm dev
```

Open the local URL printed by Next.js (normally http://localhost:3000).

## Current frontend areas

- **Nachrichten:** demo conversation list and local-only message composer.
- **Entdecken:** sample public and private rooms.
- **Kontakte:** sample friend requests and contact list.
- **Profil:** sample Quantum profile, follower counters and badges.
- **Einstellungen:** privacy placeholders and Quantum Guardian preference mockups.
- **Support-Konsole:** visual-only sample report queue; no staff authentication or moderation powers.

All data is fictional and held in client-side React state. It is not persisted or transmitted.

## Security boundary

The current UI is not a secure messenger. The chat view clearly warns that E2EE is not active. Do not connect real conversations or real user data to this prototype.

No third-party fonts, analytics, tracking pixels, remote avatars or advertising SDKs are included in the web UI. Production messaging must use a reviewed E2EE protocol implementation, device identity and verification, secure key lifecycle, authenticated transport, server-side authorization, replay protection, and security testing. Do not invent cryptographic primitives.

## Repository map

- `apps/web`: current Next.js frontend prototype.
- `services/`: future API and worker services; not implemented as a working backend.
- `packages/`: shared domain, contracts, crypto, routing and UI packages.
- `docs/`: architecture and decision records.
- `security/`: threat model, policies and release gates.

See [the frontend-only foundation](docs/architecture/frontend-only-foundation.md) and [chat core implementation plan](docs/architecture/chat-core-implementation-plan.md).

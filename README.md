# Quantum

Security-first communication platform. The initial implementation targets the web; future desktop and mobile clients will consume the same versioned API and cryptographic protocols.

> Status: architecture scaffold. This repository does not yet contain a production-ready chat implementation.

## Architecture

- Modular monolith with explicit domain boundaries.
- Web client: Next.js, React, TypeScript.
- API: NestJS, TypeScript; REST for commands and queries, WebSocket gateway for realtime delivery.
- Persistence: PostgreSQL; Redis for ephemeral state, rate limits, presence and queue coordination.
- Object storage: private S3-compatible storage behind an authorization-aware media service.
- Contracts: shared schemas and generated API types.
- Security: deny-by-default authorization, signed opaque routes, E2EE for private conversations, server-side encryption for server-processed content.

## Security baseline

A valid route signature is not authorization. Every resource operation must independently check the authenticated principal, tenant/conversation membership, action, resource state and policy. Never put secrets, access tokens, encryption keys or private message content in URLs.

See [Architecture](docs/architecture/README.md), [Threat model](security/threat-model/README.md), [Signed routing](docs/routing/signed-routing.md), and [Cryptography](docs/cryptography/README.md).

## Development status

This is a structure and design baseline, not a deployable application yet. Implementation must proceed through reviewed milestones with tests and security review.

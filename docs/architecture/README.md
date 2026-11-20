# System architecture

Quantum starts as a modular monolith, not a microservice fleet. The web client is Next.js/React/TypeScript. The API is NestJS with REST for commands/queries and WebSockets for realtime events. PostgreSQL is the source of truth; Redis handles ephemeral presence, rate limits and queue coordination. Workers process notifications, media scanning and retention. Private object storage is accessed only through policy-checked grants.

Dependency direction: presentation -> application -> domain. Infrastructure implements inward-facing ports. Domain code must not import frameworks, ORM or transport packages. Cross-domain writes use application use cases and domain events.

Initial deployables: apps/web, services/api, services/worker, PostgreSQL, Redis and private object storage. Production keys belong in KMS/HSM or a secret manager, never git or container images.

Security baseline: deny by default; authorization on every request and resource operation; redacted logs; idempotent handlers; reviewed migrations; encrypted backups and tested restoration. Do not split into microservices until scale, isolation or team ownership provides measured justification.

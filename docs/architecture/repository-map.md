# Repository map

- apps/web: Next.js browser client.
- services/api: HTTP API, websocket gateway and application composition.
- services/worker: background jobs.
- packages/domain: framework-independent domain model.
- packages/contracts: API/event schemas and generated types.
- packages/crypto: vetted cryptographic protocol adapters.
- packages/routing: signed route parser, signer/verifier and key rotation.
- packages/authz: centralized authorization policy.
- packages/database: schema, migrations and repositories.
- packages/config: validated runtime configuration.
- packages/ui: shared design system.
- packages/testing: fixtures and test harnesses.
- infra: local development and deployment templates.
- security: threat model, policies and incident response.
- tests: integration, E2E, abuse, fuzz and load tests.
- docs: architecture and protocol specifications.

Git does not track empty directories; module directories receive README placeholders as their implementation milestones begin.

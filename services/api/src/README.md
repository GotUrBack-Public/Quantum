# API source layout

Composition root and adapters. Planned modules: core (request context, errors, pipes), security (authentication, sessions, authorization, rate limits, audit), routing (QSRP verifier), gateway (websocket), infrastructure (database, cache, storage, queues, telemetry), and feature modules. Controllers must stay thin; use cases own workflows; domain invariants live in packages/domain.

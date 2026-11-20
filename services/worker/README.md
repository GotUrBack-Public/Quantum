# Worker service

Background processing for notifications, media scanning, retention, delivery retries and outbox events. Jobs are untrusted serialized input: validate schemas, enforce idempotency, re-check resource state and authorization context, and apply bounded retries/dead-letter handling.

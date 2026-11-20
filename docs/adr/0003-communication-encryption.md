# ADR 0003: Encryption by communication class

Status: Proposed.

Decision: E2EE for private conversations; TLS plus server-side envelope encryption for content intentionally processed by the server. Require explicit security labels, no silent downgrade, separate storage/processing paths and E2EE device/key lifecycle. Open items: protocol/library selection, group membership transitions, key transparency, recovery and abuse-report workflow.

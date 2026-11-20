# Security release gates

- No critical/high unresolved findings without documented risk acceptance.
- Authorization tests cover each resource/action pair and negative cases.
- Signed-route parser/verifier passes malformed, tampered, expired, replay and key-rotation tests.
- E2EE protocol review and interoperability tests completed before enabling private E2EE.
- Dependency, secret, container and static analysis scans pass.
- Backup restore and incident response runbooks exercised.

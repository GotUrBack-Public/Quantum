# Quantum signed route protocol (QSRP) — design draft

Routes use opaque resource references and a versioned signed envelope. Illustrative path: /main/p2p/{opaque-conversation-ref}/{opaque-member-ref}/e2e/{signed-envelope}.

Canonical payload fields: protocol version, key ID, audience, resource type/reference, narrow action intent, issued-at, expiry, random nonce, optional authenticated-session/device binding and optional policy epoch.

The exact encoding, canonicalization and signature algorithm must be fixed in a versioned ADR before implementation. Use a vetted JOSE/COSE implementation and an asymmetric signature scheme supported by the KMS. Never invent cryptography or allow an untrusted token to choose its verification algorithm. Reject unknown versions, keys, duplicate fields, non-canonical encodings and expired envelopes.

Verification pipeline: strict path parsing; trusted key lookup; canonical payload reconstruction and signature verification; audience/time/nonce checks; resource resolution; caller authentication; object-level authorization for the requested action; membership/moderation/resource-state checks; redacted audit event. A valid signature is not authorization.

Routes are short-lived and non-transferable where possible. Never place access tokens, cookies, private keys, E2EE keys or message contents in URLs. Use HTTPS and restrictive Referrer-Policy. Signing private keys remain in KMS/HSM. Support key rotation and emergency revocation. Replay protection is mandatory for one-time actions.

Status: specification only. Do not deploy until canonical encoding, algorithm, test vectors, key lifecycle and security review are complete.

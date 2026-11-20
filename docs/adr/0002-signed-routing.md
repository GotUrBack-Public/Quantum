# ADR 0002: Signed opaque route envelopes

Status: Proposed.

Decision: versioned, asymmetric-signed route envelopes with opaque resource references and short expirations. Signature verification is followed by authentication and object-level authorization on every request. Open items: JOSE/COSE profile, canonical serialization, algorithm, KMS integration, nonce semantics and test vectors.

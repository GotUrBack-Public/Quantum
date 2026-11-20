# Post-quantum cryptography roadmap

Evaluate standardized NIST PQC algorithms for the relevant protocol roles:

- ML-KEM (FIPS 203) for key establishment.
- ML-DSA (FIPS 204) for digital signatures.
- SLH-DSA (FIPS 205) as a hash-based signature option.

Do not assume these are drop-in replacements for X25519 or Ed25519. Protocol integration, certificate/key formats, message sizes, performance, device support, key rotation and downgrade resistance require review. Prefer protocol-defined hybrid modes over ad-hoc concatenation. Keep cryptographic agility versioned and fail closed on downgrade attempts.

# Cryptography architecture

Use established, maintained cryptographic libraries. Quantum must not design its own cipher, key exchange, signature scheme or password hashing format.

| Communication class | Example | Server plaintext |
|---|---|---|
| Private E2EE | 1:1 and private group chat | No |
| Server-processed | public/community channels | Yes, by design |
| Metadata | membership, delivery state | Limited metadata |
| Voice/video | private calls | Depends on media topology |

The UI must label each conversation's security mode before sending. No silent downgrade from E2EE to server-readable mode.

E2EE requirements: per-device identity keys; authenticated device enrollment; forward secrecy and post-compromise recovery via a reviewed protocol (evaluate MLS for groups); device verification and revocation; client-encrypted attachments; opt-in end-to-end-protected key backup. The server stores ciphertext and public device bundles, not private keys or plaintext. Search/moderation for E2EE content must be client-side or explicitly opt-in without covert server disclosure.

Server-readable content uses TLS 1.3 where supported and envelope encryption at rest with KMS-managed keys. Separate data-encryption keys from key-encryption keys. No secrets in git, logs, URLs, crash reports or telemetry.

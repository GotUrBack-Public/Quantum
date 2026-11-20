# Moderation API module

Owns policy decisions and scoped enforcement actions.

## Supported actions

- Time-limited account freeze.
- Temporary or permanent suspension, with reason code and appeal state.
- Removal or hiding of server-hosted content where the service possesses the content and policy permits.
- Session or device revocation when account compromise is suspected.
- Reversal and expiration of prior actions.

## E2EE boundary

The server cannot delete plaintext from devices or inspect ordinary E2EE message history. For E2EE content, moderation can act on a user-submitted report containing explicitly selected evidence, apply room/account-level controls, or restrict future access. Do not claim that deleting a server ciphertext erases copies already delivered to recipients.

## Enforcement requirements

Record actor, target, scope, reason, timestamp, expiry, and reversal in an access-controlled, tamper-evident audit trail. Enforce capabilities and object-level authorization on every operation. Classifier output alone must never trigger punitive action. Provide notice and an appeal path for consequential decisions.

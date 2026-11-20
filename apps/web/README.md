# Quantum Web

First web client for Quantum, built with Next.js, React and strict TypeScript.

## Current state

The initial chat screen is a **local UI prototype only**. Conversation fixtures are hard-coded and sending a message updates React state in the current browser tab. No message is sent to a server, no account authentication exists, and no encryption is implemented yet.

## Security boundary

- The interface explicitly labels the current preview as unencrypted.
- Do not connect this prototype to real user conversations.
- No third-party fonts, analytics, remote avatars, or advertising SDKs are included.
- Do not put message content, credentials, tokens, or cryptographic material in URLs or telemetry.
- Production messaging must encrypt on the sender device before network transmission and decrypt only on authorized recipient devices.
- The server must enforce authentication, conversation membership, device authorization, replay protection, payload limits, and rate limits. Client-side checks are never authorization.
- Adopt a reviewed E2EE protocol implementation; do not implement a custom cipher or key exchange.

## Development

Install dependencies from the repository root with pnpm, then run the web app using the workspace script. A lockfile and CI checks still need to be added.

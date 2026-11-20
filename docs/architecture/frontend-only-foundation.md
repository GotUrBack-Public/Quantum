# Frontend-only foundation

## Goal

The first development stage is intentionally backend-free. The web client is an inspectable UI prototype with local fixture data and local component state only.

## Included screens

- Messages: conversation list, conversation view and local-only composer.
- Discover: sample public and private rooms.
- Contacts: sample friend requests and contacts.
- Profile: sample identity, follower counts and badges.
- Settings: privacy placeholders and Quantum Guardian preferences.
- Support console: visual-only sample report queue.

## Explicit limitations

- No backend, API, WebSocket, database, authentication or real account roles.
- No real message sending, persistence or synchronization.
- No E2EE implementation yet. The UI warns users not to enter confidential content.
- Sample profile, follower, room and moderation data is fictional.
- Support console is not access-controlled and must never be used for real moderation.
- Guardian toggles are presentation state only; no message analysis runs.

## Privacy rules for this stage

- Keep all demo data local to the running page.
- Do not add analytics, remote fonts, tracking pixels, advertising SDKs or third-party avatar services.
- Do not collect real personal data in the prototype.
- Do not imply that the interface provides cryptographic protection before E2EE is implemented.

## Later backend integration

Keep UI components decoupled from transport. Replace local fixtures with typed repositories/services only after API contracts, identity, device trust, E2EE and server authorization have been reviewed. The UI must never become the security authority.

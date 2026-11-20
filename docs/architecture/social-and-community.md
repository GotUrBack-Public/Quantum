# Social and community architecture

Status: Proposed

## Chat and community types

Quantum should model visibility and encryption mode as separate properties.

- Public rooms: discoverable in a directory; users can preview public metadata and join subject to room policy.
- Private rooms: not listed publicly; access is granted by invitation, membership, or an optional room passphrase.
- Group conversations: membership-based conversations with roles and membership history.
- One-to-one conversations: private conversations between two identities.
- P2P conversations: direct device-to-device transport where available, with a secure relay fallback when direct connectivity fails.

A private-room passphrase is an access mechanism, not encryption. Use TLS in transit, appropriate storage encryption, and explicit membership authorization. Never use a passphrase as a substitute for cryptographic key management.

## Discovery and directory

The public directory should expose only information explicitly designated public by room owners: room name, description, avatar, language, topic tags, member-count range, and moderation status. Do not expose member lists, private room identifiers, or invite secrets by default.

Directory search should support abuse controls, rate limits, pagination, reporting, and room-owner controls. Provide room visibility states such as `public`, `unlisted`, and `invite_only`.

## Friends and followers

Friendship is a bilateral relationship with states such as `pending`, `accepted`, `declined`, and `blocked`. A follow is a separate unilateral relationship. Blocking must override follows, friend requests, mentions, and direct-message eligibility according to user settings.

Avoid exposing a global address book or searchable identity directory by default. Users should control whether they can be found by Quantum ID, receive requests, or appear in follower lists.

## Profiles and badges

A profile may include Quantum ID, display name, optional avatar and biography, join date, follower/following counts, and user-selected public badges.

Badges should be defined by a versioned catalog with eligibility rules, issuance source, and revocation policy. Do not award badges based on sensitive attributes or expose private activity. Time-on-platform badges should use coarse milestones (for example, 1 month or 1 year), not detailed activity histories.

Staff labels such as Supporter or Moderator must be verified by the server and must not be user-editable. A public staff label is informational only and must never reveal internal permissions or case assignments.

## Suggested modules

`public-chats`, `private-chats`, `groups`, `room-directory`, `friendships`, `followers`, `profiles`, and `badges`.

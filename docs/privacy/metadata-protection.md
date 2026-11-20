# Metadata protection

Content encryption does not hide all metadata. Quantum must inventory and minimize:

- Source IP and connection timing
- Account/device identifiers
- Sender/recipient and group membership
- Message size and delivery time
- Presence, typing and read receipts
- Push notification tokens and provider metadata
- Upload/download access patterns
- Abuse reports and moderation evidence

For every field, document purpose, access roles, retention, deletion and whether it is visible to the server. Prefer optional features and coarse or short-lived state. Do not claim traffic-analysis resistance without a separately reviewed design and measured deployment.

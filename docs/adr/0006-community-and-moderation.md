# ADR 0006: Community, social graph, and staff moderation

- Status: Proposed
- Date: 2026-11-20

## Context

Quantum needs public and private chat spaces, P2P conversations, friendship requests, follows, profile badges, and a dedicated support workspace. These features create distinct authorization, privacy, and abuse-prevention requirements.

## Decision proposal

1. Keep community discovery, friendship, follows, profiles, and badges as separate domain modules.
2. Model room visibility independently from encryption mode.
3. Use server-enforced capability-based staff permissions, not client-side role checks.
4. Keep reports, moderation decisions, and audit events as separate records with restricted access.
5. Support scoped freezes, suspensions, and content moderation with reason codes, expiry, notice, and appeal handling.
6. Do not claim server-side message deletion or review for E2EE content that the server cannot decrypt.
7. Make public profile fields and social-graph visibility user-configurable, with privacy-preserving defaults.

## Consequences

The design is more explicit and testable, but requires a permission matrix, report lifecycle, appeal workflow, audit retention policy, and clear product rules before implementation. Public directories and social graphs also create metadata and harassment risks that must be included in the threat model.

## Open questions

- Can public rooms be joined instantly, or may owners require approval?
- Are private-room passphrases mandatory, optional, or replaced by invitation links?
- Which staff actions require two-person approval?
- Which profile fields and follower lists are public by default?
- What retention period applies to reports and moderation audit records?

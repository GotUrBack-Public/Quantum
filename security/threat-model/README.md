# Threat model — initial scope

Assets: credentials/sessions, device identity keys, E2EE keys, message content, membership/roles, route signing keys, media, audit records and backups.

Adversaries: unauthenticated attacker, malicious authenticated user, compromised endpoint, malicious community admin, compromised dependency, stolen worker credential, database/storage exposure and replaying intermediary.

Threats: broken object-level authorization/IDOR; session theft, CSRF and XSS; signature confusion/replay/key substitution; E2EE downgrade and device impersonation; malicious uploads; websocket authorization drift; queue privilege escalation; secret leakage; rate-limit bypass and denial of service.

Controls: deny by default; authorization on every operation; strict validation; CSP and secure cookies; CSRF defenses; rate limits; signature test vectors; key lifecycle; private storage; malware scanning; audit logging; dependency scanning; tested backups.

Compromised endpoints can expose plaintext and device keys. E2EE does not hide all metadata. Server-readable channels are visible to authorized server-side processing.

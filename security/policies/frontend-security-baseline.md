# Frontend security baseline

This repository currently contains a frontend-only prototype. It has no authentication, API, database, transport encryption, or end-to-end encryption. Do not enter real personal, confidential, or authentication data.

## Current baseline

- GitHub Pages deployment automation has been removed to prevent future automatic publication.
- The GitHub Pages static-export configuration has been removed.
- Next.js deployments that serve response headers apply `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: no-referrer`, and a restrictive `Permissions-Policy`.
- The local message composer is limited to 4,000 characters and conversation search to 80 characters.
- Theme preference is the only browser-persisted UI setting. Message content remains transient component state.
- Primary inputs and the theme control have accessible labels.

## Hosting limitation

GitHub Pages is a static host and cannot apply the Next.js response headers configured here. Removing the workflow prevents future deployments but does **not** unpublish an existing deployment. Disable GitHub Pages in repository settings (Settings → Pages → Unpublish site, if available; otherwise disable Pages / change its source so it no longer publishes). Verify the public URL no longer serves the site.

## Before production

1. Deploy behind a host/reverse proxy that enforces HTTPS and security headers. Add a reviewed Content Security Policy compatible with the production build.
2. Implement server-side authentication, authorization, rate limits, CSRF protections where cookie sessions are used, strict input validation, output encoding, audit logging, and abuse controls.
3. Use vetted E2EE protocol implementations; never treat UI labels, local flags, or client-side checks as security boundaries.
4. Threat-model metadata, device compromise, key backup/recovery, account recovery, push notifications, attachments, and moderation evidence.
5. Run dependency auditing, static analysis, secret scanning, tests, and independent security review in CI.

These defaults are defense in depth, not a claim that the current prototype is production-secure.

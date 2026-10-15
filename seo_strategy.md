# SEO Strategy

## In scope
- Public marketing and discovery routes in `artifacts/pawhub`
- Public directory and practitioner routes in `artifacts/pawhub-directory`

## Out of scope
- Authenticated or utility-style dashboard routes in `artifacts/pawhub` such as `/dashboard`, `/pets`, `/bookings`, `/provider/**`, and booking checkout flows
- Internal development artifacts such as `artifacts/mockup-sandbox`, `artifacts/pitch-deck`, and `artifacts/promo-video`
- Backend-only packages under `artifacts/api-server` and `lib/**` unless they directly emit public HTML or crawler files

## Target audience
- Unknown — likely pet owners and pet-care providers for PawHub, but update once confirmed.

## Primary keywords
- Unknown — update once known.

## Dismissed categories
- None yet.

## Notes
- `artifacts/pawhub` is a Vite + React SPA served as static files with a catch-all rewrite to `/index.html`.
- `artifacts/pawhub-directory` is a Vite + React SPA under `/pawhub-directory/` with a catch-all rewrite to `/index.html`.
- Route-specific metadata emitted in client-side React code is not visible to social link-preview bots or AI crawlers unless pages are prerendered or server-rendered.

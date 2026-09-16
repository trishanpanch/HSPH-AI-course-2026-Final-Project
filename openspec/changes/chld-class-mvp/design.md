# Implementation design

Next.js 16 / React / TypeScript. Browser-memory state, server-side authenticated /api/plan and /api/adapt, validated JSON through OpenRouter, local A4 PDF generation with @react-pdf/renderer. Explicit numbered question parsing preserves every source reference; unsupported or missing essential visual content blocks intake. Each relevant edit revokes approval and invalidates obsolete model/PDF responses. The downloaded Blob must be the reviewed Blob. Shared-password Basic authentication protects the page and API, with defense in depth inside AI handlers, no cached responses and same-origin POST enforcement.

Use approved warm #FFF8F0 paper, white panels, #81001D actions, Playfair Display headings and Inter UI. Five steps: Worksheet, Groups, Plan, Review, Download. Remove archived prototype claims and unsupported controls per docs/DESIGN.md. Keep a side-by-side source/adaptation review. Fixed readable A4 output with all questions and answer space.

Deploy separate chld-adapt Cloud Run service in vibecoda-499712/us-central1 with existing CHLD build/runtime identities and pinned Secret Manager versions. Verify local build/state/validation, then deployed reading/math journeys. Model availability is being checked; no silent substitute. Runtime secret injection is finally verified on Cloud Run.

# CHLD Adapt MVP verification

Application commit: `d1931fa`. Date: 16 September 2026. Build window: 16:35:12–17:20:12 UTC (45 minutes maximum).

## Scope

One pasted, simple text-only worksheet; one learner group; live adaptation plan and editable draft; teacher review and approval; an actual A4 PDF. Issues #6–#10 are outside the MVP, including #8's three-group workflow. All eleven difficulty categories remain available; select one to three per example.

## Completed local checks

- `npm test`: 12 tests passed, covering authentication, invalid/malformed output, source references, numeric preservation and approval conditions.
- `npx playwright test`: 6 browser tests passed. These use explicitly mocked model responses to check recoverable failure, late responses, approval reset, actual PDF preview/download, wrong credentials and a 390 px screen.
- `npm run typecheck` and `npm run build`: passed. Production dependency audit: zero reported vulnerabilities.
- Live OpenRouter reading and mathematics generation succeeded using `google/gemini-2.5-flash-lite`. A real mathematics failure was reproduced: numbers changed during adaptation. Runtime validation now rejects changed numbers, and plan cautions are kept separate from student-facing instructions. Both the exact original failing case and a fresh complete mathematics journey passed after the fix.
- The generated local PDF has A4 dimensions (595.28 × 841.89 points), readable Inter text, all expected questions and answer space. It was rendered and visually inspected.
- Desktop and 390 px screenshots were inspected. The implementation preserves the approved warm paper palette, crimson controls, Playfair Display headings, Inter interface and side-by-side worksheet review on wide screens. Narrow screens stack the review without horizontal overflow. Prototype-only unsupported controls and accuracy claims are absent.

## Deployment verification

M0 completed on Cloud Run with both real Secret Manager values injected into the runtime. Authorized page access returned 200, anonymous access returned 401, and a live plan returned 200. No secret values are recorded in this repository.

Final application revision: `chld-adapt-d1931fa`, deployed without traffic for hosted checks. The repeatable hosted test is `scripts/smoke-live.mjs`; provide credentials only through environment variables. It tests live reading and mathematics, wrong/missing credentials, actual PDF generation, and equality of the reviewed PDF and downloaded PDF using SHA-256 hashes.

For Cloud Run browser automation, use `CHLD_SMOKE_PREEMPTIVE_AUTH=1`: credentials are injected only into requests to the selected origin. Chromium's automatic Basic Auth challenge handler stalled in this environment; direct authenticated requests and browser requests with the same authorization header succeed. The test waits for hydrated example controls before beginning the workflow.

Hosted reading and mathematics both passed at **17:16:01 UTC** (40 minutes 49 seconds after the build started). [Sanitized live test metadata](evidence/live-smoke.json) records all four live API calls returning 200, model latencies of 1.19–2.27 seconds, missing/incorrect UI and incorrect API credentials returning 401, and 30 browser-visible response bodies checked without an OpenRouter key prefix.

The [reading PDF](evidence/reading.pdf) contains all four questions. The [mathematics PDF](evidence/mathematics.pdf) contains all three questions and preserves the original operands. Both are one-page A4 documents (595.28 × 841.89 points), visually inspected with readable text, answer lines and completion boxes, without clipping. Each downloaded PDF's SHA-256 exactly matches the preview blob:

- Reading: `afd877704591a9c48d1ca4a8a22df1e6c75af4c68ecf2495c3a2021247570294`
- Mathematics: `a622875eb008eb85eb2bd26d33485c792c20413111e17293ccdd6ad9a396f8a1`

Both hosted examples also passed the 390 px overflow check. At 17:17 UTC the tested revision `chld-adapt-d1931fa` was promoted to 100% traffic. The [canonical class URL](https://chld-adapt-8642258683.us-central1.run.app) returned 200 with class credentials. All five MVP milestones passed within the 45-minute window; only follow-up issues #6–#10 remain open.

## Limits

The two live examples establish a working demonstration, not classroom effectiveness or comprehensive educational accuracy. The teacher remains responsible for suitability and must confirm source completeness, review concerns and approve the PDF. Reloading closes the in-memory work session. No uploads, persistent drafts, extra groups, custom drawings or expanded print controls are included. The owner waived the $5 per-key cap for this class demo; application size limits, authentication and timeouts remain active.

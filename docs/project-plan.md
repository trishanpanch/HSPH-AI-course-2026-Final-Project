# CHLD Adapt — class MVP project plan

**Approved plan, 16 September 2026.** The current build is a 45-minute hard-deadline run, started at 16:35:12 UTC and ending at 17:20:12 UTC. The earlier four-by-15-minute, 60-minute budget is historical and superseded for this run. M0-M4 passed; the canonical URL is verified and routes 100% of traffic to revision `chld-adapt-d1931fa`.

**[Open the public GitHub Project](https://github.com/users/trishanpanch/projects/10)** · [Repository issues](https://github.com/trishanpanch/HSPH-AI-course-2026-Final-Project/issues) · [Milestones](https://github.com/trishanpanch/HSPH-AI-course-2026-Final-Project/milestones)

## What we will demonstrate

A teacher pastes one simple text-only worksheet, confirms its contents and learning goal, selects one to three difficulties for one group, reviews a live AI adaptation plan, generates and edits the worksheet, resolves any concerns, reviews the actual A4 PDF and approves that exact version for download. The demonstration runs on GCP and requires a shared class password.

Use the [PRD's class-demo scope](PRD.md#0-approved-class-demo-mvp-scope), [approved design brief](DESIGN.md), [Stitch screen references](stitch/README.md) and [architecture](architecture.md). Preserve the selected appearance while correcting prototype-only claims and controls. The archived HTML is reference material, not evidence of working AI or export.

## Current build status

**Selected target:** `vibecoda-499712` in the LUNR Studio organization, using `trishan@lunr.studio` in `us-central1`. See the [M0 setup record](setup.md) for verified infrastructure, secret locations and runtime evidence. The active build clock is running from 16:35:12 UTC to 17:20:12 UTC.

The owner has selected the GCP project/deployment identity, and both CHLD secrets are stored as version 1 with runtime reader policies verified. On 16 September 2026, the owner waived the planned $5 OpenRouter key limit for the class demo; the key currently has no per-key cap. Keep secret values out of this public project and repository. Use explicit project/account arguments rather than an unrelated CLI default.

The default deployment region is `us-central1`. `qwen/qwen3.7-flash` repeatedly returned 429 responses and exhausted 384 reasoning tokens during live probing, so the configured replacement is `google/gemini-2.5-flash-lite`. The small fallback live probe returned valid JSON in 671 ms at recorded cost `$0.00000795` through `google-ai-studio/flex`; that probe is not a guarantee of full-app quality, route provider or pricing. Missing credentials must show an honest configuration error rather than a simulated result.

Local source now exists as a Next 16 / React / TypeScript app with Basic Auth-protected UI/API routes, browser-session drafts and actual PDF generation. The current board has #1–#5 Done; #6–#10 remain deferred follow-up work. The current local check set includes 12 unit tests and 6 browser tests. Hosted reading and mathematics both passed at 17:16:01 UTC on runtime `d1931fa`; the canonical URL is `https://chld-adapt-8642258683.us-central1.run.app`.

## Build sequence and testable milestones

Use the linked issues as the authoritative work queue. Each issue includes implementation boundaries, dependencies, acceptance checkboxes and required completion evidence. Native GitHub dependency links mirror the sequence below.

| Milestone and issue | Allowance | What the teacher can do / pass condition |
| --- | --- | --- |
| **M0 — Ready to build:** [#1 Prepare prerequisites](https://github.com/trishanpanch/HSPH-AI-course-2026-Final-Project/issues/1) | Done at 17:01:04 UTC | Cloud target, permissions, two version 1 secrets, owner-approved key-cap exception, fallback probe and Cloud Run runtime injection verified |
| **M1 — Prepare a worksheet:** [#2 Interface and intake](https://github.com/trishanpanch/HSPH-AI-course-2026-Final-Project/issues/2) | Done | Enter and correct source/goal/grade/age, confirm completeness, choose 1–3 of all eleven needs for Group A and navigate without losing work; browser state and 390 px viewport checks passed |
| **M2 — Generate an adaptation:** [#3 Live plan and generation](https://github.com/trishanpanch/HSPH-AI-course-2026-Final-Project/issues/3) | Done | Review a plan, generate a live editable reading/math adaptation and recover from a failure; late results do not overwrite newer work |
| **M3 — Approve and download:** [#4 Exact A4 PDF](https://github.com/trishanpanch/HSPH-AI-course-2026-Final-Project/issues/4) | Done | Resolve concerns, review the actual PDF, approve and download those exact bytes; relevant edits revoke approval |
| **M4 — Share the working demo:** [#5 Cloud Run and smoke test](https://github.com/trishanpanch/HSPH-AI-course-2026-Final-Project/issues/5) | Done | Complete both example journeys on the password-protected deployed app, with correct PDFs and no exposed key |

Dependencies: **M0 → M1 → M2 → M3 → M4**. M4 also explicitly depends on M0's deployment readiness. Each milestone owns one implementation issue. The old four-by-15-minute allowance totaled 60 minutes, but the current run uses the 45-minute hard deadline above.

Stop implementation at 17:20:12 UTC and record elapsed time, the last passing milestone and the unfinished issue numbers. Leave incomplete issues open. Do not replace missing behavior with an unlabeled simulation to meet the deadline.

M2 evidence: a live math run found a numeric-change bug. Runtime numeric guards now reject changed numbers, and plan cautions are separated from student-facing instructions. The original failing case and a fresh live case both passed local retest, with evidence recorded in the ignored artifact `output/live-local-maths-retest.json`.

M3/M4 evidence: hosted reading and mathematics both passed at 17:16:01 UTC on runtime `d1931fa`. The real A4 PDFs are each one page, visually inspected with no clipping, and retain all questions: 4 reading and 3 mathematics. Downloaded bytes matched the reviewed PDF bytes by SHA verification. Missing UI credentials, wrong UI credentials and wrong API credentials all returned 401; 30 same-origin assets were checked with no API-key prefix exposed. Evidence is recorded in `docs/verification.md`, `docs/evidence/reading.pdf` and `docs/evidence/mathematics.pdf`.

Use the team's usual coding environment and coding assistant. Keep app code in this repository. Use **Todo → Ready → In Progress → Done**; Ready marks selected work, while Done means its checks passed and evidence is linked. A screenshot of a screen is not sufficient evidence that the model or PDF path works. Explain completed behavior in plain language so Victoria and the group can review it.

## Decisions that keep the release small

- One Next.js/TypeScript application; state stays in browser memory for the open session. No accounts, database, saved drafts or persistent browser storage.
- Pasted text only, one neutral group and one variant. Include all eleven checklist labels/explanations and the optional difficulty field. Hide upload, additional-group and batch-download controls.
- Teacher confirmation must establish that the source is complete and no essential diagram/table/visual was omitted. If one is required, use a different text-only worksheet; confirmation cannot waive missing content.
- Server-side `/api/plan` and `/api/adapt` call OpenRouter. Validate structured output, preserve source question references, keep the shared goal, flag concerns and bound requests/retries. Photo extraction is deferred.
- Application state owns approval. Model responses never approve a worksheet. Source/goal, needs/plan, content or print changes invalidate the relevant approval; ignore obsolete async results.
- Use a fixed readable A4 template with answer space and actual PDF preview. Keep the reviewed PDF bytes and permit current-approved downloads only. Extra typography controls and line drawings follow later.
- Deploy to Cloud Run with server-only Secret Manager values. HTTP Basic authentication uses username `class` and the shared password over HTTPS; protect all UI and AI routes. A content-free health check, if required, must not call AI. Missing authentication configuration fails closed.
- Keep practical input/output/time limits. The owner waived the $5 per-key cap for this class demo; revisit it before wider use. Never put keys, passwords, uploaded content or optional notes in public evidence or logs.

## Work after the hour

These five issues are in the same Project with the **follow-up** label and no current-build milestone. They preserve the broader PRD rather than expanding the first release.

| Issue | Later capability | Dependency |
| --- | --- | --- |
| [#6 DOCX and selectable-text PDF intake](https://github.com/trishanpanch/HSPH-AI-course-2026-Final-Project/issues/6) | Editable extraction, source confirmation and faithful content/assets | M4 |
| [#7 JPG/JPEG intake and diagram review](https://github.com/trishanpanch/HSPH-AI-course-2026-Final-Project/issues/7) | One printed page, source-image comparison and non-waivable completeness | M4 |
| [#8 Three independent groups](https://github.com/trishanpanch/HSPH-AI-course-2026-Final-Project/issues/8) | Deferred out of the MVP: separate plans, retries, approvals and PDFs with one shared goal for Groups A/B/C | M4 |
| [#9 Print controls and visual supports](https://github.com/trishanpanch/HSPH-AI-course-2026-Final-Project/issues/9) | Readability settings, handwriting-style type, reviewed line drawings and engagement supports | M4 |
| [#10 Full coverage and teacher evaluation](https://github.com/trishanpanch/HSPH-AI-course-2026-Final-Project/issues/10) | All checklist/input scenarios and intended-teacher learning test | #6–#9 |

## Evidence required for completion

For the class-demo MVP, use fictional reading and mathematics fixtures. Record actual live-model behavior and label injected failures or development fixtures separately. Each milestone's issue carries its own checklist; the minimum final evidence is:

- Focused state/response tests for missing or malformed output, late results, approval resets and stale PDF prevention.
- A browser journey from source through live plan/adaptation to approved download, plus a recoverable generation failure.
- Desktop and narrow-screen screenshots showing usable controls, checklist explanations and original/adapted review.
- Actual A4 reading/math PDFs inspected for all questions, answer space, clipping and page breaks; verify the download matches the reviewed snapshot.
- Deployed smoke results including missing/incorrect password rejection on direct AI requests, no paid call for unauthorized requests, no browser-visible key and correct session behavior.
- Commit/deployment revision, model, latency/cost, elapsed build time and outstanding issues. Never include secret values.

Full checklist scenario coverage and the intended-teacher evaluation happen in #10. A working class demonstration does not prove improved learning, reliable photo extraction or classroom readiness. The PRD's separate ten-minute teacher-use target remains a hypothesis to test.

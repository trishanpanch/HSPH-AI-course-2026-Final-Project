# CHLD Adapt — one-hour MVP project plan

**Approved plan, 16 September 2026.** This repository currently contains documentation and visual references. The application, live model integration and cloud deployment remain to be built and tested.

**[Open the public GitHub Project](https://github.com/users/trishanpanch/projects/10)** · [Repository issues](https://github.com/trishanpanch/HSPH-AI-course-2026-Final-Project/issues) · [Milestones](https://github.com/trishanpanch/HSPH-AI-course-2026-Final-Project/milestones)

## What we will demonstrate

A teacher pastes one simple text-only worksheet, confirms its contents and learning goal, selects one to three difficulties for one group, reviews a live AI adaptation plan, generates and edits the worksheet, resolves any concerns, reviews the actual A4 PDF and approves that exact version for download. The demonstration runs on GCP and requires a shared class password.

Use the [PRD's one-hour scope](PRD.md#0-approved-one-hour-mvp-scope), [approved design brief](DESIGN.md), [Stitch screen references](stitch/README.md) and [architecture](architecture.md). Preserve the selected appearance while correcting prototype-only claims and controls. The archived HTML is reference material, not evidence of working AI or export.

## Before the clock starts

**Selected target:** `vibecoda-499712` in the LUNR Studio organization, using `trishan@lunr.studio` in `us-central1`. See the [M0 setup record](setup.md) for verified infrastructure, secret locations and outstanding checks. M0 is in Ready at the owner's request and remains open; the clock has not started.

Complete **M0** first. The owner needs to select the GCP project/deployment identity and supply the OpenRouter key and class password securely. Prepare billing, APIs, permissions and Secret Manager, verify a live model probe, and set the initial $5 OpenRouter key limit. Keep secret values out of this public project and repository. Use explicit project/account arguments rather than an unrelated CLI default.

The default deployment region is `us-central1`; the model is `qwen/qwen3.7-flash`. Confirm actual availability and response behavior in M0. A change of model must be recorded. Missing credentials must show an honest configuration error rather than a simulated result.

This preparation is outside the one-hour implementation timebox. Creating this backlog does not mean M0 has passed.

## Build sequence and testable milestones

Use the linked issues as the authoritative work queue. Each issue includes implementation boundaries, dependencies, acceptance checkboxes and required completion evidence. Native GitHub dependency links mirror the sequence below.

| Milestone and issue | Allowance | What the teacher can do / pass condition |
| --- | --- | --- |
| **M0 — Ready to build:** [#1 Prepare prerequisites](https://github.com/trishanpanch/HSPH-AI-course-2026-Final-Project/issues/1) | Before the clock | Cloud target, permissions, two secrets, key limit and live model probe verified |
| **M1 — Prepare a worksheet:** [#2 Interface and intake](https://github.com/trishanpanch/HSPH-AI-course-2026-Final-Project/issues/2) | 15 minutes | Enter and correct source/goal/grade/age, confirm completeness, choose 1–3 of all eleven needs for Group A and navigate without losing work |
| **M2 — Generate an adaptation:** [#3 Live plan and generation](https://github.com/trishanpanch/HSPH-AI-course-2026-Final-Project/issues/3) | 15 minutes | Review a plan, generate a live editable reading/math adaptation and recover from a failure; late results do not overwrite newer work |
| **M3 — Approve and download:** [#4 Exact A4 PDF](https://github.com/trishanpanch/HSPH-AI-course-2026-Final-Project/issues/4) | 15 minutes | Resolve concerns, review the actual PDF, approve and download those exact bytes; relevant edits revoke approval |
| **M4 — Share the working demo:** [#5 Cloud Run and smoke test](https://github.com/trishanpanch/HSPH-AI-course-2026-Final-Project/issues/5) | 15 minutes | Complete both example journeys on the password-protected deployed app, with correct PDFs and no exposed key |

Dependencies: **M0 → M1 → M2 → M3 → M4**. M4 also explicitly depends on M0's deployment readiness. Each milestone owns one implementation issue. The four 15-minute allowances total **60 minutes**; they are planning budgets, not a guarantee.

Start the clock after M0 passes. Stop implementation at 60 minutes and record elapsed time, the last passing milestone and the unfinished issue numbers. Leave incomplete issues open. Do not replace missing behavior with an unlabeled simulation to meet the deadline.

Use the team's usual coding environment and coding assistant. Keep app code in this repository. Use **Todo → Ready → In Progress → Done**; Ready marks selected work, while Done means its checks passed and evidence is linked. A screenshot of a screen is not sufficient evidence that the model or PDF path works. Explain completed behavior in plain language so Victoria and the group can review it.

## Decisions that keep the release small

- One Next.js/TypeScript application; state stays in browser memory for the open session. No accounts, database, saved drafts or persistent browser storage.
- Pasted text only, one neutral group and one variant. Include all eleven checklist labels/explanations and the optional difficulty field. Hide upload, additional-group and batch-download controls.
- Teacher confirmation must establish that the source is complete and no essential diagram/table/visual was omitted. If one is required, use a different text-only worksheet; confirmation cannot waive missing content.
- Server-side `/api/plan` and `/api/adapt` call OpenRouter. Validate structured output, preserve source question references, keep the shared goal, flag concerns and bound requests/retries. Photo extraction is deferred.
- Application state owns approval. Model responses never approve a worksheet. Source/goal, needs/plan, content or print changes invalidate the relevant approval; ignore obsolete async results.
- Use a fixed readable A4 template with answer space and actual PDF preview. Keep the reviewed PDF bytes and permit current-approved downloads only. Extra typography controls and line drawings follow later.
- Deploy to Cloud Run with server-only Secret Manager values. HTTP Basic authentication uses username `class` and the shared password over HTTPS; protect all UI and AI routes. A content-free health check, if required, must not call AI. Missing authentication configuration fails closed.
- Preserve the $5 OpenRouter key limit and practical input/output/time limits. Never put keys, passwords, uploaded content or optional notes in public evidence or logs.

## Work after the hour

These five issues are in the same Project with the **follow-up** label and no one-hour milestone. They preserve the broader PRD rather than expanding the first release.

| Issue | Later capability | Dependency |
| --- | --- | --- |
| [#6 DOCX and selectable-text PDF intake](https://github.com/trishanpanch/HSPH-AI-course-2026-Final-Project/issues/6) | Editable extraction, source confirmation and faithful content/assets | M4 |
| [#7 JPG/JPEG intake and diagram review](https://github.com/trishanpanch/HSPH-AI-course-2026-Final-Project/issues/7) | One printed page, source-image comparison and non-waivable completeness | M4 |
| [#8 Three independent groups](https://github.com/trishanpanch/HSPH-AI-course-2026-Final-Project/issues/8) | Separate plans, retries, approvals and PDFs with one shared goal | M4 |
| [#9 Print controls and visual supports](https://github.com/trishanpanch/HSPH-AI-course-2026-Final-Project/issues/9) | Readability settings, handwriting-style type, reviewed line drawings and engagement supports | M4 |
| [#10 Full coverage and teacher evaluation](https://github.com/trishanpanch/HSPH-AI-course-2026-Final-Project/issues/10) | All checklist/input scenarios and intended-teacher learning test | #6–#9 |

## Evidence required for completion

For the one-hour MVP, use fictional reading and mathematics fixtures. Record actual live-model behavior and label injected failures or development fixtures separately. Each milestone's issue carries its own checklist; the minimum final evidence is:

- Focused state/response tests for missing or malformed output, late results, approval resets and stale PDF prevention.
- A browser journey from source through live plan/adaptation to approved download, plus a recoverable generation failure.
- Desktop and narrow-screen screenshots showing usable controls, checklist explanations and original/adapted review.
- Actual A4 reading/math PDFs inspected for all questions, answer space, clipping and page breaks; verify the download matches the reviewed snapshot.
- Deployed smoke results including missing/incorrect password rejection on direct AI requests, no paid call for unauthorized requests, no browser-visible key and correct session behavior.
- Commit/deployment revision, model, latency/cost, elapsed build time and outstanding issues. Never include secret values.

Full checklist scenario coverage and the intended-teacher evaluation happen in #10. A working class demonstration does not prove improved learning, reliable photo extraction or classroom readiness. The PRD's separate ten-minute teacher-use target remains a hypothesis to test.

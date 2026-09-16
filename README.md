# HSPH AI course 2026 Final Project

**CHLD Adapt** helps a primary-school teacher adapt an existing worksheet for learners with different needs, while keeping the learning goal and requiring teacher review before printing.

Original idea: **Victoria Nolasco**. Class project team: **Victoria, Trishan Panch and the group**.

**[GitHub Project: CHLD Adapt — One-hour MVP](https://github.com/users/trishanpanch/projects/10)** · [Build milestones](https://github.com/trishanpanch/HSPH-AI-course-2026-Final-Project/milestones)

The approved first release handles one pasted text worksheet and one group, with live AI, teacher review, approval and an A4 PDF. The current build run started at 16:35:12 UTC on 16 September 2026 and has a hard deadline of 17:20:12 UTC; the earlier 60-minute plan is now historical. M0–M4 are Done. The tested revision is live at [CHLD Adapt](https://chld-adapt-8642258683.us-central1.run.app); see the [verification record](docs/verification.md).

## Project documents

| Document | Purpose |
| --- | --- |
| [Project plan](docs/project-plan.md) | Issue sequence, prerequisites, current hard deadline and follow-up work. |
| [M0 setup record](docs/setup.md) | Selected GCP account/project, prepared identities/secrets and completed runtime verification. |
| [PRD](docs/PRD.md) | Approved class-demo scope, with broader requirements and teacher-evaluation goals retained. |
| [Design brief](docs/DESIGN.md) | Approved visual direction, MVP screen scope and corrections to prototype-only controls/claims. |
| [Stitch references](docs/stitch/README.md) | Original ZIP, six HTML/screenshot pairs and exported style guide, with preview index. |
| [Architecture](docs/architecture.md) | One-hour implementation profile, OpenRouter, Cloud Run, teacher approval and PDF generation. |
| [Pitch Deck v1](docs/Pitch-Deck-v1.html) | Original CHLD Adapt HTML pitch deck. Download the file and open it in a browser to present it. |
| [Vibecoda build pack](docs/Build-Pack/source-pack/README.md) | Original planning reports, decisions, open questions, reviews and provenance, with the earlier class facilitator materials. |

The **PRD governs the current product scope**. Its class-demo release section takes precedence over the broader follow-up requirements. The design brief adopts the selected Stitch appearance; the architecture describes the implemented MVP and broader follow-up design. The deck and build pack are earlier reference materials and may contain broader ideas or assumptions superseded by the group's discussion. Generated claims in the original pack and static Stitch screens are not evidence of completed software, classroom outcomes or validated demand.

## Getting started

1. Read the project plan and the class-demo sections of the PRD, design brief and architecture. Inspect the selected Stitch references.
2. For local development, run `npm ci`, copy `.env.example` to `.env.local`, fill local values without committing secrets and start with `npm run dev`.
3. Use the team's usual coding environment and model. Follow M1–M4 in the Project; test each milestone, link evidence and leave unfinished work open when the hard deadline ends.
4. Deploy corrected revisions with the repository Dockerfile, pinned Secret Manager versions and `OPENROUTER_MODEL=google/gemini-2.5-flash-lite`. The validated runtime is `d1931fa`; the canonical URL is verified and routes 100% of traffic to revision `chld-adapt-d1931fa`.

This repository contains project documentation, a pitch deck, static Stitch references and the current Next 16 / React / TypeScript app source. Local tests, production build and hosted reading/mathematics journeys passed. Classroom usefulness remains to be evaluated. Use fictional teaching materials and need groups. The repository and Project are public; keep keys and the shared class password out of both.

## Reference material

The build pack preserves the retrieved source reports and their supporting files. Some historical citations refer to temporary files or a Vibecoda administrator record; these are retained for provenance and are not publicly accessible evidence. The original class package also contains a [facilitator guide](docs/Build-Pack/FACILITATOR_GUIDE.md) and [worksheets](docs/Build-Pack/START_HERE.md); the current PRD takes precedence where scope differs.

The pitch deck embeds Playfair Display. Its [font licence](docs/Playfair-Display-OFL.txt) is included alongside it.

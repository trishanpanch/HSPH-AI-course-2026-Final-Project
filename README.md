# HSPH AI course 2026 Final Project

**CHLD Adapt** helps a primary-school teacher adapt an existing worksheet for learners with different needs, while keeping the learning goal and requiring teacher review before printing.

Original idea: **Victoria Nolasco**. Class project team: **Victoria, Trishan Panch and the group**.

**[GitHub Project: CHLD Adapt — One-hour MVP](https://github.com/users/trishanpanch/projects/10)** · [Build milestones](https://github.com/trishanpanch/HSPH-AI-course-2026-Final-Project/milestones)

The approved first release handles one pasted text worksheet and one group, with live AI, teacher review, approval and an A4 PDF. The four build milestones have a 60-minute total timebox after cloud/model setup is ready. The application has not been built yet.

## Project documents

| Document | Purpose |
| --- | --- |
| [Project plan](docs/project-plan.md) | Issue sequence, prerequisites, testable milestones, one-hour budget and follow-up work. |
| [M0 setup record](docs/setup.md) | Selected GCP account/project, prepared identities/secrets and remaining readiness checks. |
| [PRD](docs/PRD.md) | Approved one-hour scope, with broader requirements and teacher-evaluation goals retained. |
| [Design brief](docs/DESIGN.md) | Approved visual direction, MVP screen scope and corrections to prototype-only controls/claims. |
| [Stitch references](docs/stitch/README.md) | Original ZIP, six HTML/screenshot pairs and exported style guide, with preview index. |
| [Architecture](docs/architecture.md) | One-hour implementation profile, OpenRouter, Cloud Run, teacher approval and PDF generation. |
| [Pitch Deck v1](docs/Pitch-Deck-v1.html) | Original CHLD Adapt HTML pitch deck. Download the file and open it in a browser to present it. |
| [Vibecoda build pack](docs/Build-Pack/source-pack/README.md) | Original planning reports, decisions, open questions, reviews and provenance, with the earlier class facilitator materials. |

The **PRD governs the current product scope**. Its one-hour release section takes precedence over the broader follow-up requirements. The design brief adopts the selected Stitch appearance; the architecture proposes how to build it. The deck and build pack are earlier reference materials and may contain broader ideas or assumptions superseded by the group's discussion. Generated claims in the original pack and static Stitch screens are not evidence of completed software, classroom outcomes or validated demand.

## Getting started

1. Read the project plan and the one-hour sections of the PRD, design brief and architecture. Inspect the selected Stitch references.
2. Complete [M0 setup](https://github.com/trishanpanch/HSPH-AI-course-2026-Final-Project/issues/1): explicitly choose the GCP target and securely configure the model key and class password. The clock starts only after readiness checks pass.
3. Use the team's usual coding environment and model. Follow M1–M4 in the Project; test each milestone, link evidence and leave unfinished work open when the 60-minute timebox ends.

This repository currently contains project documentation, a pitch deck and static Stitch references. The prototype and its classroom usefulness remain to be built and tested. Use fictional teaching materials and need groups. The repository and Project are public; keep keys and the shared class password out of both.

## Reference material

The build pack preserves the retrieved source reports and their supporting files. Some historical citations refer to temporary files or a Vibecoda administrator record; these are retained for provenance and are not publicly accessible evidence. The original class package also contains a [facilitator guide](docs/Build-Pack/FACILITATOR_GUIDE.md) and [worksheets](docs/Build-Pack/START_HERE.md); the current PRD takes precedence where scope differs.

The pitch deck embeds Playfair Display. Its [font licence](docs/Playfair-Display-OFL.txt) is included alongside it.

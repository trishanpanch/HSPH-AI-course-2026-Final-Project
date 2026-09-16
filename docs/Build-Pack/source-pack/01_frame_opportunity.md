# 01 Shape the Idea

## Raw Idea
- The CHLD Teacher AI Studio is conceived as a lightweight, web-based utility designed to support classroom teachers in accommodating learners with diverse developmental, behavioral, and learning needs without requiring complex AI prompt engineering [1].
- The initial "skateboard" release for September 2026 focuses on two modular, non-diagnostic workflows: "Things to Try," which translates specific behavioral or participation hurdles into concrete classroom strategies with observable checkpoints, and "CHLD Adapt," which reformats and differentiates existing teacher worksheets and instructional tasks while explicitly safeguarding the original learning objective [1].

## Supplied Context
- Companion Hub for Learning and Discovery (CHLD) is an early-stage venture based at the Asian Institute of Management's Dado Banatao Incubator (AIM-DBI) in the Philippines, focusing on practical child development tools, educator training, and inclusive educational practices across home, school, and community touchpoints [2], [1].
- The Philippine educational landscape presents acute operational pressures, including large student-to-teacher class ratios, heavy administrative overhead, and scarce access to developmental pediatricians, educational psychologists, and allied therapy specialists [2], [1].
- CHLD's foundational product philosophy enforces a strict non-diagnostic boundary, human-in-the-loop decision-making, explainable heuristic or rule pathways for higher-consequence scenarios, and uncompromising data minimization that rejects invasive behavioral surveillance or the unnecessary collection of sensitive pediatric records [2], [1].
- Source literature from *npj Digital Medicine* introducing the PEARL-AI (Pediatrics EthicAl Recommendations List for AI) framework establishes that pediatric AI tools must enforce safety-by-design, non-maleficence, fail-safe fallbacks, contextual human agency, and strict data protection [3].
- The product initiative is timed to leverage a September 2026 community-building milestone to test a fully functional end-to-end prototype with real educators, subsidizing initial AI computational inference costs to eliminate sign-up friction before introducing formal institutional B2B/B2G monetization [1].

## User Buyer And Problem
- The core end-user is the mainstream classroom educator (initially in Philippine early childhood through early primary settings) who observes functional obstacles—such as seat-leaving, transition distress, instructional comprehension breakdown, or fine-motor fatigue—but lacks rapid, specialized guidance on practical, low-risk accommodations [2], [1].
- Existing alternative approaches (e.g., generic chatbots like ChatGPT/Claude, expansive platforms like MagicSchool AI or Eduaide, and content-differentiating utilities like Diffit) either demand advanced prompting skills, overwhelm teachers with generic recommendations, fail to account for local classroom constraints, or risk altering the core academic demand of assignments [1].
- The fundamental user pain is cognitive overload and execution friction: teachers have limited preparation time to hand-craft differentiated materials or search through clinical literature, leading to unaddressed classroom exclusion and behavioral escalation [2], [1].
- While individual teachers are the primary daily users, the long-term buyer persona consists of school administrators, private school networks, local government units (LGUs), and public education bodies who purchase institutional subscriptions bundled with CHLD professional development and inclusion training [1].
- A critical buyer requirement is compliance with data privacy mandates and institutional procurement standards, meaning the software must prove pedagogical safety and avoid storing identifiable student records or diagnostic classifications [2], [3].

## Proposed Mechanism
- The Teacher AI Studio operates as a card-based, guided web application where teachers navigate short, structured question sequences rather than entering open-ended prompts into an unconstrained chatbot [1].
- In the "Things to Try" workflow, the system guides the teacher to articulate observable student behaviors, references a curated, non-diagnostic child development knowledge base, and outputs 2–3 actionable, low-risk classroom adaptations paired with concrete observational metrics to monitor efficacy [1].
- In the "CHLD Adapt" workflow, teachers upload or paste existing teaching material, identify the specific learning barrier (e.g., visual density, multi-step instruction complexity, reading load), and receive an adapted, printable artifact where cognitive access is simplified while the underlying curricular demand is preserved [1].
- Behind the interface, specialized reasoning agents (e.g., child development specialist, curriculum assessor, adaptation formatter, safety/risk reviewer) coordinate to enforce safety boundaries, flag potential shifts in academic rigor (such as recall versus recognition), and prevent clinical labeling [1].

## Known Facts
- CHLD is based in the Philippines and adheres to a privacy-first, non-diagnostic, human-in-the-loop technology charter [2].
- General-purpose LLMs lack intrinsic safeguards against altering educational constructs when summarizing or simplifying classroom worksheets [1].
- The PEARL-AI guidelines mandate that AI touching pediatric populations must include human oversight, data minimization, fail-safe boundaries, and accessible reporting mechanisms [3].

## Inferred Claims
- Philippine educators will achieve significantly faster turnaround and higher classroom implementation fidelity with a structured, step-by-step UI than with open-prompt chat windows [1].
- School leaders and local government buyers will favor an inclusion-focused tool bundled with teacher training over ungrounded, standalone productivity AI tools [2], [1].

## Opportunity Thesis
- By replacing open-ended AI prompting with a structured, child-development-grounded utility that solves two distinct classroom pain points—actionable behavioral support and faithful task adaptation—CHLD can reduce teacher prep time, improve inclusive learning outcomes, and establish an ethically defensible foothold in Philippine educational technology [2], [1], [3].

## Critique Summary
- Risk of Educational Construct Dilution: Automatically simplifying worksheets risks inadvertently converting high-order cognitive evaluation into low-order recognition tasks (e.g., turning open recall into simple multiple choice), thereby degrading the teacher's original learning standard unless explicit guardrails intervene [1].
- Clinical and Safety Misclassification: Teachers might input descriptions of severe distress, suspected abuse, or acute physical aggression; the system must never attempt low-level classroom fixes when mandatory safeguarding escalation or specialized medical referral is required [1], [3].
- PII and Student Data Contamination: In an unauthenticated, zero-friction web tool, teachers might inadvertently paste student names, birthdates, or sensitive health observations, violating privacy principles unless client-side scrubbing and strict data discard policies are implemented [2], [3].
- Standalone App Fatigue and Friction: In high-workload Philippine schools with spotty internet connectivity, teachers may abandon standalone web utilities if the output requires extensive reformatting or if the workflow is slower than manual ad-hoc improvisations [2], [1].
- AI Hallucination and Layout Distortion: Parsing uploaded worksheets (especially scanned images or mixed-language Tagalog/English materials) can produce corrupted questions, answer leaks, or broken formatting, diminishing teacher trust [1].

## Strongest Current Direction
- Restrict v1 strictly to the dual-tool "skateboard" architecture ("Things to Try" and "CHLD Adapt") accessible via web without login hurdles for the September 2026 pilot [1].
- Anchor all adaptation and strategy generation to a curated, expert-reviewed knowledge base incorporating Universal Design for Learning (UDL), executive function scaffolding, and Philippine classroom context variables [2], [1].
- Implement explicit "Learning Target Preservation" checks in CHLD Adapt that warn the teacher whenever an adaptation alters the cognitive demand level [1].
- Enforce hard-coded safety triage rules in Things to Try that immediately route severe behavioral, self-harm, or safeguarding incidents to school protocol guidelines rather than generating classroom tips [1], [3].
- Structure outputs to be immediately classroom-ready (clean printable/downloadable HTML/PDF layouts) to minimize post-generation teacher editing [1].

## Unknowns
- Baseline digital literacy and specific device usage patterns (mobile smartphone browser vs. shared desktop) among target Philippine public and private school educators [2], [1].
- Frequency and complexity of bilingual code-switching (Tagalog/English) in submitted classroom materials and behavioral problem descriptions [2], [1].
- Long-term institutional willingness of Philippine LGUs or private school chains to fund recurring AI inference software licenses [1].

## Sources
[1] [PRODUCT_PROJECT.md](/tmp/vibecoda-cases/beta_61clJsO5Dx5FiASIM8hW_local-product-session-cc37a424-63a8-4adf-9e72-df76c4d2663a_1788972508637/inputs/sources/PRODUCT_PROJECT.md)
[2] [COMPANY_CONTEXT.md](/tmp/vibecoda-cases/beta_61clJsO5Dx5FiASIM8hW_local-product-session-cc37a424-63a8-4adf-9e72-df76c4d2663a_1788972508637/inputs/sources/COMPANY_CONTEXT.md)
[3] [SOURCE_CONTEXT.md](/tmp/vibecoda-cases/beta_61clJsO5Dx5FiASIM8hW_local-product-session-cc37a424-63a8-4adf-9e72-df76c4d2663a_1788972508637/inputs/sources/SOURCE_CONTEXT.md)
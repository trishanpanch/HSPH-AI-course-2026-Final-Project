# Venture Pitch Deck Outline

## Storytelling Direction
- **Narrative Arc:** The presentation follows an empathy-driven, problem-to-defensibility structure built for venture and impact investors. It opens with the severe operational tension in emerging market classrooms (specifically the Philippines), demonstrates how broad-brush generic AI fails educators, presents CHLD's disciplined, human-in-the-loop utility, details ethical and pedagogical defensibility, and culminates in a clear pilot execution roadmap and commercialization hypothesis [1], [2].
- **Tonal Identity:** Calm, authoritative, clinically disciplined, and mission-aligned. Avoid Silicon Valley hyperbole or ungrounded "AGI in education" claims; frame CHLD as practical, responsible infrastructure bridging child development science and daily classroom realities [1], [3].
- **Pacing and Cognitive Load:** Progress from visceral educator pain to structured mechanistic solution, using clear card-based layouts and modular visual chunks that mirror the product's own zero-prompt user experience [2].

## Visual System
- **Color Palette Intent:**
 - *Primary Core:* Warm Deep Navy (`#0F1E36`) to convey institutional trust, clinical grounding, and stability.
 - *Action Accent:* Calm Teal / Sage (`#0D9488` / `#14B8A6`) indicating growth, scaffolding, and practical intervention.
 - *Alert & Guardrail:* Controlled Amber (`#D97706`) and Coral (`#E11D48`) reserved exclusively for cognitive-demand warnings and safeguarding triage triggers [2].
 - *Backgrounds:* Muted Warm Off-White / Paper (`#F8FAFC` and `#F1F5F9`) ensuring low glare and high legibility across varied projection displays.
- **Typography:** Modern, clean humanist sans-serif hierarchy (e.g., Plus Jakarta Sans or Inter) optimized for structured cards, legible bullet points, and data density without visual crowding [2].
- **Visual Structure:** Generous whitespace, card-based groupings, visual comparative split-screens (e.g., "Generic Prompting vs. Guided Intake"), and distinct boundary badges (e.g., "Non-Diagnostic", "Zero-Retention Privacy") [1], [2].

## Asset Direction
- **Interface Schematics:** High-fidelity UI mockups illustrating the 4-step guided wizard, selectable observation cards, two-tier cognitive demand badges, and clean grayscale A4 printable outputs [2].
- **Architectural Diagrams:** Multi-agent background orchestration flows (Child Development, Curriculum Assessment, Adaptation Formatter, Safeguarding Gate) mapped against the curated knowledge base [2].
- **Process & Workflow Graphics:** Clear decision trees contrasting normal low-risk accommodation loops against deterministic safeguarding crisis hard-stops [2], [3].
- **Contextual Imagery:** Authentic classroom environment motifs representing high-ratio Philippine classrooms, avoiding generic stock imagery of Western high-tech settings [1].

## Motion and Transitions
- **Restrained Motion Philosophy:** Motion is functional, non-distracting, and subordinate to content comprehension. Transitions should convey calm progression rather than theatrical spectacle.
- **Slide Transitions:** Standard smooth horizontal push or opacity cross-fades (duration 250–300ms, standard easing) to simulate stepping through a structured workflow.
- **Element Animations:** Progressive staggered reveal of story beats and card elements (50–100ms stagger) to maintain audience focus during spoken delivery.
- **Interactive Emphasis:** Subtle border highlights or opacity shifts when drawing attention to guardrail mechanisms (such as the safeguarding filter or construct-change alert) [2].

## Accessibility
- **Contrast Ratios:** Strict WCAG 2.1 AAA compliance for text elements (contrast ratio >= 7:1 against background colors) and AA compliance for graphic interface borders and badges (>= 3:1).
- **Reduced-Motion Fallbacks:** Complete elimination of parallax, continuous pulsing, or auto-advancing slides when `prefers-reduced-motion: reduce` is detected, defaulting to instantaneous cut transitions.
- **Screen-Reader & High-Legibility Formatting:** Structural semantic hierarchy in underlying HTML/CSS implementations, avoiding reliance on color alone to convey meaning (e.g., pairing warning colors with explicit text icons/labels) [3].

## Factual Guardrails
- **Evidence Grounding:** All claims regarding child vulnerability, AI ethical risks, transferability failures, and governance are anchored directly in published pediatric medical AI literature (PEARL-AI, *npj Digital Medicine*, 2025) [3].
- **Non-Diagnostic Discipline:** CHLD products do not diagnose conditions, assign clinical labels (e.g., ADHD, ASD), or replace formal allied health assessments; they provide functional, low-risk classroom accommodations [1], [2].
- **Explicit Uncertainty Labeling:** Metrics regarding market size (TAM/SAM/SOM), exact LGU sales conversion velocity, and commercial pricing models are marked explicitly as `Validation required` rather than asserted as historical fact [2].
- **Zero-Surveillance Integrity:** Zero student data retention, unauthenticated pilot architecture, and client-side sanitization are non-negotiable architectural commitments [1], [2], [3].

---

## Slide 1 — Title and vision
- **Narrative purpose:** Introduce CHLD and frame the core mission: bridging child development expertise and classroom practice through responsible, non-diagnostic AI utilities [1], [2].
- **Headline:** Practical Inclusion Tools for Every Classroom: Putting Child Development Support into Daily Practice.
- **Story beats:**
 - Companion Hub for Learning and Discovery (CHLD) is built at the Asian Institute of Management's Dado Banatao Incubator (AIM-DBI) in the Philippines [1], [2].
 - Mainstream teachers are the frontline observers of developmental and learning needs, yet they lack rapid, practical tools to turn observations into classroom support [1], [2].
 - The CHLD Teacher AI Studio introduces a guided, zero-prompt utility designed to reduce teacher workload and make inclusive education immediately actionable [2].
 - Grounded in child development science, human-in-the-loop oversight, and strict privacy-by-design [1], [3].
- **Evidence and assumptions:**
 - *Supplied Fact:* CHLD is based at AIM-DBI and focuses on training, practical tools, and responsible technology in the Philippine context [1], [2].
 - *Inference:* Packaging child-development expertise into simple teacher workflows unlocks rapid classroom inclusion in under-resourced schools [1], [2].
 - *Assumption:* Educators will trust and adopt purpose-built utilities over unguided general LLMs [2].
- **Suggested visual assets and layout:** Hero slide layout featuring the CHLD brand lockup, clean typography, subtitle card, and a visual teaser graphic showing the dual-tool Studio interface ("Things to Try" and "CHLD Adapt") [2].
- **Motion or transition:** Smooth fade-in of header typography followed by subtle slide-up of the interface mockup.
- **Presenter intent:** Establish immediate institutional credibility, convey empathy for classroom educators, and set clear expectations around responsible, non-clinical AI innovation [1].

## Slide 2 — Problem
- **Narrative purpose:** Expose the acute operational and emotional pressures facing classroom educators when supporting struggling learners without specialist backing [1], [2].
- **Headline:** The Inclusion Gap: Heavy Workloads, Large Classes, and Scarce Specialist Support.
- **Story beats:**
 - In Philippine schools, teachers manage large class sizes with minimal access to developmental pediatricians, psychologists, or allied specialists [1], [2].
 - Teachers readily notice functional hurdles—seat-leaving, transition distress, instructional breakdown, fine-motor fatigue—but lack time and training to formulate accommodations [1], [2].
 - Existing worksheets and activities are often visually dense, linguistically heavy, or multi-step, excluding learners who understand concepts but struggle with task format [2].
 - Current workarounds (manual worksheet rewriting, late-night searching, peer improvisation) lead to teacher burnout and unaddressed student exclusion [2].
- **Evidence and assumptions:**
 - *Supplied Fact:* Philippine education suffers from large class sizes, limited specialist access, and high administrative friction [1], [2].
 - *Supplied Fact:* Commercial engagement algorithms and unguided screen time exacerbate neurobehavioral and attention challenges in young children [3].
 - *Validation required:* Quantitative data on average weekly hours spent by Philippine teachers manually adapting worksheets (Evidence needed: formal educator workload time-and-motion survey).
- **Suggested visual assets and layout:** Three-column comparative problem grid highlighting: (1) Resource Bottleneck (large ratios, no specialists), (2) Task Access Barrier (dense materials), (3) Execution Burnout (manual workarounds) [1], [2].
- **Motion or transition:** Left-to-right staggered card reveal matching the speaker's articulation of each pain point.
- **Presenter intent:** Validate the lived experience of teachers and illustrate why general-purpose productivity tools fail to solve the specialized challenge of classroom inclusion [2].

## Slide 3 — Target user and buyer
- **Narrative purpose:** Clearly delineate between the daily end-user (classroom teacher) and the institutional buyer (school networks, LGUs) [1], [2].
- **Headline:** Designed for the Educator, Purchased by the Institution.
- **Story beats:**
 - *End User:* Mainstream early childhood and early primary teachers (Kindergarten to Grade 4) in private and public schools navigating diverse classroom learning needs [1], [2].
 - *User Need:* A zero-prompt, friction-free tool delivering immediately actionable strategies and print-ready differentiated worksheets in under 3 minutes [2].
 - *Institutional Buyer:* School administrators, private school systems, and Local Government Units (LGUs) responsible for inclusive education mandates and teacher productivity [2].
 - *Buyer Need:* Safe, privacy-compliant, explainable software bundled with CHLD professional development and training [1], [2].
- **Evidence and assumptions:**
 - *Supplied Fact:* Initial focus is Philippine early childhood through early primary education [1], [2].
 - *Supplied Fact:* Long-term business model is B2B/B2G rather than expecting individual teachers to personally fund AI subscriptions [2].
 - *Validation required:* Specific procurement timeline and LGU budget line items for educational AI software licenses (Evidence needed: interviews with LGU education committee officers).
- **Suggested visual assets and layout:** Dual-persona card layout contrasting "The Daily User (Teacher)" with "The Economic Buyer (School Head / LGU)", outlining specific drivers, constraints, and success metrics for each [2].
- **Motion or transition:** Dual card slide-in from opposing horizontal edges, settling cleanly into a structured side-by-side comparison.
- **Presenter intent:** Reassure investors that CHLD understands B2B2C educational dynamics, avoiding reliance on fragile direct-to-consumer teacher monetization [2].

## Slide 4 — Proposed solution
- **Narrative purpose:** Introduce the CHLD Teacher AI Studio and its initial dual-tool "skateboard" architecture [2].
- **Headline:** The CHLD Teacher AI Studio: Two Focused Tools, Zero Prompting Burden.
- **Story beats:**
 - *A Guided Utility, Not a Chatbot:* Replaces blank-prompt chat windows with structured cards, simple choices, and concise questions [2].
 - *Tool 1: Things to Try:* Helps teachers move from broad, judgmental descriptions to observable behaviors, recommending 2–3 low-risk classroom adaptations with concrete observation metrics [2].
 - *Tool 2: CHLD Adapt:* Ingests existing worksheets or tasks and creates accessible, printable adaptations (chunked directions, visual spacing, choice boards) while explicitly protecting the learning goal [2].
 - *Uncompromising Ethics:* Non-diagnostic, privacy-first, zero-retention, and human-in-the-loop by design [1], [3].
- **Evidence and assumptions:**
 - *Supplied Fact:* The v1 product boundary is locked strictly to "Things to Try" and "CHLD Adapt" for the September 2026 pilot [2].
 - *Supplied Fact:* Pediatric AI literature (PEARL-AI) mandates human agency, fail-safe boundaries, and data minimization [3].
 - *Inference:* Constrained, specialized tools deliver higher pedagogical reliability than expansive, generic AI platforms [2].
- **Suggested visual assets and layout:** Two prominent product feature cards showcasing interface mockups of "Things to Try" and "CHLD Adapt" flanking a central "Child Development Knowledge Base & Guardrails" hub [2].
- **Motion or transition:** Central knowledge hub scales into view, followed by the two tool cards branching outward smoothly.
- **Presenter intent:** Demonstrate that CHLD is executing a tightly focused, high-conviction product wedge rather than trying to boil the ocean with broad generic tools [2].

## Slide 5 — Product journey and how it works
- **Narrative purpose:** Walk through the end-to-end user workflow, demonstrating how backend intelligence operates invisibly behind a lightweight UI [2].
- **Headline:** From Problem to Classroom-Ready Output in Under 3 Minutes.
- **Story beats:**
 - *Step 1: Zero-Login Intake:* Teacher opens the web URL without account setup, selecting a tool and answering 2–3 focused questions; client-side scrubbers strip any identifying PII [2], [3].
 - *Step 2: Deterministic Safety Screening:* Behavioral inputs pass through a hard-coded triage gate; acute crises (harm, abuse, medical) immediately trigger institutional safeguarding referral [2], [3].
 - *Step 3: Multi-Agent Reasoning:* Behind the scenes, Child Development, Curriculum, and Adaptation agents orchestrate responses grounded in the modular CHLD knowledge base [2].
 - *Step 4: Two-Tier Review & Print Export:* System flags cognitive-demand shifts (e.g., recall vs. recognition); teacher reviews, edits, and exports a clean, grayscale A4 printable sheet or strategy card [2].
- **Evidence and assumptions:**
 - *Supplied Fact:* Multi-agent backend includes child development, curriculum, adaptation, and review roles grounded in a curated knowledge base [2].
 - *Supplied Fact:* Ephemeral session processing with zero database logging ensures compliance with pediatric privacy mandates [1], [3].
 - *Inference:* Local input caching and grayscale A4 print optimization ensure high adoption in low-bandwidth school settings [1], [2].
- **Suggested visual assets and layout:** Four-step horizontal process pipeline: (1) Guided Intake $\rightarrow$ (2) Safety Triage Gate $\rightarrow$ (3) Multi-Agent Synthesis $\rightarrow$ (4) Classroom-Ready Print Export [2].
- **Motion or transition:** Step-by-step pipeline progression with an animated pulse traveling across connecting workflow nodes.
- **Presenter intent:** Prove that sophisticated AI reasoning and pediatric safeguards can coexist with extreme end-user simplicity [2], [3].

## Slide 6 — Why now
- **Narrative purpose:** Highlight the convergence of macro educational pressures, generative AI accessibility, and urgent pediatric governance mandates [1], [2], [3].
- **Headline:** Why Now: Macro Pressures Meet Responsible AI.
- **Story beats:**
 - *Escalating Classroom Diversity:* Mainstream teachers are mandated to support diverse learning and developmental needs amid post-pandemic learning gaps and high class ratios [1], [2].
 - *LLM Capability vs. Usability Friction:* Generative AI can adapt materials instantly, but generic chatbots place an unacceptable prompting and evaluation burden on busy educators [2].
 - *Ethical Pediatric Mandates:* Global consensus (PEARL-AI, 2025) demands pediatric AI systems enforce explainability, non-maleficence, and human oversight rather than unvalidated black-box models [3].
 - *CHLD Ecosystem Readiness:* Backed by AIM-DBI, CHLD is uniquely positioned at the intersection of clinical insight, educator training, and localized implementation [1], [2].
- **Evidence and assumptions:**
 - *Supplied Fact:* *npj Digital Medicine* (2025) published the PEARL-AI framework establishing child-centered medical/developmental AI ethics [3].
 - *Supplied Fact:* Adult AI models transfer poorly to pediatric populations (e.g., 36% sensitivity for mild pediatric fractures), necessitating child-specific design [3].
 - *Inference:* Educational technology that embeds pediatric guardrails directly into workflows will capture institutional trust before generic utilities [2], [3].
- **Suggested visual assets and layout:** A 3-pillar thematic layout: (1) Classroom Reality (Ratios & Gaps), (2) Generative AI Inflection, (3) Ethical Governance Standards (PEARL-AI) [1], [2], [3].
- **Motion or transition:** Smooth simultaneous entrance of the three thematic pillars with subtle highlight on the PEARL-AI citation badge.
- **Presenter intent:** Frame CHLD's market timing as uniquely advantageous: riding generative AI efficiency while solving the acute compliance and usability gaps that block institutional adoption [2], [3].

## Slide 7 — Market and current alternatives
- **Narrative purpose:** Position CHLD against generic AI tools and broad teacher platforms, defining our differentiated inclusion niche [2].
- **Headline:** Differentiation: Purpose-Built Inclusion vs. Generic Productivity.
- **Story beats:**
 - *Generic Chatbots (ChatGPT, Claude, Gemini):* Powerful but require expert prompt crafting; lack pediatric safeguards; prone to hallucinating clinical labels or diluting learning demands [2], [3].
 - *Broad Teacher AI Suites (MagicSchool AI, Eduaide.ai):* Broad feature catalogs (lesson plans, rubrics) that overwhelm teachers with choices rather than guiding specific inclusion hurdles [2].
 - *Content Differentiators (Diffit, Brisk Teaching):* Strong at reading-level adjustments, but lack behavioral strategy guidance, non-diagnostic framing, and local contextual grounding [2].
 - *The CHLD Edge:* Deep child-development domain logic, two-tier construct preservation checks, deterministic safeguarding triage, Taglish tolerance, and low-bandwidth print optimization [1], [2].
- **Evidence and assumptions:**
 - *Supplied Fact:* Named alternatives include ChatGPT, MagicSchool AI, Diffit, Eduaide.ai, and Brisk Teaching [2].
 - *Supplied Fact:* CHLD does not compete on raw tool quantity, but on guided inclusion safety and pedagogical fidelity [2].
 - *Validation required:* Total Addressable Market (TAM) and Serviceable Addressable Market (SAM) valuation for Philippine EdTech and inclusion software (Evidence needed: local educational spending data analysis).
- **Suggested visual assets and layout:** 2x2 Positioning Matrix (X-axis: Generic Productivity $\rightarrow$ Specialized Child Development; Y-axis: Open Prompt Burden $\rightarrow$ Guided Zero-Prompt Workflow), positioning CHLD in the optimal top-right quadrant [2].
- **Motion or transition:** Matrix axes render first, followed by competitor logos plotting across quadrants, culminating in CHLD's illuminated badge.
- **Presenter intent:** Show that CHLD is not trying to "out-LLM" foundation model providers; our defensibility is workflow specialization, safety governance, and implementation fidelity [1], [2].

## Slide 8 — Business-model and go-to-market hypotheses
- **Narrative purpose:** Articulate the phased commercialization model from subsidized pilot adoption to institutional B2B/B2G contracts [1], [2].
- **Headline:** Phased Monetization: Subsidized Wedge to Institutional SaaS & Services.
- **Story beats:**
 - *Phase 1 (Wedge Pilot - Sept 2026):* Subsidize AI inference costs; provide zero-login, unauthenticated access to eliminate onboarding friction and generate classroom adoption data [2].
 - *Phase 2 (B2B School Subscriptions):* Package Studio access into institutional annual subscriptions for private school networks, bundled with CHLD teacher training and inclusion workshops [1], [2].
 - *Phase 3 (B2G Municipal Contracts):* Partner with Local Government Units (LGUs) and public division offices to deploy Studio licenses across public district clusters [1], [2].
 - *Flexible Enterprise AI Integration:* Enable larger school systems with existing enterprise AI contracts (e.g., Azure, Google Cloud) to connect their own API infrastructure [2].
- **Evidence and assumptions:**
 - *Supplied Fact:* Initial pilot inference is subsidized by CHLD; long-term monetization targets B2B private schools and B2G LGUs bundled with training [1], [2].
 - *Assumption:* Bundling software with educator professional development increases institutional retention and willingness to pay [1], [2].
 - *Validation required:* Unit economics, exact annual contract value (ACV) tiers, and gross margins under variable token inference costs (Evidence needed: pilot computational usage metrics).
- **Suggested visual assets and layout:** Three-tier horizontal monetization ladder: (1) Free Zero-Login Pilot $\rightarrow$ (2) B2B Private School Bundle $\rightarrow$ (3) B2G District/LGU Enterprise Tier [2].
- **Motion or transition:** Upward stepped transition illustrating growth in contract scale and customer lifetime value.
- **Presenter intent:** Provide investors a realistic, sustainable commercial roadmap that leverages training and institutional budgets rather than chasing low-retention consumer subscriptions [1], [2].

## Slide 9 — Evidence, validation, competition, and defensibility
- **Narrative purpose:** Detail the rigorous pre-pilot benchmark framework and structural moats protecting CHLD from commoditization [1], [2], [3].
- **Headline:** Rigorous Quality Validation and Multidisciplinary Moats.
- **Story beats:**
 - *Pre-Pilot Quality Benchmark:* 50 authentic Philippine classroom cases evaluated across 8 dimensions (Construct Preservation, Safety Triage, Non-Diagnostic Framing, etc.) with binary zero-critical-failure gates [4].
 - *Curated Knowledge Defensibility:* Grounded in proprietary child development decision rules and Universal Design for Learning (UDL) frameworks that update without retraining base models [1], [2].
 - *Pediatric Safety Governance:* Hard-coded safeguarding filters and compliance with published PEARL-AI guidelines establish high institutional trust [2], [3].
 - *Multidisciplinary Ecosystem Advantage:* CHLD combines clinical insight, pedagogical expertise, educator training, and incubation at AIM-DBI [1], [2].
- **Evidence and assumptions:**
 - *Supplied Fact:* Benchmark protocol enforces >= 4.0/5.0 expert score and 0 critical failures across 8 dimensions before release [4].
 - *Supplied Fact:* PEARL-AI Level C evidence standard requires proactive ethical oversight throughout the AI lifecycle [3].
 - *Inference:* Proprietary domain curation and clinical alignment create stronger enterprise defensibility than raw model parameter size [1], [2].
- **Suggested visual assets and layout:** Quadrant layout showcasing: (1) 8-Dimension Benchmark Rubric, (2) Curated Knowledge Architecture, (3) PEARL-AI Safety Protocol, (4) Multidisciplinary Network Moat [1], [4], [3].
- **Motion or transition:** Staggered card appearance with checkmark visual indicators validating each defensibility pillar.
- **Presenter intent:** Prove to technical and clinical evaluators that CHLD enforces higher evidence standards than conventional AI wrappers [1], [3].

## Slide 10 — Milestones, next steps, and the ask
- **Narrative purpose:** Outline key execution milestones leading to the September 2026 pilot and state the specific partnership and advisory ask [1], [2].
- **Headline:** Roadmap to Impact: September 2026 Skateboard Pilot and Beyond.
- **Story beats:**
 - *Phase 1 (Immediate - Q3 2026):* Execute 50-artifact expert benchmark; finalize lightweight, low-bandwidth web prototype with local draft caching [2], [4].
 - *Phase 2 (Milestone - Sept 2026):* Deploy unauthenticated skateboard pilot at CHLD community-building event with 30–50 practicing educators; collect live usability and safety telemetry [2].
 - *Phase 3 (Post-Pilot - Q4 2026):* 10-day classroom cohort trials with 15 partner schools; refine knowledge base and draft institutional B2B/B2G compliance packages [2], [4].
 - *The Ask:* Seed capital / grant funding and pilot partnerships with private school networks and municipal education leaders to scale responsible AI inclusion across the Philippines [1], [2].
- **Evidence and assumptions:**
 - *Supplied Fact:* September 2026 community event is the target milestone for the live end-to-end prototype [2].
 - *Supplied Fact:* Pilot target is 30–50 educators followed by a 15-teacher classroom implementation cohort [4].
 - *Validation required:* Specific financial seed funding target and runway budget (Evidence needed: formal financial modeling and infrastructure operational budget).
- **Suggested visual assets and layout:** Horizontal Milestone Timeline (Benchmark Gate $\rightarrow$ Sept 2026 Community Pilot $\rightarrow$ School Cohort Trials $\rightarrow$ Institutional Rollout) paired with a high-impact "Investment and Partnership Ask" callout box [2], [4].
- **Motion or transition:** Smooth horizontal timeline progression illuminating milestones chronologically, culminating in an emphatic fade-in of the final ask card.
- **Presenter intent:** Close with high momentum, clear operational clarity, and an invitation for values-aligned investors and institutional partners to support the initiative [1], [2].

## Sources
[1] [COMPANY_CONTEXT.md](/tmp/vibecoda-cases/beta_61clJsO5Dx5FiASIM8hW_local-product-session-cc37a424-63a8-4adf-9e72-df76c4d2663a_1788972508637/inputs/sources/COMPANY_CONTEXT.md)
[2] [PRODUCT_PROJECT.md](/tmp/vibecoda-cases/beta_61clJsO5Dx5FiASIM8hW_local-product-session-cc37a424-63a8-4adf-9e72-df76c4d2663a_1788972508637/inputs/sources/PRODUCT_PROJECT.md)
[3] [SOURCE_CONTEXT.md](/tmp/vibecoda-cases/beta_61clJsO5Dx5FiASIM8hW_local-product-session-cc37a424-63a8-4adf-9e72-df76c4d2663a_1788972508637/inputs/sources/SOURCE_CONTEXT.md)
[4] [INPUTS.md](/tmp/vibecoda-cases/beta_61clJsO5Dx5FiASIM8hW_local-product-session-cc37a424-63a8-4adf-9e72-df76c4d2663a_1788972508637/inputs/sources/INPUTS.md)
# Decision Log: CHLD Teacher AI Studio

## DEC-FRAME-001: Scope Initial V1 to a Two-Tool Guided Studio
- **Status:** Locked
- **Context:** CHLD requires an actionable, testable "skateboard" product for a September 2026 community milestone rather than a comprehensive, bloated educational platform [1].
- **Decision:** Restrict the v1 product boundary strictly to two guided workflows: (1) "Things to Try" for functional, non-diagnostic behavioral and participation strategies, and (2) "CHLD Adapt" for rapid material differentiation and formatting [1].
- **Consequences:** Eliminates prompt-writing burdens for teachers while providing a tightly bounded testbed for evaluating AI adaptation fidelity and safety guardrails.

## DEC-FRAME-002: Enforce Non-Diagnostic and Non-Surveillance Product Boundaries
- **Status:** Locked
- **Context:** Pediatric AI systems must prioritize non-maleficence, child safety, and data minimization as outlined in CHLD company values and the PEARL-AI framework [2-3].
- **Decision:** The Studio will not collect identifiable student records, assign clinical diagnostic labels, or replace formal professional evaluations. Higher-consequence behavioral situations will use deterministic rule pathways rather than unconstrained generative suggestions [2][1].
- **Consequences:** Mitigates ethical, medical, and legal liabilities; aligns with pediatric ethical standards; and maintains trust among educators and school administrators.

## DEC-FRAME-003: Subsidized, Zero-Login V1 Access Model
- **Status:** Locked
- **Context:** Fast teacher adoption and usability validation during early pilot stages require minimizing onboarding friction [1].
- **Decision:** Deploy the September 2026 v1 release as an open, unauthenticated web utility with CHLD subsidizing inference costs, deferring institutional B2B/B2G account management and billing to subsequent phases [1].
- **Consequences:** Maximizes user engagement during the pilot while requiring client-side data hygiene guardrails to prevent accidental PII retention.

## DEC-TEST-001: Multi-Tier Pre-Pilot Benchmark Protocol
- **Status:** Approved
- **Context:** Deploying generative tools directly into classrooms without structured offline evaluation creates risks of educational construct degradation and safety triage oversights [1][3].
- **Decision:** Mandate a 50-artifact standardized lab benchmark evaluated by a multidisciplinary expert panel (developmental specialist, master teacher, psychologist) prior to live classroom pilot testing [2][1].
- **Consequences:** Establishes objective quantitative baselines for construct preservation, non-diagnostic compliance, and safety filtering before real educators interact with the product.

## DEC-TEST-002: Mandatory Two-Tier Cognitive-Demand Classification in CHLD Adapt
- **Status:** Approved
- **Context:** Simplifying instructional materials risks inadvertently altering assessment demands without teacher awareness [1].
- **Decision:** Categorize adaptations into "Access change" (learning task retained) and "Changes task demand" (e.g., recall to recognition). Require explicit teacher confirmation ("Use this version") on demand changes [1].
- **Consequences:** Preserves teacher pedagogical agency, prevents accidental dilution of academic standards, and complies with Universal Design for Learning principles.

## DEC-TEST-003: Authoritative Safeguarding Hard-Stops for Things to Try
- **Status:** Approved
- **Context:** AI must not attempt ordinary behavioral coaching during acute safety, abuse, or medical crises [1][3].
- **Decision:** Implement deterministic hard stops covering imminent harm, weapons, severe aggression, self-harm, suspected abuse, missing children, and medical emergencies, immediately halting generation and directing educators to school safeguarding protocols [1][3].
- **Consequences:** Complies with PEARL-AI non-maleficence mandates and prevents dangerous AI interventions in high-consequence situations.

## DEC-TEST-004: Bilingual Taglish Input Tolerance with Source-Preserving Output
- **Status:** Approved
- **Context:** Philippine educators frequently code-switch between Tagalog and English [2][1].
- **Decision:** Support English, Tagalog, and Taglish inputs. Generate "Things to Try" in the user's primary language while strictly preserving the language of adapted instructional materials without unauthorized translation [1].
- **Consequences:** Eliminates language friction for Philippine teachers while safeguarding curricular fidelity in classroom worksheets.

## DEC-TEST-005: Zero Application-Level Retention Architecture
- **Status:** Approved
- **Context:** Pediatric AI ethics require strict data minimization and elimination of unnecessary student records [2-3].
- **Decision:** Eliminate user accounts, prohibit student PII entry, scrub identifiers client-side, process requests ephemerally in memory without DB logging, delete temporary files immediately, and configure AI API endpoints for zero-retention [2-3].
- **Consequences:** Protects child privacy, avoids regulatory liability, and enforces privacy-by-design standards across the complete technology stack.

## DEC-TEST-006: 8-Dimension Evaluation Rubric and Critical Failure Standards
- **Status:** Approved
- **Context:** Benchmark testing requires standardized, repeatable scoring to evaluate construct fidelity, safety, and non-diagnostic boundaries [1][3].
- **Decision:** Adopt an 8-dimension scoring rubric (1–5 scale) covering Construct Preservation, Appropriateness of Adaptation, Safety/Escalation, Non-Diagnostic Framing, Practical Usefulness, Clarity/Accessibility, Factual Accuracy, and Teacher Control/Transparency. Enforce binary critical failure gates requiring an average >= 4.0/5.0 and 0 critical failures before pilot deployment [1].
- **Consequences:** Provides rigorous quality assurance and objective go/no-go thresholds for each transformation type.

## DEC-TEST-007: Low-Bandwidth and Grayscale-Print First Architecture
- **Status:** Approved
- **Context:** Philippine schools face uneven internet connectivity and rely heavily on black-and-white A4 printing [2].
- **Decision:** Design lightweight web pages using system fonts and minimal assets, cache input drafts locally in the browser to prevent text loss during dropouts, and provide high-contrast grayscale A4 print stylesheets and offline-usable downloads [2][1].
- **Consequences:** Ensures high operational reliability and immediate classroom adoption across resource-constrained school settings.

## DEC-BUILD-001: Commercial Pilot Authorization and Implementation Hand-off
- **Status:** Approved
- **Context:** The opportunity framing and test plans are fully validated, and a clear architectural path exists to deliver the skateboard release for September 2026 [1].
- **Decision:** Authorize progression to final pitch deck generation and prototyping execution based on the locked dual-tool architecture, subsidized inference model, and zero-retention guardrails [1-2].
- **Consequences:** Unlocks solution development while preserving all ethical, educational, and technical safety boundaries.

## Sources
[1] [PRODUCT_PROJECT.md](/tmp/vibecoda-cases/beta_61clJsO5Dx5FiASIM8hW_local-product-session-cc37a424-63a8-4adf-9e72-df76c4d2663a_1788972508637/inputs/sources/PRODUCT_PROJECT.md)
[2] [COMPANY_CONTEXT.md](/tmp/vibecoda-cases/beta_61clJsO5Dx5FiASIM8hW_local-product-session-cc37a424-63a8-4adf-9e72-df76c4d2663a_1788972508637/inputs/sources/COMPANY_CONTEXT.md)
[3] [SOURCE_CONTEXT.md](/tmp/vibecoda-cases/beta_61clJsO5Dx5FiASIM8hW_local-product-session-cc37a424-63a8-4adf-9e72-df76c4d2663a_1788972508637/inputs/sources/SOURCE_CONTEXT.md)
# CHLD Adapt: PRD for the class prototype

**Draft for group review**

> Markdown snapshot: 15 September 2026. Source: [shared group-review PRD](https://docs.google.com/document/d/1pvBxuCi-qup03f2KGhPv91BnLudAvdFDAvfbOgjGQZY/edit). This file preserves the document’s current requirements, metrics and build plan. No comments or suggested edits were present when exported.
>
> Companion: [DESIGN.md](DESIGN.md) translates this PRD into prototype screens and design guidance. The PRD governs product scope; visual choices in the design brief are proposals for testing.

## 1. Understand: user, problem and purpose

Original idea: Victoria Nolasco

Class team: Victoria, Trishan Panch and the group

Maturity: exploratory prototype using fictional teaching materials and need groups.

Product statement: For a primary-school teacher preparing a lesson, CHLD Adapt turns an existing worksheet into a small set of printable adaptations for learners with different observable needs, while preserving the learning goal and keeping the teacher responsible for the final material.

The initial setting is public and private schools in the Philippines, serving children aged approximately 7–12. The first intended user is the Grade 2 teacher Victoria described, who teaches about 30 pupils.

Teachers currently need to adapt materials for different learners alongside their other preparation work. The prototype should help them produce usable variants without describing every formatting change or learning how to write AI prompts.

### Evidence status

- Victoria’s account of teachers’ needs, her earlier design work and the intended first teacher are user reports. Supporting research records and direct observations of that teacher were not supplied.

- The scope decisions below reflect the group’s discussion and subsequent clarifications.

- Claims of time savings, classroom usefulness and improved learning remain untested.

- The latest discussion and checklist supersede conflicting suggestions in the earlier deck and build pack.

## 2. Specify: the complete teacher journey

### A. Supply the lesson and existing material

The teacher enters:

- The learning goal in their own words.

- Grade and approximate age range.

- Existing material through pasted text, a Word .docx file or a PDF with selectable text.

Existing material is required. Creating a worksheet from the learning goal alone is outside this version.

For uploads, show the extracted content for the teacher to check and correct before proceeding. Scanned documents and complex layouts that cannot be read reliably receive a clear explanation and a pasted-text fallback.

### B. Describe up to three need groups

Use neutral labels such as “Group A,” rather than individual pupil records or diagnostic categories.

For each group, ask:

“What makes this worksheet difficult for this group?”

Retain all eleven checklist items. Present short checkbox labels under three headings, with Victoria’s explanations available beside each item or through an accessible “More information” control.

| Checklist section | Options |
| --- | --- |
| Reading and concepts | Reading the words; Understanding the language; Understanding abstract ideas; Using prerequisite skills or knowledge |
| Instructions and organization | Following multistep directions; Managing the amount of work; Keeping track of information; Getting started and organizing answers |
| Responding and using the page | Writing or recording answers; Seeing and navigating the page; Staying engaged with the task |

Default to keep the interaction manageable: select one to three difficulties per group. The checklist guides adaptation; it does not assess or diagnose learners.

Include the optional field:

“Anything else we should know about what is difficult?”

Explain that the field is for worksheet difficulties, without pupil names or personal histories.

### C. Review the proposed adaptations

For each group, show a short proposed approach before generating its worksheet—for example, separating instructions into steps or placing fewer questions on each page.

The teacher can revise the selected needs or proceed. Generate one variant per group, up to three in total. Avoid generating every possible combination of checklist selections.

Every variant includes:

- Its group label and selected difficulties.

- The shared learning goal.

- An editable worksheet.

- A brief explanation of the changes.

- Any concern that a change may affect what the worksheet tests.

### D. Review, approve and download

The teacher can compare each variant with the original, make corrections and approve that specific version.

Provide a separate printable PDF for each approved variant. Use clear, high-contrast A4 layouts with adequate writing space. Simple printable visual cues or diagrams are included where useful and subject to teacher review.

Approved PDFs can be downloaded again during the session and reused afterward by reprinting. Editable sessions do not persist after the tool is closed.

## 3. Requirements, boundaries and recovery

The learning goal remains fixed across variants. Changing presentation must not silently remove questions, supply answers or eliminate required reasoning.

The checklist describes difficulties, not automatic transformation rules. In particular:

- Simplifying vocabulary may undermine a vocabulary or reading task.

- Worked examples, reference boxes and sentence starters may reveal an assessed answer.

- Pictures or concrete examples may change a task intended to test abstract reasoning.

- Managing workload means dividing work into sections or pages, rather than silently deleting required items.

- Alternative response formats must retain the skill being assessed.

An automated check may identify a concern, but it must not present its own reassurance as proof of educational suitability.

### Human review requirements

- The teacher reviews the original, the learning goal, the exact variant and any warnings.

- The teacher can edit, regenerate or discard a variant.

- A flagged concern requires correction or explicit teacher confirmation that the learning goal remains unchanged.

- Editing or regenerating a variant removes its approval.

- Changing the source material or learning goal removes all existing approvals.

- PDF download uses the approved version. Without approval, the variant remains a draft.

### Recovery requirements

- Missing inputs receive specific, actionable guidance.

- Failed file extraction preserves the available input and offers text paste.

- Failed generation preserves the source, group settings and other completed variants.

- The teacher can retry one failed variant without regenerating the others.

- A blank or unusable model response never appears as an approved worksheet.

Outside this version: diagnosis, pupil accounts, individual learner histories, deliberately modified learning goals, student-facing digital activities, saved libraries, school-system integrations, scanned-image recognition and custom AI illustrations.

Use an English interface and preserve the source material’s language without automatic translation. Record the languages actually tested; do not infer Filipino or Taglish reliability from English results.

## 4. Build: two class sessions

Use the team’s usual coding environment and model. Store code and documents in a separate CHLD Adapt GitHub repository, with GitHub Projects and Issues as the authoritative backlog.

### Build session 1: complete one journey

Implement source intake and extraction review, the learning goal, one need group, a proposed adaptation, an editable variant, approval and PDF download.

Finish with one working journey using a fictional worksheet, including recovery from a failed generation.

### Build session 2: complete the agreed scope

Extend the journey to three groups and independent variants. Add the checklist explanations, optional context field, simple visual support and approval reset behavior.

Test both reading and mathematics, repair the failures that affect the journey, and prepare the pitch and demonstration.

Each feature Issue records its purpose, requirement, expected behavior, dependency, acceptance check and completion condition. Stop adding features when the planned learning test is possible.

The PRD belongs in docs/PRD.md. Keep evidence and decisions in docs/evidence-and-decisions.md, and link the GitHub backlog from docs/project-plan.md. Implementation and model choices belong in the subsequent technical design.

## 5. Test, measure and decide

Primary learning question: Can the intended teacher turn an existing worksheet into an approved, useful set of adaptations for a lesson within ten minutes?

First learning test: Invite Victoria’s intended Grade 2 teacher to complete separate reading and mathematics tasks using fictional materials. Victoria provides expert review. If only class participants are available initially, record that limitation rather than treating them as representative teacher evidence.

Timing: Measure from the first material-entry action through review, correction, approval and PDF download for the selected set of up to three variants. Record the number of variants and any facilitator assistance.

| Measure | Initial target |
| --- | --- |
| Classroom readiness and preparation time | Every participating teacher completes the assigned set within ten minutes and judges each final variant usable |
| Approval integrity | Every downloaded PDF matches its approved version; zero stale or unapproved exports |
| Educational suitability | Record teacher and expert judgments, required corrections and unresolved concerns; no agreed percentage threshold yet |
| Learning impact | Outside what this prototype test can establish |

The 100% completion target is a test target, not a claim of guaranteed performance. Report the participant count and individual results alongside percentages.

### Required scenarios

- Reading and mathematics worksheets, including a three-group run.

- Every checklist option represented across the test examples.

- A support request that could reveal an answer or change the assessed skill.

- Missing material, unreadable uploads and unavailable generation.

- Teacher correction, regeneration and approval of different variants.

- Editing an approved variant, then confirming fresh approval is required.

- Printed/PDF layout inspection for clipping, page breaks, writing space and visual accuracy.

### Next decision

- If the journey works and the teacher finds it useful, proceed to a further controlled teacher test.

- If it is too slow or requires repeated explanation, simplify the interaction before adding features.

- If adaptations change learning goals, narrow the available transformations and retest.

- Any incorrect-version export or unresolved educational concern prevents progression of the affected behavior.

- The upcoming event can demonstrate the prototype; it does not establish readiness for routine classroom use.

## Appendix: Victoria’s full checklist

Original prompt: “What makes this worksheet difficult for your learner?”

The wording below is supplied by Victoria. The prototype groups these items as described in Section 2 and asks about a need group rather than collecting individual pupil records.

### Reading the words

needs support decoding unfamiliar words or reading longer passages.

### Understanding the language

needs simpler vocabulary, shorter sentences, or explanations of unfamiliar terms.

### Following multistep directions

needs instructions broken into clear steps, with an example.

### Managing the amount of work

needs fewer items visible at once or work divided into smaller sections over more pages.

### Keeping track of information

needs reminders, reference boxes, or key information placed beside the question.

### Getting started and organizing answers

needs a worked example, sentence starters, or a planning guide.

### Writing or recording answers

needs more writing space, less copying, or another way to respond.

### Seeing and navigating the page

needs larger text, clearer spacing, stronger contrast, or less visual clutter.

### Understanding abstract ideas

needs concrete examples, pictures, or familiar situations.

### Using prerequisite skills or knowledge

needs a brief review or scaffold for skills the worksheet assumes.

### Staying engaged with the task

needs shorter sections, clear stopping points, or meaningful choices.

Optional field: “Anything else we should know about what is difficult?”


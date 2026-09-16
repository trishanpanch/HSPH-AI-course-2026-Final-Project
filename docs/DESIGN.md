# CHLD Adapt — prototype design brief for Google Stitch

**Status:** Stitch visual direction approved; implementation guidance revised 16 September 2026. The class-demo MVP scope below is approved. M0–M4 are Done. The tested revision is live at [CHLD Adapt](https://chld-adapt-8642258683.us-central1.run.app); see the [verification record](docs/verification.md). The app uses `google/gemini-2.5-flash-lite` through OpenRouter for the current build, after the original Qwen candidate failed live probing.

**Product owner / original idea:** Victoria Nolasco; class team: Victoria, Trishan Panch and the group.  
**Requirements:** [PRD.md](PRD.md), derived from the [shared Google Doc](https://docs.google.com/document/d/1pvBxuCi-qup03f2KGhPv91BnLudAvdFDAvfbOgjGQZY/edit) with the later approved class-demo repository addendum. The Google Doc has not been updated with that addendum.

The PRD defines what must work. The [selected Stitch export](stitch/README.md) supplies the approved visual direction. This brief translates that direction into the current release, correcting prototype copy and controls that conflict with the PRD. Approval of the appearance is not evidence of teacher testing or implemented behavior.

## Approved class-demo MVP screen scope

Keep the warm paper surfaces, crimson actions, Playfair Display headings, Inter interface text and side-by-side source/adaptation review. Use the desktop intake and review screenshots as the principal layout references; the other exported screens guide the remaining steps. Preserve all original exports as references rather than editing them to represent implementation progress.

| Step | Class-demo release | Later release |
| --- | --- | --- |
| Worksheet | Paste a simple text-only worksheet; goal, grade/age; editable source; confirm complete content and no omitted essential visual | DOCX/PDF/JPG intake, extracted-content and image review |
| Groups | Group A only; all eleven labels/explanations; select 1–3 needs and optional context | Add/switch Groups B and C |
| Plan | Show a live AI plan for that group before generation | Multi-group plans and progress |
| Review | Original and editable adaptation; goal, change summary, concern decisions; actual A4 PDF preview and explicit approval | Source-image comparison and additional print/visual controls |
| Download | One approved current PDF, with approval reset after relevant changes | Multiple independent group PDFs |

Hide upload, extra-group and batch-download controls in the MVP. Missing essential visual content blocks use of that source; choose a complete text-only worksheet. A shared browser password prompt protects the hosted class demo; do not add an account or learner-profile interface. Follow [project-plan.md](project-plan.md) for milestone checks and the current 45-minute hard deadline ending at 17:20:12 UTC.

### Corrections when implementing the selected screens

- Remove invented accuracy percentages, “100% target met,” “verified” educational guarantees, print certifications and unsupported offline claims.
- Replace autosave, “Save session draft” and saved-class indicators with the session-only notice. Only downloaded approved PDFs persist for the teacher.
- Use neutral Group A/B/C labels, with only A active in the MVP; remove ability tiers, diagnostic suggestions and pupil counts/profiles implied by decorative examples.
- Remove PNG and other upload promises from the MVP. The later approved photo format is one JPG/JPEG printed page; scanned PDFs remain excluded.
- Use A4 consistently; remove Letter, PDF/X certification, invented DPI/file sizes and ZIP/batch-export promises.
- Replace “atelier,” “folio,” “target validity” and similar prototype jargon with worksheet, review, concern and download. Retain the visual composition without carrying over unsupported product claims.
- Derive loading, approval, question counts and errors from actual state. Development fixtures must be labeled; the deployed MVP requires live OpenRouter behavior and real PDF output.

## 1. How to use this file

Use the selected [screen index](stitch/README.md), this brief and the PRD as implementation context. Reuse the approved direction rather than generating a new look. The prompts in Sections 9–10 are retained for later full-prototype refinement; apply the MVP screen scope above whenever working on the first release.

The static Stitch exports contain simulated interactions and are visual references. The implementation must use live AI and actual PDF output to pass MVP acceptance. Screens and clickable links do not establish that the processing works. Build in the team's usual coding environment and track work through the linked GitHub Project and Issues.

Use fictional worksheets and group needs throughout. The main test is whether a teacher understands the complete journey and can review usable adaptations efficiently. Ten minutes for an approved set of up to three worksheets is a test target, not a promise to place in the interface. Victoria reported that the intended first teacher wants the option to upload a JPG/photo of a simple printed worksheet; this is a prototype input need, not evidence that photo extraction works reliably in classrooms.

## 2. Product and experience

CHLD Adapt helps a primary-school teacher adapt an existing worksheet for learners with different observable needs. The MVP handles one group; up to three groups remain planned. The learning goal stays the same; the teacher reviews, corrects and approves each version, then downloads it for printing.

The initial context is Philippine public and private schools. The first intended teacher teaches Grade 2 with about 30 pupils. Teachers use the tool while preparing a lesson; children use the printed worksheets.

Create a calm, practical workspace that feels like preparing teaching materials. Give the current task, source worksheet and next action most of the space. Keep explanations short and available at the point of use. Use ordinary teaching language: “worksheet,” “group,” “what changed” and “review.”

The prototype starts directly with worksheet preparation. Its scope excludes accounts, pupil records, diagnostic labels, dashboards, saved libraries, chat assistants, school integrations, custom camera capture, multi-image assembly, scanned-PDF recognition, handwriting recognition and creating worksheets from a goal alone. Use an English interface; preserve the worksheet's original language without a translation control or claims of untested language support.

## 3. Design system

### Visual theme

Warm paper, dark readable text and a restrained crimson accent connect this prototype to the class deck. The workspace should feel composed and welcoming, with generous spacing around decisions and compact supporting information. Avoid decorative illustrations and large promotional sections that distract from preparing a worksheet.

### Colours and roles

| Role | Colour | Use |
| --- | --- | --- |
| Page background | Warm paper `#FFF8F0` | Approved export's background behind the workspace |
| Surface | White `#FFFFFF` | Inputs, worksheet pages and review panels |
| Primary text | Warm charcoal `#1D1B16` | Headings, labels and body text |
| Supporting text | Warm slate `#594141` | Helper text and secondary details |
| Primary action | Deep crimson `#81001D` | Main button and active controls; white button text |
| Accent | Crimson `#A51C30` | Progress accents and secondary crimson emphasis |
| Primary hover | Dark crimson `#690017` | Darker hover proposal; check contrast in implementation |
| Control boundary | Stone `#85817A` | Visible input borders and unselected checkboxes |
| Divider | Pale stone `#DDD8CF` | Decorative separators, not the sole boundary of an input |
| Approved | Forest `#17603B` on `#EDF7F0` | “Approved” text and check icon |
| Needs attention | Amber brown `#7A4300` on `#FFF4DE` | Review concerns, with a warning icon and explanation |
| Failed | Dark red `#9B1C20` on `#FFF0F0` | Recoverable errors with an explicit action |
| Keyboard focus | Deep blue `#1D4ED8` | A clearly visible focus ring separated from the control |

The palette above adopts the actual exported screen colors. The archived style guide has older prose colors alongside newer tokens; use this table when they differ. Retain the accessible status/focus treatments and verify contrast, including hover, focus and disabled states. Status always includes text and an icon; colour alone must not carry meaning.

### Typography, shape and spacing

- Use **Playfair Display** for the product name and editorial headings, following the selected screens. Use **Inter**, with a familiar sans-serif fallback, for controls, supporting headings and body text. Keep the pupil PDF in a fixed readable font for the MVP; optional handwriting-style type is follow-up work, confined to printable worksheets.
- Use body text around 16 px, labels at least 14 px and comfortable line spacing. Main headings can use the approved 40 px desktop / 30 px narrow-screen scale; supporting headings remain smaller.
- Buttons and inputs have gently rounded corners, around 8 px; major panels around 12 px. Prefer subtle borders to heavy shadows. Use a soft shadow only to distinguish the printable sheet from its surrounding workspace.
- Use a consistent spacing rhythm, with roughly 24 px between related sections and 32 px around major panels. Make controls easy to click or tap, approximately 44 px high.
- Start with a laptop-sized web layout, around 1280 px wide. Use a centred workspace; allow the comparison screen more width. On narrower screens, stack panels and preserve clear reading order. Original/adapted tabs may replace a side-by-side comparison.
- Use labelled fields, visible keyboard focus and readable error text. Checklist explanations must open by keyboard or tap, rather than depending on hover. Keep action bars from covering the last lines of a worksheet. For student worksheets, support larger text, one sentence per line where useful, and extra line breaks that preserve the original wording and required reasoning.

### Reusable components

Use one quiet header with “CHLD Adapt” and a small “Class prototype” label. Below it, show the five-step journey: **Worksheet → Groups → Plan → Review → Download**. A compact learning-goal strip stays available after intake. It should show the goal as written and a deliberate “Edit lesson” action.

Use a filled crimson button for the main next action, an outlined button for secondary actions and text links for navigation. Keep group selectors, checklist rows, status badges, warning panels and worksheet previews consistent across screens.

## 4. Broader screen specifications

The approved MVP table above limits the first release. The detailed upload and multi-group states below remain the broader design reference; do not expose them as working features during the one-hour build.

### Screen 1 — Your worksheet

For the one-hour MVP, show only Paste text and its editable source review. The upload controls and recovery states below are follow-up specifications.

**Purpose:** supply an existing worksheet and make sure the tool has read it correctly.

- Heading: **“Adapt a worksheet for your class.”** Supporting line: “Keep the learning goal. Adjust how learners access the work.”
- Fields: **“Learning goal,” “Grade,” “Approximate age range.”** The goal is written by the teacher.
- Source choices: **“Paste text”** and **“Upload a file.”** Accept `.docx`, PDFs with selectable text and one `.jpg`/`.jpeg` image of a printed worksheet page. Helper: “For a photo, upload one clear printed page with all questions visible.” Blurry, cropped or otherwise unreadable photos need correction or a replacement source; do not promise reliable extraction before it has been tested.
- After upload, show **“Check the extracted worksheet”** with editable extracted content. For a JPG/JPEG, show the source image beside the editable extracted content so the teacher can compare them. Ask the teacher to confirm the extraction is complete and accurate before proceeding. Keep pasted text editable too.
- Primary action: **“Continue to groups.”** Require a goal, grade/age information, usable source material and, for an upload, confirmation of the extracted content. Explain missing fields beside them.
- For an unreadable file or unclear photo: “We couldn't read this worksheet reliably. Try a clearer single-page JPG/JPEG, paste the text below, or choose a Word document or PDF with selectable text.” Preserve the information already entered and offer retry upload or paste-text fallback.
- If the source worksheet contains an essential diagram, table or visual that extraction cannot represent faithfully, require a readable replacement source before continuing. A text description or confirmation must not stand in for a diagram needed to answer the questions.
- Brief session notice: “Work stays available during this session. Download approved worksheets before closing.”

Create both an empty state and a populated source-review state. Use the reading example in Section 7 for the populated version.

### Screen 2 — What does each group need?

**Purpose:** describe difficulties without requiring the teacher to write an AI prompt.

- Start with **Group A**. Offer **“Add another group”** up to three groups; show the limit clearly. Use Group A/B/C throughout, without pupil names or diagnostic categories.
- Select a group to see its checklist. Keep other groups' selections when switching, with a compact selection count in each group tab.
- Ask **“What makes this worksheet difficult for this group?”** Helper: “Choose one to three difficulties to focus on.”
- Display all eleven exact labels in Section 6 under their three headings. Use checkboxes and an accessible “More information” control for each full explanation. Keep the headings visible so the list is easy to scan.
- When three are selected, explain that a teacher can deselect one to choose another. Do not silently replace a choice.
- Optional field: **“Anything else we should know about what is difficult?”** Helper: “Describe the worksheet difficulty. Leave out pupil names and personal histories.”
- Primary action: **“Review adaptation plan.”** Require at least one selected difficulty for each included group. Let the teacher remove an unused group.

Create a one-group state and a three-group state. The learning goal stays visible above the group workspace.

### Screen 3 — Review the plan

**Purpose:** show what will change before generating worksheets.

- Show one panel per group, containing its selected difficulties and a short proposed approach. Link each panel to **“Change needs.”** When a source image includes essential diagrams or layout information, explain how the plan preserves that content. If required source content is still missing, return to the source check before generation; an added line drawing must not invent missing information.
- Example: “Split instructions into steps, keep all questions, add visible progress checkboxes, and place two questions on each page.”
- Reinforce the shared learning goal and state that there will be one worksheet per group. Never suggest a separate version for every combination of checklist selections.
- Primary action: **“Create worksheets.”**
- In the progress state, each group has its own status: **“Preparing,” “Ready to review,”** or **“Could not create.”** Avoid invented accuracy scores, exact completion percentages or guaranteed waiting times.
- If one group fails, keep completed worksheets available. Provide **“Retry Group B”** for the failed group without resetting the others or losing inputs. Empty or unusable output is a failure, not a ready worksheet.
- Action when material is available: **“Review worksheets.”**

Create a plan state and a partial-failure state with Group A ready, Group B failed and Group C ready.

### Screen 4 — Review and approve

**Purpose:** let the teacher inspect the exact material that will be printed.

- Keep the learning goal, group selector and per-group status visible.
- On desktop, show **“Original worksheet”** and **“Adapted worksheet”** side by side. The original is read-only here; the adapted version is editable. On narrow screens, use clearly labelled tabs.
- Show **“What changed”** near the adapted worksheet, with a brief list linked to the selected difficulties. Make the group and selected needs available without opening another page.
- Actions: **“Edit worksheet,” “Regenerate this group,” “Discard this version.”** Changes apply to the selected group. Discarding leaves that group without a downloadable version and allows regeneration.
- Present a concern where it can be assessed: **“This change may affect the learning goal.”** Explain the particular issue, such as a reference box revealing an answer or an alternate response format changing the assessed skill. Offer correction or an explicit **“I confirm the learning goal is unchanged”** choice. This confirmation resolves that concern; approval of the whole version remains a separate action. If an essential source diagram or question is missing, return to source correction instead: confirmation cannot waive source completeness.
- Primary action: **“Approve this version.”** Supporting text: “Check the questions, learning goal, answer space and any concerns before approving.” Unresolved concerns block approval.
- After approval, show **“Approved”** with **“Download PDF”** enabled for that exact version. Offer **“View downloads”** to see the set, including groups still requiring review.
- If the teacher edits or regenerates an approved worksheet, immediately change its status to **“Needs review”** and explain: “This worksheet has changed. Review and approve it again before downloading.”

Create unapproved, flagged, approved and edited-after-approval states. Avoid “AI verified,” “safe for all learners” or other claims that substitute for the teacher's judgment.

### Screen 5 — Download your worksheets

**Purpose:** print approved variants and see what still needs attention.

- Show one row or panel per group with its current status, an A4 preview and **“Download PDF”** for approved versions only. Each group has a separate PDF.
- Unapproved groups show **“Review Group B”**; failed groups show a retry action. Do not enable an unapproved download just because other groups are approved.
- Include **“Back to review.”** Re-downloading a current approved version is supported during the session.
- Show a clear reminder: “Download your approved worksheets before closing. You can reprint the PDFs later; this session won't be saved.”
- Keep group needs, teacher review notes and warning explanations in the teacher interface. The pupil worksheet contains the teaching material, clear instructions and suitable response space, without diagnostic labels or internal review controls.

## 5. State rules the prototype must demonstrate

| Event | Visible result | Download rule |
| --- | --- | --- |
| A worksheet is generated | Draft / Needs review | Disabled for that version |
| A concern remains unresolved | Specific concern beside the affected material | Disabled; correction or explicit goal-preservation confirmation is required before approval |
| Teacher approves the current version | Approved, with a check icon | Enabled for that exact version |
| Teacher edits or regenerates an approved variant | That group's status becomes Needs review | Disabled until fresh approval; other unchanged groups retain approval |
| Teacher changes source material or learning goal | All groups visibly need fresh review against the revised lesson | All previous approvals removed; no stale downloads |
| A group's needs change after generation | Show that the existing version must be refreshed and reviewed for those needs | For this prototype, clear that group's approval and require a refreshed version; this is a conservative design proposal |
| One group's generation fails | Failed group offers retry; other groups remain intact | Previously approved, unchanged variants remain downloadable |
| Photo extraction is unclear or drops essential content | Keep lesson fields, show the source image beside editable extraction, and offer correction, retry upload or text paste; missing essential diagram content requires a readable replacement source | Continue is blocked until the source is complete and confirmed; worksheet download still requires approval of the resulting variant |
| Generation returns blank or unusable material | A recoverable failure message | Never show as approved or ready to download |
| PDF generation fails | Keep the approved worksheet and offer “Retry download” | Do not show a success message or substitute an older PDF |

Keep a teacher's inputs and current-session work through recoverable errors. Do not use success styling for an unfinished action. Changes to the goal do not create different goals for different groups: the teacher is revising the shared lesson and must review the resulting variants again.

## 6. Exact checklist content

Use the following labels and explanations, supplied by Victoria. The labels are visible; explanations can expand beneath them. Keep all options available even though the teacher selects only one to three per group.

### Reading and concepts

- **Reading the words** — needs support decoding unfamiliar words or reading longer passages.
- **Understanding the language** — needs simpler vocabulary, shorter sentences, or explanations of unfamiliar terms.
- **Understanding abstract ideas** — needs concrete examples, pictures, or familiar situations.
- **Using prerequisite skills or knowledge** — needs a brief review or scaffold for skills the worksheet assumes.

### Instructions and organization

- **Following multistep directions** — needs instructions broken into clear steps, with an example.
- **Managing the amount of work** — needs fewer items visible at once or work divided into smaller sections over more pages.
- **Keeping track of information** — needs reminders, reference boxes, or key information placed beside the question.
- **Getting started and organizing answers** — needs a worked example, sentence starters, or a planning guide.

### Responding and using the page

- **Writing or recording answers** — needs more writing space, less copying, or another way to respond.
- **Seeing and navigating the page** — needs larger text, clearer spacing, stronger contrast, or less visual clutter.
- **Staying engaged with the task** — Needs shorter sections, clear mini-goals, or familiar topics.

Optional field: **“Anything else we should know about what is difficult?”**

These are observations of difficulty, not guaranteed solutions. For example, simpler language can change a vocabulary assessment, a worked example can reveal an assessed answer, and an alternate response format can change what is being assessed. Preserve questions and required reasoning; dividing work means using more sections or pages, not removing items. Engagement supports may include shorter sections, clear mini-goals, visible progress checkboxes and a teacher-directed break note such as “Finish these three items, then take a 5-minute break to stand and stretch.” Familiar topics and alternate response formats are allowed only when the original questions, required reasoning and learning goal are preserved, including any writing or drawing skill being assessed.

## 7. Fictional content for realistic prototypes

These examples are invented for screen design. They have not been validated with teachers or pupils. Keep a small prototype notice outside the printable worksheet and identify these examples as fictional in the demonstration.

### Reading example — A plant at school

**Grade:** 2. **Approximate age range:** 7–8.  
**Learning goal:** “Read a short passage and find explicitly stated information to answer who, where, when and what questions.”

**Original worksheet text:**

> Mina carried a small plant to school. She put it beside the window. Each morning, she gave the plant a little water. On Friday, Mina noticed a new leaf.
>
> Read the passage. Answer each question.
>
> 1. Who carried the plant to school?
> 2. Where did Mina put the plant?
> 3. When did she water the plant?
> 4. What did Mina notice on Friday?

| Group | Selected difficulties | Proposed adaptation to show |
| --- | --- | --- |
| Group A | Following multistep directions; Managing the amount of work | Separate instructions into steps. Put two questions on each page and repeat the original passage where needed. Retain all four questions. |
| Group B | Writing or recording answers; Seeing and navigating the page | Increase text size and spacing, put each sentence on its own line and provide generous writing lines. Preview a readable handwriting-style font if useful for this group. Keep passage and question wording unchanged. |
| Group C | Keeping track of information; Staying engaged with the task | Keep the complete passage close to each small question section, add visible progress checkboxes and use clear mini-goals such as “finish 2 questions.” Retain all questions and avoid highlighting the answer to each one. |

For the concern state, show a proposed reference box that would directly answer an assessed question. Explain the concern in the teacher panel and demonstrate removing the box before approval. Do not use that unresolved output as the approved example.

### Mathematics example — Adding without regrouping

**Grade:** 2. **Approximate age range:** 7–8.  
**Learning goal:** “Add a two-digit number and a one-digit number without regrouping, and show how you worked it out.”

**Original worksheet text:**

> Add each pair of numbers. Write the total and show how you worked it out.
>
> 1. 12 + 5 = ____
> 2. 23 + 4 = ____
> 3. 31 + 6 = ____
> 4. 42 + 5 = ____
> 5. 54 + 3 = ____
> 6. 61 + 8 = ____

Show a variant with two problems per section, larger response areas, separate instruction steps and optional progress checkboxes. As a second reviewed variation, a blank tens-and-ones frame or simple non-distracting line drawing can demonstrate printable visual support. Keep all six problems and the requirement to show working. Any instructional example must use different numbers and still be reviewed for whether it changes the intended assessment. If an alternate response format is offered, it must preserve the requirement to add and show the method.

## 8. Printable worksheet design

For the MVP, implement the fixed readable A4 template, answer space and exact PDF review/download behavior. Optional font, drawing and extended print controls below belong to follow-up work.

Use white A4 pages with black or very dark text and practical printer margins, starting around 15–18 mm. Use a familiar sans-serif font such as Arial, starting around 14 pt and increasing when a group's needs call for it. A readable handwriting-style font may be offered for the student-facing worksheet when appropriate. Use clear headings, larger text where needed, individual sentences or extra line breaks where helpful, and generous line spacing; preserve wording, questions and required reasoning. Validate actual printed pages rather than assuming a screen preview is sufficient.

Keep each question with its answer space and any relevant visual. Break between questions or sections when necessary. Preserve every required question and the space needed to show working. A longer worksheet is acceptable when it improves readability. Use simple non-distracting line drawings, line diagrams, blank organisers or visual cues where relevant, with legible labels and no dependence on colour. The teacher must review any drawing or visual support. Do not use custom AI illustrations, decorative backgrounds or pre-filled assessed answers.

The preview and eventual downloaded PDF must contain the same approved material. Application navigation, teacher warnings and adaptation explanations stay outside the printed page.

## 9. Retained full-prototype prompt for Stitch

```text
Design the first screen of CHLD Adapt, a teacher-facing web prototype for adapting existing primary-school worksheets. Follow the attached PRD for scope and DESIGN.md for appearance and behaviour. Begin with Screen 1, “Your worksheet,” including a populated extraction-review state using the fictional Grade 2 reading example.

The teacher supplies the learning goal, grade, age range and an existing worksheet as pasted text, DOCX, a PDF with selectable text, or one JPG/JPEG image of a printed worksheet page. Show the source image beside editable extracted content for photo uploads, and require correction and confirmation before “Continue to groups.” Existing material is required. Include an empty state and an unreadable-upload/photo state with retry upload and text-paste recovery actions, preserving lesson inputs. Missing essential diagram content requires a readable replacement source; do not allow confirmation to bypass it. Do not show custom camera capture, multi-image assembly, scanned-PDF support or handwriting recognition.

DESIGN SYSTEM (REQUIRED): Follow the approved Stitch references: desktop-first web workspace, calm and practical. Warm paper #FFF8F0 background, white #FFFFFF surfaces, warm charcoal #1D1B16 text, warm slate #594141 supporting text, deep crimson #81001D primary buttons with white text and #A51C30 accents. Visible control borders #85817A. Playfair Display for the product name and editorial headings; Inter for body text and controls. Body text around 16 px, gently rounded inputs, restrained shadows, generous whitespace and clear keyboard focus. Small “Class prototype” label in the header. For the one-hour MVP, apply the screen-scope table at the start of DESIGN.md: pasted text and one group only.

PAGE STRUCTURE: Quiet CHLD Adapt header; five-step progress row (Worksheet, Groups, Plan, Review, Download); page heading; lesson fields; Paste text / Upload a file choices; source-content review with source image comparison when relevant; primary Continue action; concise notice that the session is not saved after closing. Keep the task central. Use accessible labels, useful inline errors and a layout that stacks cleanly on narrow screens.

The complete journey will create up to three group worksheets with a shared learning goal, teacher review, separate approval and printable PDFs. Reserve a consistent learning-goal strip and group status components for later screens. Keep this screen focused on intake. Do not add accounts, learner profiles, diagnosis, chat, dashboards, saved libraries or worksheet creation from a goal alone. The content is fictional and the processing may be simulated; do not imply AI or file processing has been implemented merely by designing these screens.
```

## 10. Full-prototype follow-up prompts and review

Use each prompt as a separate request after choosing the first screen's visual direction. Supply the relevant sections of this file if Stitch does not have the full brief in context.

1. **Groups:** “Using the first screen's exact design system, create Screen 2 from DESIGN.md. Include one-group and three-group states, all eleven checklist labels under the three specified headings, accessible full explanations, one-to-three selections per group and the exact optional field. Keep the shared learning goal visible. Show what happens at the three-selection limit. Use the revised engagement wording: ‘Needs shorter sections, clear mini-goals, or familiar topics.’”
2. **Plan and progress:** “Create Screen 3 using the same components. Show one proposed adaptation per group, a Change needs action and Create worksheets. Include engagement supports such as shorter sections, clear mini-goals, visible progress checkboxes and teacher-directed break notes where appropriate. Add a partial-failure state: Groups A and C ready to review, Group B failed with its own retry. Preserve all inputs and completed variants. If the source came from a photo, show how essential diagrams or layout details are preserved. Return to source correction before generation if essential content is missing.”
3. **Review and approval:** “Create Screen 4 with original and editable adapted worksheets side by side, the shared goal, group status, selected needs and What changed. Show an unresolved learning-goal concern, correction or explicit confirmation, separate approval, and an approved version becoming Needs review after editing. Include a concern where an alternate response format could change the assessed skill. Missing essential source content requires correction rather than confirmation. Disable PDF download whenever the current version is unapproved. Include a narrow-screen comparison using tabs.”
4. **Downloads and print:** “Create Screen 5 and the A4 worksheet preview using Section 8. Show separate group PDFs, an approved group's enabled download, another group's Review action and a retry-download error state. Preserve all questions and response space; teacher controls must remain outside the printable page. Include larger text, sentence breaks, optional readable handwriting-style worksheet font and simple teacher-reviewed line drawings where useful. Include the session-only reminder.”
5. **Mathematics and connections:** “Use the fictional mathematics example to create a second review/print example without changing the design system. Where supported, connect the screens into the five-step journey with back navigation and the specified approval/failure states. Clearly identify any interactions that are only simulated.”

Before accepting the prototype, walk through reading and mathematics examples and check:

- The teacher can understand the next action without facilitator explanation.
- All eleven checklist labels and full explanations are present; the optional field uses the agreed wording.
- There are at most three neutral groups and one variant per group, with the same goal throughout.
- Source review, correction, source-image comparison for JPG/JPEG, independent retry and approval are visible and usable.
- A readable JPG/JPEG page retains all questions, numbers, instructions and required diagrams after teacher correction and confirmation. Exercise an incorrectly extracted number or question and confirm it can be corrected before continuing.
- Blurry or cropped photos show actionable recovery and preserve lesson inputs. Missing essential diagram content blocks continuation until a readable replacement source is supplied; a confirmation click cannot bypass this.
- A changed worksheet cannot keep a stale approval or download an older approved version.
- A concern is specific and requires a teacher decision; AI reassurance never replaces review.
- The original questions, required reasoning, essential diagrams, writing space and readable print layout survive the adaptation. Larger text, line breaks, optional handwriting-style worksheet font and simple line drawings help access without changing the assessment.
- Mini-goals, completion checkboxes and teacher-directed break instructions retain all required items. Test an alternate response format both when the goal is content and when writing or drawing is itself assessed; the latter must be corrected or rejected if it changes the skill.
- Keyboard focus, text size, contrast, narrow-screen layout and error recovery are readable.
- The group records what was simulated and what was actually tested. A polished mock-up, including a simulated photo-extraction flow, is not evidence of classroom effectiveness, reliable OCR or of meeting the ten-minute target.

Record feedback and decisions alongside the PRD before implementing new behaviour. The approved one-hour scope and linked milestones govern the first release; the original two-session scope remains subsequent work.

Prompting reference: [Google Stitch prompting guide](https://stitch.withgoogle.com/docs/learn/prompting/). This brief supplies the screen content and design direction; it does not depend on a particular Stitch integration or model.

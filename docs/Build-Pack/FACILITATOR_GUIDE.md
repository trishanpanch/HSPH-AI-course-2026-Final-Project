# Trishan: CHLD Adapt

Course: [Building AI Solutions to Transform Health Care](https://hsph.harvard.edu/ala/beyond-vibe-coding-building-ai-solutions-to-transform-health-care/)  
Original idea: **CHLD Teacher AI Studio — Victoria Nolasco**

## The idea and your role

Help a teacher adapt a worksheet while preserving what the learner is meant to practise. The teacher reviews and edits the result before approving it for printing. This project fits your generalist approach and work in education: keep the user need clear, turn it into a useful workflow, and help the group judge whether the output actually solves the problem.

Read the [original build pack](source-pack/README.md) for context. Focus the class on CHLD Adapt, the worksheet adaptation part of the wider idea. Use your usual coding environment and model, with an implementation approach that suits the group.

## What to build

The teacher supplies a fictional worksheet, states its learning goal and chooses an adjustment, such as clearer instructions, smaller steps or more spacing. The tool produces an editable version. The teacher compares it with the original, approves it and prints or exports the reviewed result.

Keep the original questions and learning task intact. Rewriting can accidentally change what is being assessed, so a teacher must make the final judgment. Editing or generating a new version should require a fresh approval before printing.

Use fictional teaching materials. Keep the prototype focused on worksheet adaptation; leave out student profiles, school-system connections and the wider teacher-assistant feature set. If reliable rewriting proves difficult, narrow the demo to useful formatting changes and explain that choice.

## Session 1: write the PRD and organize the sprint

Start with one teacher and one worksheet. Ask what makes the current worksheet difficult to use, which adjustment would help, and what must stay the same. Write down the learning goal before asking a model to change anything.

Use the [PRD worksheet](templates/PRD_WORKSHEET.md) to describe the journey from input to adaptation, review, approval and printed output. Define the essential checks, including what happens when the worksheet is missing or the adaptation fails. Sketch the main screen and record the group's chosen tools and the role of the model, if used.

Create a GitHub repository for code and documents and a GitHub Project for the short sprints. Turn the essential features into Issues, each with an owner and observable completion checks. Put the first complete teacher journey in Build 1; reserve Build 2 for refinement, test cases and the presentation.

**Leave with:** a short PRD, design sketch, fictional worksheet examples, a repository, Project and prioritized Issues.

## Session 2: build the teacher journey

Work through the Build 1 Issues using your chosen environment and model. Begin with one worksheet and one adjustment. Make the entire path work: enter the material and goal, produce an adaptation, review and edit it, approve it, then print the result.

Ask a learner to act as the teacher while someone else observes. Can they see what changed? Can they correct it? Does the final output match the approved version? Use what they find to guide the next Issue.

Keep original input available when something fails. If the product calls a model, keep its credentials out of the browser and repository. Do not present a model's own reassurance as proof that it preserved the learning goal.

Save working changes to GitHub and record each feature's checks in its Issue. Mark it Done when those checks pass and keep the board current.

**Leave with:** one complete teacher workflow and a focused Build 2 backlog.

## Session 3: test usefulness and prepare the presentation

Finish the agreed workflow and try fresh fictional worksheets. Compare the original and adapted versions with the stated goal in view. Check that the instructions are clearer, the questions still test the intended skill, the output is editable and the printed version matches what the teacher approved.

Include a case where changing wording could change the task. Show why teacher review matters. Check that missing input or a failed model response leaves the original work available, and that editing an approved version requires approval again. Record results in the [test log](templates/TEST_AND_EVIDENCE_LOG.md) and fix the problems that affect the demonstration.

Prepare the [pitch and demo](templates/PITCH_AND_DEMO_WORKSHEET.md). Begin with the teacher's problem, show an adaptation and a human correction, then demonstrate approval and the final worksheet. Explain what the tests support, what remains uncertain and what feedback you would seek from teachers next.

**Leave with:** a useful demonstration, short pitch deck and handover with open Issues visible.

## Suggested feature Issues

Use the [Issue template](templates/FEATURE_ISSUE_TEMPLATE.md) and adapt these to the PRD.

| Feature | Done when |
|---|---|
| Capture worksheet and learning goal | Both inputs are clear and missing information is handled. |
| Create one useful adaptation | The agreed adjustment works on a fictional example and the original remains available. |
| Review and edit the result | A teacher can compare versions and correct the adaptation. |
| Approve and print | Output matches the approved version, and later edits require fresh approval. |
| Handle failures and restart | Failed adaptation preserves the input and the demonstration can restart cleanly. |

## Handover

Share the repository, GitHub Project, PRD, run/reset instructions, example worksheets, test notes, deck and demo. Keep unfinished work as Issues. Credit Victoria as the original idea author and the group for its class prototype.

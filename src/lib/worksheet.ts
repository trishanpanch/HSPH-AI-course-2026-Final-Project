import { z } from "zod";

export const needs = [
  {
    section: "Reading and concepts",
    label: "Reading the words",
    description:
      "Needs support decoding unfamiliar words or reading longer passages.",
  },
  {
    section: "Reading and concepts",
    label: "Understanding the language",
    description:
      "Needs simpler vocabulary, shorter sentences, or explanations of unfamiliar terms.",
  },
  {
    section: "Reading and concepts",
    label: "Understanding abstract ideas",
    description: "Needs concrete examples, pictures, or familiar situations.",
  },
  {
    section: "Reading and concepts",
    label: "Using prerequisite skills or knowledge",
    description:
      "Needs a brief review or scaffold for skills the worksheet assumes.",
  },
  {
    section: "Instructions and organization",
    label: "Following multistep directions",
    description: "Needs instructions broken into clear steps, with an example.",
  },
  {
    section: "Instructions and organization",
    label: "Managing the amount of work",
    description:
      "Needs fewer items visible at once or work divided into smaller sections over more pages.",
  },
  {
    section: "Instructions and organization",
    label: "Keeping track of information",
    description:
      "Needs reminders, reference boxes, or key information placed beside the question.",
  },
  {
    section: "Instructions and organization",
    label: "Getting started and organizing answers",
    description:
      "Needs a worked example, sentence starters, or a planning guide.",
  },
  {
    section: "Responding and using the page",
    label: "Writing or recording answers",
    description:
      "Needs more writing space, less copying, or another way to respond.",
  },
  {
    section: "Responding and using the page",
    label: "Seeing and navigating the page",
    description:
      "Needs larger text, clearer spacing, stronger contrast, or less visual clutter.",
  },
  {
    section: "Responding and using the page",
    label: "Staying engaged with the task",
    description:
      "Needs shorter sections, clear mini-goals, or familiar topics.",
  },
] as const;

const text = (max: number) => z.string().trim().min(1).max(max);
export const lessonSchema = z
  .object({
    source: text(6000),
    goal: text(600),
    grade: text(50),
    age: text(50),
    needs: z
      .array(z.enum(needs.map((n) => n.label) as [string, ...string[]]))
      .min(1)
      .max(3)
      .refine((a) => new Set(a).size === a.length),
    note: z.string().max(1000),
    confirmed: z.literal(true),
  })
  .strict();
export type Lesson = z.infer<typeof lessonSchema>;
export type LessonDraft = Omit<Lesson, "confirmed"> & { confirmed: boolean };
export const planSchema = z
  .object({
    summary: text(1200),
    strategies: z.array(text(400)).min(1).max(6),
    cautions: z.array(text(600)).max(6),
  })
  .strict();
export type Plan = z.infer<typeof planSchema>;
export const adaptationSchema = z
  .object({
    title: text(140),
    instructions: text(1200),
    passage: z.string().max(7000),
    questions: z
      .array(z.object({ id: text(20), text: text(1800) }).strict())
      .min(1)
      .max(12),
    changes: z.array(text(400)).min(1).max(8),
    concerns: z
      .array(z.object({ id: text(40), message: text(600) }).strict())
      .max(14),
  })
  .strict();
export type Adaptation = z.infer<typeof adaptationSchema>;
export type Source = {
  context: string;
  questions: { id: string; text: string }[];
};

export function parseSource(source: string): Source {
  const questions: Source["questions"] = [];
  const context: string[] = [];
  for (const line of source.replace(/\r/g, "").split("\n")) {
    const match = line.match(
      /^\s*(?:Q(\d{1,2})\s*[:.)-]?|(\d{1,2})[.)])\s+(.+)$/i,
    );
    if (match)
      questions.push({
        id: `Q${Number(match[1] || match[2])}`,
        text: match[3].trim(),
      });
    else if (questions.length)
      questions[questions.length - 1].text += "\n" + line;
    else context.push(line);
  }
  if (!questions.length)
    throw new Error("Number each question on a new line: 1. …, 2. …");
  if (questions.length > 12)
    throw new Error(
      "Use a short worksheet with up to 12 questions for this demo.",
    );
  if (new Set(questions.map((q) => q.id)).size !== questions.length)
    throw new Error("Each question needs a different number.");
  return {
    context: context.join("\n").trim(),
    questions: questions.map((q) => ({ ...q, text: q.text.trim() })),
  };
}
export function validateAdaptation(value: unknown, source: Source): Adaptation {
  const draft = adaptationSchema.parse(value);
  const expected = source.questions.map((q) => q.id);
  if (
    draft.questions.length !== expected.length ||
    draft.questions.some((q, i) => q.id !== expected[i])
  ) {
    throw new Error(
      "The AI response changed or omitted question references. Please try again.",
    );
  }
  const numbers = (text: string) =>
    (text.match(/[-+]?\d+(?:[.,]\d+)?/g) || []).sort();
  if (
    draft.questions.some(
      (q, i) =>
        JSON.stringify(numbers(q.text)) !==
        JSON.stringify(numbers(source.questions[i].text)),
    )
  ) {
    throw new Error(
      "The AI changed numerical values in a question. Your source is safe; please regenerate the draft.",
    );
  }
  if (new Set(draft.concerns.map((c) => c.id)).size !== draft.concerns.length)
    throw new Error(
      "The AI returned duplicate concern references. Please try again.",
    );
  if (source.context && !draft.passage.trim())
    throw new Error(
      "The AI omitted the source passage or instructions. Please try again.",
    );
  return draft;
}
export function worksheetFingerprint(draft: Adaptation): string {
  return JSON.stringify({
    title: draft.title,
    instructions: draft.instructions,
    passage: draft.passage,
    questions: draft.questions,
  });
}
export function canApprove(
  draft: Adaptation | null,
  resolved: string[],
  reviewed: boolean,
  pdfFingerprint: string | null,
): boolean {
  return (
    !!draft &&
    reviewed &&
    draft.concerns.every((c) => resolved.includes(c.id)) &&
    pdfFingerprint === worksheetFingerprint(draft)
  );
}
export const examples = {
  reading: {
    goal: "Read a short passage and find explicitly stated information to answer who, where, when and what questions.",
    source:
      "A plant at school\n\nMina carried a small plant to school. She put it beside the window. Each morning, she gave the plant a little water. On Friday, Mina noticed a new leaf.\n\nRead the passage. Answer each question.\n1. Who carried the plant to school?\n2. Where did Mina put the plant?\n3. When did she water the plant?\n4. What did Mina notice on Friday?",
  },
  maths: {
    goal: "Add and subtract single-digit numbers within 20, choosing the operation from a short word problem.",
    source:
      "Apples and pencils\n\nRead each problem. Show how you worked out your answer.\n1. Mia has 3 apples. She receives 2 more apples. How many apples does Mia have now?\n2. Ben has 9 pencils. He gives 4 pencils to a friend. How many pencils does Ben have left?\n3. There are 6 birds in a tree. Then 3 more birds arrive. How many birds are there altogether?",
  },
};

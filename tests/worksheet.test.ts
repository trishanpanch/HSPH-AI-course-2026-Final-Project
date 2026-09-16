import assert from "node:assert/strict";
import { test } from "node:test";
import {
  canApprove,
  parseSource,
  validateAdaptation,
  worksheetFingerprint,
  type Adaptation,
} from "../src/lib/worksheet";

test("parseSource preserves numbered references and rejects duplicate numbers", () => {
  const parsed = parseSource(
    "Warm up\n\n1. First question?\n2) Second question?\nQ3: Third question?",
  );

  assert.deepEqual(
    parsed.questions.map((question) => question.id),
    ["Q1", "Q2", "Q3"],
  );
  assert.equal(parsed.context, "Warm up");
  assert.throws(
    () => parseSource("1. First question?\nQ1: Duplicate question?"),
    /different number/,
  );
});

test("parseSource rejects more than twelve questions", () => {
  const source = Array.from(
    { length: 13 },
    (_, index) => `${index + 1}. Question ${index + 1}?`,
  ).join("\n");

  assert.throws(() => parseSource(source), /up to 12 questions/);
});

test("validateAdaptation rejects omitted or reordered question references", () => {
  const source = parseSource("Read this first.\n1. One?\n2. Two?");
  const valid = {
    title: "Adapted worksheet",
    instructions: "Answer each question.",
    passage: "Read this first.",
    questions: [
      { id: "Q1", text: "One?" },
      { id: "Q2", text: "Two?" },
    ],
    changes: ["Added clearer instructions."],
    concerns: [],
  };

  assert.throws(
    () =>
      validateAdaptation(
        { ...valid, questions: [{ id: "Q1", text: "One?" }] },
        source,
      ),
    /changed or omitted question references/,
  );
  assert.throws(
    () =>
      validateAdaptation(
        { ...valid, questions: valid.questions.toReversed() },
        source,
      ),
    /changed or omitted question references/,
  );
});

test("canApprove requires all concerns resolved, review complete, and current PDF fingerprint", () => {
  const draft: Adaptation = {
    title: "Adapted worksheet",
    instructions: "Answer each question.",
    passage: "Passage",
    questions: [{ id: "Q1", text: "Question?" }],
    changes: ["Change."],
    concerns: [{ id: "C1", message: "Teacher should review this." }],
  };
  const currentPdf = worksheetFingerprint(draft);

  assert.equal(canApprove(draft, ["C1"], true, currentPdf), true);
  assert.equal(canApprove(draft, [], true, currentPdf), false);
  assert.equal(canApprove(draft, ["C1"], false, currentPdf), false);
  assert.equal(canApprove(draft, ["C1"], true, "stale-fingerprint"), false);
});

test("rejects the observed live arithmetic change from 3+2 to 13+5", () => {
  const source = parseSource(
    "Read each problem.\n1. Mia has 3 apples. She receives 2 more apples. How many apples does Mia have now?",
  );
  const draft = {
    title: "Apples",
    instructions: "Show your working.",
    passage: "Read each problem.",
    questions: [
      {
        id: "Q1",
        text: "Mia has 13 apples. She receives 5 more apples. How many apples does Mia have now?",
      },
    ],
    changes: ["Changed numbers."],
    concerns: [],
  };
  assert.throws(
    () => validateAdaptation(draft, source),
    /changed numerical values/,
  );
  assert.doesNotThrow(() =>
    validateAdaptation({ ...draft, questions: source.questions }, source),
  );
});

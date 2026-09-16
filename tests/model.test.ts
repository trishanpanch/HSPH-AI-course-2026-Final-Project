import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { modelRoute } from "../src/lib/model";

const originalUsername = process.env.CLASS_DEMO_USERNAME;
const originalPassword = process.env.CLASS_DEMO_PASSWORD;
const originalModelKey = process.env.OPENROUTER_API_KEY;
const originalModel = process.env.OPENROUTER_MODEL;
const originalFetch = globalThis.fetch;

afterEach(() => {
  if (originalUsername === undefined) delete process.env.CLASS_DEMO_USERNAME;
  else process.env.CLASS_DEMO_USERNAME = originalUsername;
  if (originalPassword === undefined) delete process.env.CLASS_DEMO_PASSWORD;
  else process.env.CLASS_DEMO_PASSWORD = originalPassword;
  if (originalModelKey === undefined) delete process.env.OPENROUTER_API_KEY;
  else process.env.OPENROUTER_API_KEY = originalModelKey;
  if (originalModel === undefined) delete process.env.OPENROUTER_MODEL;
  else process.env.OPENROUTER_MODEL = originalModel;
  globalThis.fetch = originalFetch;
});

function basic(username = "teacher", password = "secret"): string {
  return `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;
}

function configureAuth(): void {
  process.env.CLASS_DEMO_USERNAME = "teacher";
  process.env.CLASS_DEMO_PASSWORD = "secret";
  process.env.OPENROUTER_API_KEY = "fixed-fake-test-key";
  process.env.OPENROUTER_MODEL = "test/model";
}

function lesson() {
  return {
    source: "Short passage\n1. What happened?",
    goal: "Answer a literal comprehension question.",
    grade: "2",
    age: "7",
    needs: ["Reading the words"],
    note: "",
    confirmed: true,
  };
}

function request(body: unknown, headers: Record<string, string> = {}): Request {
  return new Request("https://class.example/api/model", {
    method: "POST",
    headers: {
      authorization: basic(),
      "content-type": "application/json",
      host: "class.example",
      origin: "https://class.example",
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

function mockFetchContent(content: string): void {
  globalThis.fetch = async () =>
    Response.json({
      model: "test/model",
      usage: { cost: 0 },
      choices: [{ finish_reason: "stop", message: { content } }],
    });
}

test("modelRoute rejects unauthenticated requests before fetching from the provider", async () => {
  configureAuth();
  let called = false;
  globalThis.fetch = async () => {
    called = true;
    throw new Error("fetch should not be called");
  };

  const response = await modelRoute(
    new Request("https://class.example/api/model", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        host: "class.example",
        origin: "https://class.example",
      },
      body: JSON.stringify({ lesson: lesson() }),
    }),
    "plan",
  );

  assert.equal(response.status, 401);
  assert.equal(called, false);
});

test("modelRoute blocks cross-site POST requests", async () => {
  configureAuth();
  let called = false;
  globalThis.fetch = async () => {
    called = true;
    throw new Error("fetch should not be called");
  };

  const response = await modelRoute(
    request({ lesson: lesson() }, { "sec-fetch-site": "cross-site" }),
    "plan",
  );

  assert.equal(response.status, 403);
  assert.equal(called, false);
});

test("modelRoute rejects malformed model responses", async () => {
  configureAuth();
  mockFetchContent(
    JSON.stringify({ summary: "", strategies: [], cautions: [] }),
  );

  const response = await modelRoute(request({ lesson: lesson() }), "plan");

  assert.equal(response.status, 422);
});

test("modelRoute accepts correctly shaped model responses", async () => {
  configureAuth();
  mockFetchContent(
    JSON.stringify({
      summary: "Use clearer directions.",
      strategies: ["Keep the question and add a short prompt."],
      cautions: [],
    }),
  );

  const response = await modelRoute(request({ lesson: lesson() }), "plan");
  const payload = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(payload.data, {
    summary: "Use clearer directions.",
    strategies: ["Keep the question and add a short prompt."],
    cautions: [],
  });
  assert.equal(payload.meta.model, "test/model");
});

import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { authenticate } from "../src/lib/auth";

const originalUsername = process.env.CLASS_DEMO_USERNAME;
const originalPassword = process.env.CLASS_DEMO_PASSWORD;

afterEach(() => {
  if (originalUsername === undefined) delete process.env.CLASS_DEMO_USERNAME;
  else process.env.CLASS_DEMO_USERNAME = originalUsername;
  if (originalPassword === undefined) delete process.env.CLASS_DEMO_PASSWORD;
  else process.env.CLASS_DEMO_PASSWORD = originalPassword;
});

function basic(username: string, password: string): string {
  return `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`;
}

test("authenticate reports missing configuration when no password is configured", () => {
  process.env.CLASS_DEMO_USERNAME = "teacher";
  delete process.env.CLASS_DEMO_PASSWORD;

  assert.equal(authenticate(basic("teacher", "secret")), "missing");
});

test("authenticate rejects wrong Basic Auth credentials", () => {
  process.env.CLASS_DEMO_USERNAME = "teacher";
  process.env.CLASS_DEMO_PASSWORD = "correct-password";

  assert.equal(
    authenticate(basic("teacher", "wrong-password")),
    "unauthorized",
  );
});

test("authenticate accepts correct Basic Auth credentials", () => {
  process.env.CLASS_DEMO_USERNAME = "teacher";
  process.env.CLASS_DEMO_PASSWORD = "correct-password";

  assert.equal(authenticate(basic("teacher", "correct-password")), "ok");
});

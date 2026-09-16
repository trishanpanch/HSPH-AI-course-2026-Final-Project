import { expect, test, type Page } from "@playwright/test";
import { mkdirSync, readFileSync } from "node:fs";
import path from "node:path";

const outputDir = path.join(process.cwd(), "output");
const source = [
  "Plants at school",
  "",
  "Mina carried a small plant to school. She put it beside the window.",
  "",
  "1. Who carried the plant to school?",
  "2. Where did Mina put the plant?",
].join("\n");

const planFixture = {
  summary:
    "Keep the same comprehension goal and make the page easier to follow.",
  strategies: ["Use shorter instructions and keep each question visible."],
  cautions: ["Check that vocabulary simplification does not change the skill."],
};

const adaptationFixture = {
  title: "Plants at school",
  instructions: "Read the passage. Answer each question in your own words.",
  passage:
    "Mina carried a small plant to school. She put it beside the window.",
  questions: [
    { id: "Q1", text: "Who carried the plant to school?" },
    { id: "Q2", text: "Where did Mina put the plant?" },
  ],
  changes: ["Separated the instructions from the questions."],
  concerns: [
    {
      id: "C1",
      message: "Confirm the wording still asks for the same information.",
    },
  ],
};

test.beforeEach(() => {
  mkdirSync(outputDir, { recursive: true });
});

async function mockModelRoutes(
  page: Page,
  options: { failPlan?: boolean; delayedPlan?: boolean } = {},
) {
  let releasePlan: (() => void) | undefined;
  const delayedPlan = new Promise<void>((resolve) => {
    releasePlan = resolve;
  });

  await page.route("**/api/plan", async (route) => {
    if (options.delayedPlan) await delayedPlan;
    if (options.failPlan) {
      await route.fulfill({
        status: 502,
        contentType: "application/json",
        body: JSON.stringify({ error: "Mock plan failure for retry testing." }),
      });
      return;
    }
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        data: planFixture,
        meta: { model: "mock-plan", latencyMs: 1, costUsd: 0 },
      }),
    });
  });

  await page.route("**/api/adapt", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        data: adaptationFixture,
        meta: { model: "mock-adapt", latencyMs: 1, costUsd: 0 },
      }),
    });
  });

  return { releasePlan: () => releasePlan?.() };
}

async function completeIntake(page: Page) {
  await page.goto("/");
  await page
    .getByLabel("Learning goal")
    .fill("Read a short passage and answer literal comprehension questions.");
  await page.getByLabel("Worksheet text").fill(source);
  await page.getByLabel(/I checked the source/).check();
  await page.getByRole("button", { name: /Continue to groups/ }).click();
  await page.getByLabel(/Reading the words/).check();
}

async function reachReview(page: Page) {
  await completeIntake(page);
  await page.getByRole("button", { name: /Review adaptation plan/ }).click();
  await expect(
    page.getByRole("heading", { name: "Proposed adaptations" }),
  ).toBeVisible();
  await page.getByRole("button", { name: /Create worksheet/ }).click();
  await expect(
    page.getByRole("heading", { name: "Your editable adaptation" }),
  ).toBeVisible();
}

async function prepareAndApprovePdf(page: Page) {
  await page.getByRole("button", { name: /Prepare PDF preview/ }).click();
  await expect(page.locator(".pdf-pages")).toBeVisible({ timeout: 20_000 });
  await expect(page.getByAltText("Worksheet PDF page 1")).toBeVisible();
  await page.getByLabel(/Confirm the wording still asks/).check();
  await page.getByLabel(/I reviewed this PDF/).check();
  await page.getByRole("button", { name: "Approve this PDF" }).click();
  await expect(
    page.getByRole("heading", { name: "Plants at school" }),
  ).toBeVisible();
}

test("generation failure preserves lesson state and supports retry", async ({
  page,
}) => {
  await mockModelRoutes(page, { failPlan: true });
  await completeIntake(page);

  await page.getByRole("button", { name: /Review adaptation plan/ }).click();

  await expect(page.locator(".alert.error")).toContainText(
    "Mock plan failure for retry testing.",
  );
  await expect(
    page.getByRole("heading", { name: "What does this group need?" }),
  ).toBeVisible();
  await expect(page.getByLabel(/Reading the words/)).toBeChecked();
  await page.getByRole("button", { name: /Back to worksheet/ }).click();
  await expect(page.getByLabel("Learning goal")).toHaveValue(
    "Read a short passage and answer literal comprehension questions.",
  );
  await page.getByRole("button", { name: /Continue to groups/ }).click();

  await page.unroute("**/api/plan");
  await mockModelRoutes(page);
  await page.getByRole("button", { name: /Review adaptation plan/ }).click();

  await expect(
    page.getByRole("heading", { name: "Proposed adaptations" }),
  ).toBeVisible();
});

test("late plan response after changing needs does not overwrite current state", async ({
  page,
}) => {
  const routes = await mockModelRoutes(page, { delayedPlan: true });
  await completeIntake(page);

  await page.getByRole("button", { name: /Review adaptation plan/ }).click();
  await page.getByRole("button", { name: /Back to worksheet/ }).click();
  await page.getByRole("button", { name: /Continue to groups/ }).click();
  await page.getByLabel(/Understanding the language/).check();
  routes.releasePlan();

  await expect(
    page.getByRole("heading", { name: "What does this group need?" }),
  ).toBeVisible();
  await expect(page.getByLabel(/Understanding the language/)).toBeChecked();
  await expect(
    page.getByRole("heading", { name: "Proposed adaptations" }),
  ).toHaveCount(0);
});

test("review starts with approval disabled, generates actual PDF, downloads it, and edits revoke download", async ({
  page,
}) => {
  await mockModelRoutes(page);
  await reachReview(page);

  await expect(
    page.getByRole("button", { name: "Approve this PDF" }),
  ).toBeDisabled();
  await prepareAndApprovePdf(page);

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: /Download PDF/ }).click();
  const download = await downloadPromise;
  const pdfPath = path.join(outputDir, "CHLD-Adapt-worksheet.pdf");
  await download.saveAs(pdfPath);

  const pdf = readFileSync(pdfPath);
  expect(pdf.subarray(0, 5).toString()).toBe("%PDF-");
  const pageCount = (pdf.toString("latin1").match(/\/Type\s*\/Page\b/g) ?? [])
    .length;
  expect(pageCount).toBeGreaterThanOrEqual(1);

  await page.getByRole("button", { name: /Back to review/ }).click();
  await page.getByLabel("Worksheet title").fill("Edited plants at school");

  await expect(
    page.getByRole("button", { name: "Approve this PDF" }),
  ).toBeDisabled();
  await expect(page.locator(".pdf-pages")).toHaveCount(0);
});

test("missing or incorrect password rejects UI and API before authenticated access", async ({
  browser,
}) => {
  const missingContext = await browser.newContext({
    httpCredentials: { username: "", password: "" },
  });
  const missing = await missingContext.newPage();
  const missingResponse = await missing.goto("/");
  expect(missingResponse?.status()).toBe(401);
  await missingContext.close();

  const wrongContext = await browser.newContext({
    httpCredentials: { username: "class", password: "wrong-password" },
  });
  const wrong = await wrongContext.newPage();
  const wrongResponse = await wrong.goto("/");
  expect(wrongResponse?.status()).toBe(401);
  await wrongContext.close();

  const apiContext = await browser.newContext({
    httpCredentials: { username: "class", password: "wrong-password" },
  });
  const apiResponse = await apiContext.request.post(
    "http://127.0.0.1:3000/api/plan",
    {
      data: { lesson: {} },
    },
  );
  expect(apiResponse.status()).toBe(401);
  await apiContext.close();
});

test("390px mobile viewport has no horizontal overflow and captures screenshot", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await mockModelRoutes(page);
  await completeIntake(page);

  const overflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth,
  );
  expect(overflow).toBe(false);
  await page.screenshot({
    path: path.join(outputDir, "chld-mobile.png"),
    fullPage: true,
  });
});

test("desktop intake and review screenshots are captured", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await mockModelRoutes(page);
  await completeIntake(page);
  await page.screenshot({
    path: path.join(outputDir, "chld-desktop-intake.png"),
    fullPage: true,
  });

  await page.getByRole("button", { name: /Review adaptation plan/ }).click();
  await page.getByRole("button", { name: /Create worksheet/ }).click();
  await expect(
    page.getByRole("heading", { name: "Your editable adaptation" }),
  ).toBeVisible();
  await page.screenshot({
    path: path.join(outputDir, "chld-desktop-review.png"),
    fullPage: true,
  });
});

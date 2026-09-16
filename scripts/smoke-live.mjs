import { chromium, expect } from '@playwright/test';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const target = process.env.CHLD_SMOKE_URL;
const password = process.env.CLASS_DEMO_PASSWORD;
const username = process.env.CLASS_DEMO_USERNAME || 'class';

if (!target || !password) {
  console.error('Set CHLD_SMOKE_URL and CLASS_DEMO_PASSWORD before running this smoke test.');
  process.exit(2);
}

const baseURL = new URL(target).origin;
const outputDir = path.join(process.cwd(), 'output');
mkdirSync(outputDir, { recursive: true });

const metadata = {
  target: baseURL,
  startedAt: new Date().toISOString(),
  auth: {},
  flows: [],
  staticScan: { checked: 0, leakedOpenRouterPrefix: false },
};

function sha256(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

function sanitizeApi(pathname, payload, status) {
  return {
    path: pathname,
    status,
    model: payload?.meta?.model ?? null,
    latencyMs: payload?.meta?.latencyMs ?? null,
    costUsd: payload?.meta?.costUsd ?? null,
  };
}

async function installPdfHashRecorder(page) {
  await page.addInitScript(() => {
    window.__pdfBlobHashes = [];
    const originalCreateObjectURL = URL.createObjectURL.bind(URL);
    URL.createObjectURL = (blob) => {
      const objectURL = originalCreateObjectURL(blob);
      if (blob?.type === 'application/pdf') {
        const entry = { url: objectURL, hash: null, size: blob.size };
        window.__pdfBlobHashes.push(entry);
        blob.arrayBuffer()
          .then((buffer) => crypto.subtle.digest('SHA-256', buffer))
          .then((digest) => {
            entry.hash = Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, '0')).join('');
          })
          .catch(() => {
            entry.hash = 'hash-error';
          });
      }
      return objectURL;
    };
  });
}

async function waitForLatestPreviewHash(page) {
  return await page.waitForFunction(() => {
    const latest = window.__pdfBlobHashes?.at(-1);
    return latest?.hash ? latest : null;
  }, null, { timeout: 20_000 });
}

async function createPage(browser, networkLog) {
  const context = await browser.newContext({
    baseURL,
    httpCredentials: { username, password },
    viewport: { width: 1440, height: 1000 },
    acceptDownloads: true,
  });
  if (process.env.CHLD_SMOKE_PREEMPTIVE_AUTH === '1') {
    await context.route(`${baseURL}/**`, (route) => route.continue({
      headers: {
        ...route.request().headers(),
        authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
      },
    }));
  }
  const page = await context.newPage();
  await installPdfHashRecorder(page);

  page.on('response', async (response) => {
    const url = new URL(response.url());
    if (url.origin !== baseURL) return;
    const contentType = response.headers()['content-type'] || '';
    if (url.pathname === '/api/plan' || url.pathname === '/api/adapt') {
      try {
        networkLog.api.push(sanitizeApi(url.pathname, await response.json(), response.status()));
      } catch {
        networkLog.api.push({ path: url.pathname, status: response.status(), model: null, latencyMs: null, costUsd: null });
      }
    }
    if (contentType.includes('text/html') || contentType.includes('javascript') || contentType.includes('json')) {
      try {
        const body = await response.text();
        networkLog.staticBodies.push({ url: url.pathname, hasOpenRouterPrefix: body.includes('sk-or-v1') });
      } catch {
        // Ignore opaque or already-consumed bodies.
      }
    }
  });

  return { context, page };
}

async function chooseNeeds(page) {
  await page.getByLabel(/Following multistep directions/).check();
  await page.getByLabel(/Seeing and navigating the page/).check();
  await page.getByLabel(/Writing or recording answers/).check();
}

async function approveAndDownload(page, name) {
  await expect(page.getByRole('button', { name: 'Approve this PDF' })).toBeDisabled();
  await page.getByRole('button', { name: /Prepare PDF preview/ }).click();
  await expect(page.locator('.pdf-pages')).toBeVisible({ timeout: 35_000 });
  await expect(page.getByAltText('Worksheet PDF page 1')).toBeVisible();
  const previewHandle = await waitForLatestPreviewHash(page);
  const preview = await previewHandle.jsonValue();

  const concernCheckboxes = page.locator('.concerns input[type="checkbox"]');
  for (let index = 0, count = await concernCheckboxes.count(); index < count; index += 1) {
    await concernCheckboxes.nth(index).check();
  }
  await page.getByLabel(/I reviewed this PDF/).check();
  await page.getByRole('button', { name: 'Approve this PDF' }).click();
  await expect(page.getByRole('button', { name: /Download PDF/ })).toBeEnabled();

  await page.screenshot({ path: path.join(outputDir, `live-${name}-download.png`), fullPage: true });
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: /Download PDF/ }).click();
  const download = await downloadPromise;
  const pdfPath = path.join(outputDir, `live-${name}.pdf`);
  await download.saveAs(pdfPath);

  const downloaded = readFileSync(pdfPath);
  const downloadHash = sha256(downloaded);
  if (downloadHash !== preview.hash) {
    throw new Error(`Downloaded ${name} PDF hash did not match preview blob hash.`);
  }
  if (downloaded.subarray(0, 5).toString() !== '%PDF-') {
    throw new Error(`Downloaded ${name} file is not a PDF.`);
  }

  return { pdfPath, previewHash: preview.hash, downloadHash, hashSame: true, bytes: downloaded.length };
}

async function runFlow(browser, exampleName, buttonName, expectedQuestionCount, assertions) {
  const networkLog = { api: [], staticBodies: [] };
  const { context, page } = await createPage(browser, networkLog);
  try {
    await page.goto('/', {waitUntil:'domcontentloaded',timeout:45000});
    console.log(`${exampleName}: page opened`);
    await expect(async () => {
      await page.getByRole('button', { name: buttonName }).click();
      await expect(page.getByLabel(/I checked the source/)).toBeEnabled({timeout:3000});
    }).toPass({timeout:20000});
    await page.getByLabel(/I checked the source/).check();
    await page.getByRole('button', { name: /Continue to groups/ }).click();
    await chooseNeeds(page);
    await page.getByRole('button', { name: /Review adaptation plan/ }).click();
    await expect(page.getByRole('heading', { name: 'Proposed adaptations' })).toBeVisible({ timeout: 90_000 });
    console.log(`${exampleName}: live plan received`);
    await page.getByRole('button', { name: /Create worksheet/ }).click();
    await expect(page.getByRole('heading', { name: 'Your editable adaptation' })).toBeVisible({ timeout: 120_000 });
    console.log(`${exampleName}: live draft received`);

    await page.screenshot({ path: path.join(outputDir, `live-${exampleName}-review.png`), fullPage: true });
    const questionValues = [];
    for (let index = 1; index <= expectedQuestionCount; index += 1) {
      const value = await page.getByLabel(`Question ${index}`).inputValue();
      questionValues.push(value);
    }
    assertions(questionValues);

    const pdf = await approveAndDownload(page, exampleName);

    await page.setViewportSize({ width: 390, height: 844 });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    if (overflow) throw new Error(`${exampleName} has horizontal overflow at 390px.`);

    metadata.staticScan.checked += networkLog.staticBodies.length;
    metadata.staticScan.leakedOpenRouterPrefix ||= networkLog.staticBodies.some((body) => body.hasOpenRouterPrefix);
    metadata.flows.push({
      example: exampleName,
      questionCount: questionValues.length,
      api: networkLog.api,
      pdf: {
        file: path.relative(process.cwd(), pdf.pdfPath),
        bytes: pdf.bytes,
        hashSame: pdf.hashSame,
        sha256: pdf.downloadHash,
      },
    });
  } finally {
    await context.close();
  }
}

async function checkAuth(browser) {
  const missingContext = await browser.newContext({ baseURL, httpCredentials: { username: '', password: '' } });
  const missing = await missingContext.request.get('/');
  metadata.auth.missingUiStatus = missing.status();
  await missingContext.close();

  const wrongContext = await browser.newContext({ baseURL, httpCredentials: { username, password: 'wrong-password' } });
  const wrong = await wrongContext.request.get('/');
  metadata.auth.wrongUiStatus = wrong.status();
  const api = await wrongContext.request.post('/api/plan', { data: { lesson: {} } });
  metadata.auth.wrongApiStatus = api.status();
  await wrongContext.close();

  if (metadata.auth.missingUiStatus !== 401 || metadata.auth.wrongUiStatus !== 401 || metadata.auth.wrongApiStatus !== 401) {
    throw new Error(`Auth smoke failed: ${JSON.stringify(metadata.auth)}`);
  }
}

const browser = await chromium.launch();
try {
  await checkAuth(browser);
  await runFlow(browser, 'reading', 'Reading', 4, (questions) => {
    if (questions.length !== 4) throw new Error('Reading flow did not preserve 4 question refs.');
    const joined = questions.join('\n');
    if (!/Who/i.test(questions[0]) || !/Where/i.test(questions[1])) throw new Error('Reading question refs/content changed unexpectedly.');
    if (/\bMina\b.*\bcarried\b|\bbeside the window\b/i.test(joined)) throw new Error('Reading adaptation appears to include answer text in questions.');
  });
  await runFlow(browser, 'mathematics', 'Mathematics', 3, (questions) => {
    if (questions.length !== 3) throw new Error('Mathematics flow did not preserve 3 question refs.');
    const joined = questions.join('\n');
    for (const pattern of [/3\b[\s\S]*2\b/, /9\b[\s\S]*4\b/, /6\b[\s\S]*3\b/]) {
      if (!pattern.test(joined)) throw new Error('Mathematics operands were not preserved.');
    }
    if (/\b5 apples\b|\b5 pencils\b|\b9 birds\b/i.test(joined)) throw new Error('Mathematics adaptation appears to include answer text.');
  });

  if (metadata.staticScan.leakedOpenRouterPrefix) {
    throw new Error('Browser-visible same-origin response body contained an OpenRouter key prefix.');
  }
  metadata.finishedAt = new Date().toISOString();
  writeFileSync(path.join(outputDir, 'live-smoke.json'), JSON.stringify(metadata, null, 2));
  console.log(`Live smoke passed for ${baseURL}. Metadata: output/live-smoke.json`);
} catch (error) {
  metadata.finishedAt = new Date().toISOString();
  metadata.error = error instanceof Error ? error.message : String(error);
  writeFileSync(path.join(outputDir, 'live-smoke.json'), JSON.stringify(metadata, null, 2));
  console.error(metadata.error);
  process.exitCode = 1;
} finally {
  await browser.close();
}

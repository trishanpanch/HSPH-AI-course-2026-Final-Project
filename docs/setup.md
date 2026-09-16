# CHLD Adapt — M0 setup record

**16 September 2026. Status: M0 closed Done at 17:01:04 UTC.** [Issue #1](https://github.com/trishanpanch/HSPH-AI-course-2026-Final-Project/issues/1) is Done after Cloud Run runtime secret injection and protected-route checks passed on the first deployed revision. The active build is a 45-minute hard-deadline run that started at 16:35:12 UTC and ends at 17:20:12 UTC. The earlier 60-minute plan is historical and superseded for this run.

## Selected deployment target

The owner explicitly selected the existing LUNR Studio project and account:

| Setting | Value |
| --- | --- |
| GCP project | `vibecoda-499712` |
| GCP account | `trishan@lunr.studio` |
| Region | `us-central1` |
| Cloud Run service | `chld-adapt` |
| Build identity | `chld-adapt-build@vibecoda-499712.iam.gserviceaccount.com` |
| Runtime identity | `chld-adapt-runtime@vibecoda-499712.iam.gserviceaccount.com` |
| Model | `google/gemini-2.5-flash-lite` through OpenRouter |

Use explicit account/project flags. No global gcloud configuration was changed. CHLD has its own identities and secrets; the existing `vibecoda-web` service and its identities were not changed.

The build identity compiles the application. The runtime identity is the identity the running application will use. Keeping them separate means building the code does not require access to the model key or class password.

## Verified and prepared

- Billing is enabled on the selected project.
- Cloud Run, Cloud Build, Artifact Registry, Secret Manager and IAM APIs are enabled.
- The selected account has the project Owner role. Effective organization policy allows all policy-member domains and does not require Cloud Run's invoker IAM check; the agreed application password gate is feasible. No organization policy was changed.
- Created the CHLD build identity and granted it the documented `roles/run.builder` project role for source deployment. It received no Secret Manager reader grant.
- Created the CHLD runtime identity and granted `roles/secretmanager.secretAccessor` on each of the two CHLD secrets below. It received no project-wide role.
- Created region-replicated secrets in `us-central1`. Generated a random class password directly into Secret Manager version 1, without printing it or storing it in Git.
- Local tooling: Node.js `22.19.0`, npm `10.9.3`, GitHub CLI and gcloud are available.
- The public OpenRouter catalog and provider metadata list `qwen/qwen3.7-flash`, including text/image input and JSON response mode. Strict JSON Schema enforcement is not advertised. This metadata check was not a paid model probe.
- `qwen/qwen3.7-flash` repeatedly returned 429 responses and exhausted 384 reasoning tokens during live probing. The configured replacement for this class demo is `google/gemini-2.5-flash-lite`, a similarly priced multimodal model already authorized as an alternative.

A no-source Cloud Build preflight **passed** using the CHLD build identity: [build 696dc8dc-9a70-4ff3-8737-a265c511cd41](https://console.cloud.google.com/cloud-build/builds;region=us-central1/696dc8dc-9a70-4ff3-8737-a265c511cd41?project=8642258683), status `SUCCESS`, finished 16 September 2026 at 16:19:35 UTC. It verified Node 22 execution without uploading the application, consuming a model key or deploying a service. Runtime reader bindings on both CHLD secrets and their version 1 values were read back and verified. The owner has saved the model key as version 1, and OpenRouter's current-key endpoint accepted it.

A small fallback live probe returned valid JSON from `google/gemini-2.5-flash-lite` in 671 ms through `google-ai-studio/flex`, with recorded cost `$0.00000795` and provider rates `$0.05` input / `$0.20` output per million tokens. This proves the key can make a small JSON-mode request through the fallback model; it is not a full application test, not a quality result and not a guarantee that the deployed app will route to the same provider or price.

Google sign-in for `trishan@lunr.studio` has been refreshed. Cloud Run revision `chld-adapt-00001-qf6` started with the actual version 1 secrets. Runtime verification showed the authorized page returned 200, anonymous access returned 401 and a live plan request returned 200 using Gemini in 1317 ms with recorded cost `$0.0000694`. This closes M0. A corrected revision deployment and the full hosted smoke for the later fixes remain pending.

## Secrets and remaining verification

| Cloud Run variable | Secret | Current state |
| --- | --- | --- |
| `OPENROUTER_API_KEY` | [chld-adapt-openrouter-api-key](https://console.cloud.google.com/security/secret-manager/secret/chld-adapt-openrouter-api-key/versions?project=vibecoda-499712) | Version 1 stored; OpenRouter key authentication verified |
| `CLASS_DEMO_PASSWORD` | [chld-adapt-class-password](https://console.cloud.google.com/security/secret-manager/secret/chld-adapt-class-password/versions?project=vibecoda-499712) | Generated password stored as version 1 |

**Class-demo exception, 16 September 2026:** the owner explicitly waived the planned $5 OpenRouter key limit for this demonstration. The verified key metadata reports `limit: null` (no per-key cap). Do not describe a cap as configured. This exception leaves request-size limits, timeouts, bounded retries and password protection in scope. Revisit the key cap before use beyond this class demo.

Do not paste secret values into the public issue, source code or this document. The class uses username `class`; the password can be retrieved by an authorized owner through the linked secret's console page.

The small live JSON-mode request passed on the fallback model and was recorded without the key or source payload. Earlier Qwen attempts failed with 429/rate-limit behavior and reasoning-token exhaustion, so the app configuration now uses the fallback model. The first Cloud Run revision verified runtime secret injection and protected app/API behavior; the corrected application revision still needs its own deployment and full hosted smoke.

Use [.env.example](../.env.example) as the local configuration template. `.env.local` is ignored by Git; [.gcloudignore](../.gcloudignore) also honors those exclusions and omits local dependencies, build output and reference documents from deployment uploads. Cloud Run uses Secret Manager directly, not an uploaded environment file. Missing model or password configuration must fail closed in the application.

## Deployment handoff for M4

The deployment will use the repository Dockerfile. The command must explicitly select service `chld-adapt`, project `vibecoda-499712`, account `trishan@lunr.studio` and region `us-central1`. Pass the CHLD build identity via `--build-service-account` and the CHLD runtime identity via `--service-account`. Pin the two approved secret versions when setting `OPENROUTER_API_KEY` and `CLASS_DEMO_PASSWORD`; set `OPENROUTER_MODEL=google/gemini-2.5-flash-lite` and `CLASS_DEMO_USERNAME=class` as non-secret environment variables.

For class access, use `--no-invoker-iam-check` only after the application enforces HTTP Basic authentication on the UI and all AI routes. Missing or incorrect credentials must never trigger a paid call. Use zero minimum instances and a small maximum instance count. The first deployment created revision `chld-adapt-00001-qf6`; the corrected revision deployment remains pending.

The application source now exists as a Next 16 / React / TypeScript app with Basic Auth-protected UI/API routes, browser-session drafts and actual PDF generation. The current local check set includes 12 unit tests and 6 browser tests. M2 found a live math numeric-change bug; runtime numeric guards and separated plan cautions from student instructions corrected it. The original failing case and a fresh live case both passed on local retest, with evidence recorded in `metadata/output/live-local-maths-retest.json`. Validate the corrected revision and full hosted workflow in M4; local tests, the first deployed runtime check and the small probe do not establish that the corrected deployed app works.

References: [Cloud Run source deployment](https://docs.cloud.google.com/run/docs/deploying-source-code), [Cloud Run secrets](https://docs.cloud.google.com/run/docs/configuring/services/secrets), [OpenRouter authentication](https://openrouter.ai/docs/api_reference/authentication), [Qwen provider metadata](https://openrouter.ai/api/v1/models/qwen/qwen3.7-flash/endpoints).

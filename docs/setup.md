# CHLD Adapt — M0 setup record

**16 September 2026. Status: setup in progress; M0 has not passed.** [Issue #1](https://github.com/trishanpanch/HSPH-AI-course-2026-Final-Project/issues/1) is in **Ready** at the owner's request. This board status does not mean all readiness checks have passed. The one-hour build clock has not started.

## Selected deployment target

The owner explicitly selected the existing LUNR Studio project and account:

| Setting | Value |
| --- | --- |
| GCP project | `vibecoda-499712` |
| GCP account | `trishan@lunr.studio` |
| Region | `us-central1` |
| Future Cloud Run service | `chld-adapt` — not deployed yet |
| Build identity | `chld-adapt-build@vibecoda-499712.iam.gserviceaccount.com` |
| Runtime identity | `chld-adapt-runtime@vibecoda-499712.iam.gserviceaccount.com` |
| Model | `qwen/qwen3.7-flash` through OpenRouter |

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
- The public OpenRouter catalog and provider metadata list `qwen/qwen3.7-flash`, including text/image input and JSON response mode. Strict JSON Schema enforcement is not advertised. This metadata check is not a paid model probe.

A no-source Cloud Build preflight **passed** using the CHLD build identity: [build 696dc8dc-9a70-4ff3-8737-a265c511cd41](https://console.cloud.google.com/cloud-build/builds;region=us-central1/696dc8dc-9a70-4ff3-8737-a265c511cd41?project=8642258683), status `SUCCESS`, finished 16 September 2026 at 16:19:35 UTC. It verified Node 22 execution without uploading the application, consuming a model key or deploying a service. Runtime reader bindings on both secrets were read back and verified; a live model call and complete credential check remain pending the key version.

## Secrets and the remaining owner input

| Cloud Run variable | Secret | Current state |
| --- | --- | --- |
| `OPENROUTER_API_KEY` | [chld-adapt-openrouter-api-key](https://console.cloud.google.com/security/secret-manager/secret/chld-adapt-openrouter-api-key/versions?project=vibecoda-499712) | Secret created; key version still needed |
| `CLASS_DEMO_PASSWORD` | [chld-adapt-class-password](https://console.cloud.google.com/security/secret-manager/secret/chld-adapt-class-password/versions?project=vibecoda-499712) | Generated password stored as version 1 |

Create a dedicated OpenRouter key with a **$5 limit**, then add its value as a new version of the key secret in the Cloud Console while signed in as the selected account. Do not paste the value into the public issue, source code or this document. The class uses username `class`; the password can be retrieved by an authorized owner through the linked secret's console page.

Once the key is provided, verify current-key metadata (`GET /api/v1/key`) reports the expected limit and remaining credit. Then run a small live JSON-mode request, validate the returned content locally and record model, request ID, latency and cost without the key or source payload. Reject an unlimited or unexpectedly configured key until the limit is corrected. Keep M0 open until the live check and secret-access checks pass.

Use [.env.example](../.env.example) as the local configuration template after implementation begins. `.env.local` is ignored by Git; [.gcloudignore](../.gcloudignore) also honors those exclusions and omits local dependencies, build output and reference documents from deployment uploads. Cloud Run uses Secret Manager directly, not an uploaded environment file. Missing model or password configuration must fail closed in the later application.

## Deployment handoff for M4

The future source-deployment command must explicitly select service `chld-adapt`, project `vibecoda-499712`, account `trishan@lunr.studio` and region `us-central1`. Pass the CHLD build identity via `--build-service-account` and the CHLD runtime identity via `--service-account`. Pin the two approved secret versions when setting `OPENROUTER_API_KEY` and `CLASS_DEMO_PASSWORD`; set `OPENROUTER_MODEL` and `CLASS_DEMO_USERNAME=class` as non-secret environment variables.

For class access, use `--no-invoker-iam-check` only after the application enforces HTTP Basic authentication on the UI and all AI routes. Missing or incorrect credentials must never trigger a paid call. Use zero minimum instances and a small maximum instance count. No deploy command has been run during M0.

The application still needs its package manifest, locked dependencies and production start/build configuration in M1; validate the full application build and hosted workflow in M4. The infrastructure preflight does not establish that the unbuilt app works.

References: [Cloud Run source deployment](https://docs.cloud.google.com/run/docs/deploying-source-code), [Cloud Run secrets](https://docs.cloud.google.com/run/docs/configuring/services/secrets), [OpenRouter authentication](https://openrouter.ai/docs/api_reference/authentication), [model provider metadata](https://openrouter.ai/api/v1/models/qwen/qwen3.7-flash/endpoints).

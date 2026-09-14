# Sharing hygiene

Share source and reviewed knowledge from a clean Git checkout. This project is
an internal adoption example; the sample application is local demo software.

## Prepare the actual repository

Before sharing from a repository that has Git metadata:

```bash
git status --short
git ls-files .auth playwright/.auth qa-results app/backend/.venv app/frontend/dist
```

The second command should print no tracked local artifacts. `.gitignore` prevents
new additions but does not untrack existing files. Review any output before
removing files from the index; preserve source and locally needed evidence.
Inspect your normal secret scan and review staged changes for credentials,
tokens, customer data and internal URLs. No secret scanner or history audit is
implied by this repository's static QA checks.

Prefer sharing the repository URL with its intended audience. If a ZIP is
needed, use a source-only Git archive of reviewed committed content, not “zip the
workspace.” A copied folder can contain ignored authentication state, traces,
SQLite data, uploads, environments and caches. This audit workspace had no
`.git`, so tracked-file and history hygiene still need verification in the
original repository.

## Evidence and credentials

Runtime output belongs under ignored `qa-results/`, `test-results/` and auth
state directories. Inspect and redact traces, screenshots, request headers,
query strings and logs before sharing. Preserve original evidence privately;
put stable sanitized references in durable notes. Deleting local evidence is not
required to adopt the layer.

`config/test-config.json` and `app/backend/auth.py` contain intentional demo
accounts. The backend also has a development JWT secret fallback, and download
URLs contain bearer tokens in query parameters. Use the sample only locally
with demo data; it is not a hardened deployable service. The portable adoption
layer requires none of these accounts or application settings.

No new deployment, OAuth integration, hosted service or dependency security
claim is part of this work. Dependencies and license/ownership suitability
should go through your team's normal review before external redistribution;
no license grant is invented here.

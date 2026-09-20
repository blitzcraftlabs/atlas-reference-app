# atlas-reference-app

This project was generated from Atlas 1.1.0.

The generated application stays in this repository. Atlas does not host your application.

## Getting started

```bash
pnpm install
pnpm dev
```

## Atlas Doctor

Generated projects do not include an `atlas` package script. From this directory, run Doctor with
the published CLI:

```bash
pnpm dlx @blitzcraftlabs/atlas@1.1.0 doctor
```

## Continuous integration

`.github/workflows/ci.yml` is generated with this project and is source-owned afterward. It runs
on GitHub-hosted Ubuntu, needs no repository secrets, and does not use BlitzCraft infrastructure.
Replace it with your own GitHub, GitLab, Buildkite, or self-hosted pipeline if you prefer.

The default workflow is the supported quality baseline (Doctor, lint, typecheck, tests, production
build). It is not Atlas maintainer CI. Playwright E2E is omitted until you add browsers and a
running app. Commit `pnpm-lock.yaml` after `pnpm install` so `--frozen-lockfile` succeeds.

## Documentation

- Atlas public docs: https://github.com/blitzcraftlabs/atlas/blob/main/docs/public/README.md
- Atlas Doctor: https://github.com/blitzcraftlabs/atlas/blob/main/docs/how-we-build/doctor.md

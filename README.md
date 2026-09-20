# atlas-reference-app

**Repository:** https://github.com/blitzcraftlabs/atlas-reference-app

Standalone **Atlas consumer reference application** used to exercise installation, CI, deployment, observability, rollback, and incident-response patterns **outside** the canonical [`blitzcraftlabs/atlas`](https://github.com/blitzcraftlabs/atlas) monorepo.

This repository was generated from the **published npm package**:

```bash
pnpm dlx @blitzcraftlabs/atlas@1.1.0 init atlas-reference-app
```

**Atlas baseline:** `1.1.0` (`atlas.config.json`).

## Live deployment

- **Production:** https://atlas-reference-app.vercel.app
- **Health:** https://atlas-reference-app.vercel.app/api/health

## Local development

```bash
corepack pnpm@10.19.0 install
pnpm dev
```

Production-style run:

```bash
pnpm build
pnpm --filter @atlas/web start
```

## Validation

```bash
pnpm dlx @blitzcraftlabs/atlas@1.1.0 doctor
pnpm lint && pnpm typecheck && pnpm test && pnpm build
```

Browser smoke (reference repo workflow, not default consumer CI):

```bash
CI=true pnpm --filter @atlas/web test:e2e --project=chromium
```

Production smoke (any URL):

```bash
pnpm smoke -- https://atlas-reference-app.vercel.app
```

## CI

| Workflow | Purpose |
| --- | --- |
| `.github/workflows/ci.yml` | Generated consumer baseline (install, Doctor, lint, typecheck, test, build) |
| `.github/workflows/e2e.yml` | Reference Playwright smoke (chromium) |
| `.github/workflows/production-synthetics.yml` | Scheduled production HTTP smoke (every 30 minutes) |

## Operations documentation

See [`docs/operations/`](docs/operations/):

- Bootstrap validation
- Deployment & release identity
- Observability & SLO reference targets
- Smoke tests
- Rollback procedure
- Incident response runbook
- Postmortems (including a **controlled** deployment failure drill)

## Controlled incident exercise

A deliberate health-check failure was deployed once, detected via smoke checks, mitigated with a Vercel deployment promote, and documented in:

`docs/operations/postmortems/0001-controlled-deployment-failure.md`

This is an operational drill—not a certification or formal production audit.

## Relationship to Atlas

- **Atlas** ships the platform package, Doctor, and scaffold defaults.
- **This repository** owns hosting, secrets, monitoring cadence, deployment promotion, and incident ownership for the reference deployment.

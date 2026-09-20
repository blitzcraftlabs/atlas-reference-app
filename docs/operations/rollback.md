# Production rollback

## Triggers

- SEV-1: home or `/api/health` unavailable, or smoke script fails twice consecutively
- Failed post-deploy smoke (`pnpm smoke -- <production-url>`)
- Deliberate operational drill (documented separately)

## Application rollback vs feature rollback

| Type | When | Mechanism |
| --- | --- | --- |
| **Application rollback** | Bad deployment / regression in app code | Vercel instant rollback to prior production deployment |
| **Feature rollback** | Single feature flag misconfiguration | Toggle env/flag (`REFERENCE_HEALTH_INCIDENT`, feature flags) and redeploy |

## Authority

BlitzCraft Labs operators with Vercel `blitzcraftlabs` team access may initiate rollback. No Atlas maintainer action required.

## Identify last known good

1. Note failing deployment ID from `/api/health` (`deploymentId`) or Vercel dashboard.
2. Find previous **Ready** production deployment in Vercel project history.
3. Confirm prior deployment passed smoke checks.

## Execute (Vercel)

```bash
cd apps/web
npx vercel rollback --scope blitzcraftlabs --yes
```

Alternative: promote a specific deployment:

```bash
npx vercel promote <deployment-url> --scope blitzcraftlabs
```

## Verify recovery

```bash
pnpm smoke -- https://atlas-reference-app.vercel.app
curl -s https://atlas-reference-app.vercel.app/api/health | jq .
```

Critical journey: open `/examples` and `/examples/data?mode=success` in browser or rely on Playwright workflow on `main`.

## Git history after rollback

Rollback moves **production traffic** to an older deployment. Git `main` may still contain the faulty commit until reverted—align Git with production by reverting or fixing forward after mitigation.

## Post-rollback smoke gate

Smoke script must pass before incident is marked resolved.

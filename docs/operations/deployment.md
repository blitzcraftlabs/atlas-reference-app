# Deployment

## Path

```text
Git commit on main
→ (GitHub CI when remote is connected)
→ Vercel production deployment
→ https://atlas-reference-app.vercel.app
```

## Current production identity

| Field | Value |
| --- | --- |
| Platform | Vercel (`blitzcraftlabs` team) |
| Project | `atlas-reference-app` |
| Production URL | https://atlas-reference-app.vercel.app |
| Atlas baseline | `1.1.0` (from `atlas.config.json`) |
| Monorepo app root | `apps/web` |
| Install | `cd ../.. && pnpm install` |
| Build | `cd ../.. && pnpm build --filter @atlas/web` |

Record the live Git SHA from `/api/health` (`gitSha` field). Vercel sets `VERCEL_GIT_COMMIT_SHA` on Git-connected deployments; CLI deploys may show `null` until Git integration is attached.

## Promotion model

| Environment | Trigger | Notes |
| --- | --- | --- |
| Preview | Vercel preview deployments (Git PR / CLI) | Deployment-protection may require Vercel authentication on `*.vercel.app` URLs. |
| Production | `vercel deploy --prod` or Git push to production branch | Production alias: `atlas-reference-app.vercel.app`. |

## Ownership

| Area | Owner |
| --- | --- |
| Application source | BlitzCraft Labs (`blitzcraftlabs/atlas-reference-app` consumer repo) |
| Vercel project & secrets | BlitzCraft Labs platform operators |
| Atlas platform package | `blitzcraftlabs/atlas` maintainers |

## Immutable release identification

1. **Git commit SHA** — canonical source revision (`gitSha` in `/api/health` when provided).
2. **Vercel deployment ID** — `VERCEL_DEPLOYMENT_ID` / deployment URL (`dpl_…`).
3. **Atlas baseline** — `platform.baseline.atlasVersion` in `atlas.config.json` (`1.1.0`).

## Consumer note (Vercel + Atlas scaffold)

The generated Next.js config enables `output: "standalone"` for container/self-hosted deploys. This reference app disables standalone output when `VERCEL` is set to avoid a Vercel build trace failure (`next-server.js.nft.json`). Self-hosted consumers should keep standalone for Docker workflows.

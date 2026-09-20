# Postmortem 0001 — Controlled deployment failure

**Type:** Controlled operational exercise (no customer impact).

## Summary

A deliberate health-check failure was deployed to production to validate detection, rollback, and recovery for the Atlas consumer reference application on Vercel.

## Impact

- **Users:** None (reference deployment only).
- **Scope:** `/api/health` returned `503` with `REFERENCE_HEALTH_INCIDENT` while home/examples remained available.

## Detection

- Production smoke script failed on health check.
- Manual `curl` confirmed `HTTP 503` on `/api/health`.

## Timeline (UTC)

| Time | Event |
| --- | --- |
| 2026-09-20T16:58:34Z | Bad production deploy initiated (`test: inject controlled reference incident`) |
| 2026-09-20T16:59:22Z | Synthetic/manual detection (`pnpm smoke`, health `503`) |
| 2026-09-20T16:59:23Z | Incident acknowledged (operator review) |
| 2026-09-20T16:59:23Z | Root cause identified (`CONTROLLED_INCIDENT_ACTIVE` in `incident-drill.ts`) |
| 2026-09-20T16:59:25Z | Rollback initiated (`vercel promote` to deployment `dpl_5Vs4ap7QXimwGLJxM23mZGTwvMRw`) |
| 2026-09-20T17:00:40Z | Healthy deployment restored on production alias |
| 2026-09-20T17:00:40Z+ | Smoke checks green (`pnpm smoke`) |
| 2026-09-20T17:00:40Z+ | Incident resolved after Git fix on `main` (see follow-up commit) |

Bad deployment ID: `dpl_GpYT9BM9ETVxbCGGanau5Njh1TJ4`. Restored deployment ID: `dpl_5Vs4ap7QXimwGLJxM23mZGTwvMRw`.

## Root cause

`CONTROLLED_INCIDENT_ACTIVE` was set to `true` in application code and deployed to production as part of the drill commit.

## Contributing factors

- Health failure did not block HTML routes (by design); monitoring must include `/api/health`.
- `vercel rollback` CLI reported no in-progress rollback; **promote previous deployment** was used successfully.

## Mitigation

Promoted last known good Vercel production deployment.

## Recovery

- `curl https://atlas-reference-app.vercel.app/api/health` → `ok: true`
- `pnpm smoke -- https://atlas-reference-app.vercel.app` → all checks passed

## What worked

- Explicit drill flag in Git history
- Smoke script caught health regression quickly
- Vercel promote restored production alias

## What did not work

- `vercel rollback` alone did not change production alias in this session (promote required)

## Corrective actions

- Document promote flow in [rollback.md](../rollback.md) (done)
- Keep `CONTROLLED_INCIDENT_ACTIVE` `false` on `main`
- Scheduled synthetics workflow monitors production URL

## Ownership

- **Incident lead:** BlitzCraft Labs reference app operator
- **Atlas platform:** no code change required

## Follow-up

- [ ] Connect GitHub remote and verify CI + synthetics on `main`
- [ ] Attach Git-connected deploys so `gitSha` populates in `/api/health`

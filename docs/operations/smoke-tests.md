# Smoke tests

Deterministic HTTP checks for production or preview environments.

## Script

```bash
pnpm smoke -- https://atlas-reference-app.vercel.app
```

Optional Git SHA assertion (when health exposes `gitSha`):

```bash
SMOKE_EXPECT_GIT_SHA=<full-sha> pnpm smoke -- https://atlas-reference-app.vercel.app
```

## Checks

| Check | Path | Expectation |
| --- | --- | --- |
| Home | `/` | Contains “Atlas operations reference application” |
| About | `/about` | Contains `atlas-reference-app` |
| Examples journey | `/examples` | Contains “Reference examples” |
| Health | `/api/health` | JSON `ok: true` and `atlasBaseline` string |

## Post-deploy gate

Run smoke after every production promotion and after rollback (see [rollback.md](./rollback.md)).

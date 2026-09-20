# Observability (reference model)

This repository inherits Atlas defaults from the published scaffold:

| Signal | Mechanism | Consumer action |
| --- | --- | --- |
| Structured server logs | Pino (`@/lib/logging`) with request context | Ship logs from Vercel/log drain |
| Correlation IDs | `requestId` on `/api/health` and request context middleware | Propagate in support tickets |
| Web Vitals | Client reporter → `/api/telemetry/web-vitals` | Enable sampling via `NEXT_PUBLIC_WEB_VITALS_*` |
| Error tracking | Sentry SDK (disabled without DSN) | Set `SENTRY_*` / `NEXT_PUBLIC_SENTRY_*` |
| Analytics | PostHog / GA adapters (optional keys) | Configure keys when needed |
| Health | `/api/health` | Synthetic checks + load balancer probes |

## SLIs (reference definitions)

### Availability

- **SLI:** Ratio of successful (`HTTP 2xx`) responses for `GET /` and `GET /api/health`.
- **Measurement:** External synthetic monitor or Vercel observability (when configured).

### Frontend reliability

- **SLI:** Unhandled client errors (Sentry event rate) + `5xx` rate on App Router routes.
- **Measurement:** Sentry project (when DSN configured) or platform HTTP logs.

### User experience

- **SLI:** Core Web Vitals (LCP, INP, CLS) submitted to `/api/telemetry/web-vitals`.
- **Measurement:** Aggregated from telemetry endpoint or forwarded to analytics backend.

### Critical journey

- **SLI:** `GET /` → `GET /examples` → `GET /examples/data?mode=success` returns expected content (mirrors Playwright smoke/journey tests).

## Correlation

Atlas wires request context on the server. Reference operators should record:

1. User report timestamp
2. `requestId` from `/api/health` or response headers/logs
3. Deployment `gitSha` from `/api/health`

## Dashboards

No production metrics are fabricated in this repository. When Sentry or a log drain is connected, create dashboards for:

- Health check success rate
- `5xx` rate
- Sentry unhandled error count
- Web Vitals p75

## Alert ownership

| Severity | Owner | Channel |
| --- | --- | --- |
| SEV-1 | Reference app on-call (BlitzCraft Labs operator) | Page + incident channel |
| SEV-2 | Same | Ticket + async update |
| SEV-3 | Maintainer backlog | GitHub issue |

Noise control: prefer sustained synthetic failure (≥2 consecutive checks) before paging for this reference deployment.

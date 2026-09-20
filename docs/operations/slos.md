# SLOs (reference targets)

Values below are **reference SLO targets** for this demonstration application. They are not measured historical production data.

| Objective | SLI | Reference SLO target | Window |
| --- | --- | --- | --- |
| Availability | Successful synthetic checks for `/` and `/api/health` | 99.9% | 30 days |
| Critical journey | Successful smoke script (home + examples + health) | 99.5% | 30 days |
| Frontend errors | Unhandled error events / sessions (when Sentry enabled) | < 1% sessions | 30 days |
| Web Vitals | LCP p75 < 2.5s (when telemetry enabled) | 75% good URLs | 30 days |

## Error budget policy (reference)

- **Budget exhausted:** freeze non-essential releases; prioritize reliability work.
- **Reference app:** incident drill outcomes documented in postmortems under `docs/operations/postmortems/`.

## Platform vs consumer

| Topic | Atlas (platform) | Consumer (this repo) |
| --- | --- | --- |
| Instrumentation primitives | Provides Sentry hooks, logging, Web Vitals route | Configures DSNs, sampling, dashboards |
| SLO values | Documents patterns only | Chooses targets and owns paging |
| Synthetic checks | Not hosted by Atlas | This repo’s GitHub Action + smoke script |

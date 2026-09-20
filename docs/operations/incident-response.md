# Incident response runbook

## Severity (reference frontend)

| Level | Definition | Example |
| --- | --- | --- |
| **SEV-1** | Service unavailable or critical journey broken | `/api/health` failing, home `5xx` |
| **SEV-2** | Major feature degraded | Examples routes error while home works |
| **SEV-3** | Localized non-critical defect | Cosmetic issue, non-blocking warning |

## Process

1. **Detect** — synthetic monitor, smoke script, or user report
2. **Acknowledge** — assign incident lead, note time (UTC)
3. **Assess impact** — reference app only (no customer data at risk)
4. **Identify release** — `deploymentId` / `gitSha` from `/api/health`, Vercel deployment list
5. **Mitigate** — rollback, flag toggle, or hotfix
6. **Verify** — smoke script + health + critical journey
7. **Resolve** — confirm stable, communicate
8. **Postmortem** — `docs/operations/postmortems/` for SEV-1/SEV-2 or drills

## Responsibilities

### Atlas (platform)

- Scaffold architecture, Doctor, consumer CI baseline
- Documented patterns for logging, health, telemetry hooks
- Upgrade and contract semantics

### Consumer (this repository)

- Vercel project, env secrets, production URL
- Synthetic monitoring workflow and smoke script
- SLO targets, alert routing, incident ownership
- Git history and deployment promotion

## Escalation

| Severity | Action |
| --- | --- |
| SEV-1 | Immediate rollback consideration; operator paged |
| SEV-2 | Rollback or hotfix within business hours |
| SEV-3 | Track in GitHub issue |

## Communication template

> Reference app incident (SEV-X): \<summary\>. Impact: reference deployment only. Current deployment: \<id\>. Mitigation: \<rollback/hotfix\>. Next update: \<time\>.

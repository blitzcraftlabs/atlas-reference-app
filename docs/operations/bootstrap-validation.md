# Bootstrap validation

This repository was generated from the **published** npm package `@blitzcraftlabs/atlas@1.1.0`. It was not copied from the canonical `blitzcraftlabs/atlas` monorepo checkout.

## Environment (Turing)

| Item | Value |
| --- | --- |
| Host | `turing` |
| Node | v22.23.2 |
| pnpm | 10.19.0 (via Corepack) |
| Git | 2.53.0 |

## Scaffold command

```bash
cd /home/danielmark/Projects
pnpm dlx @blitzcraftlabs/atlas@1.1.0 init atlas-reference-app
cd atlas-reference-app
corepack pnpm@10.19.0 install
```

## Verification

```bash
pnpm dlx @blitzcraftlabs/atlas@1.1.0 doctor
pnpm dlx @blitzcraftlabs/atlas@1.1.0 doctor --json
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Results (2026-09-20)

| Check | Result |
| --- | --- |
| Atlas Doctor | 8/8 checks passed, status `healthy`, `atlasVersion` `1.1.0` |
| `pnpm lint` | Passed (1 upstream `no-nested-ternary` warning in `packages/ui/src/components/ui/slider.tsx`) |
| `pnpm typecheck` | Passed |
| `pnpm test` | Passed |
| `pnpm build` | Production build succeeded |

## Warning classification

1. **Reference-app defect:** none observed in bootstrap validation.
2. **Known upstream dependency warning:** pnpm peer dependency notice for `zod` vs `shadcn` / `@modelcontextprotocol/sdk` during install; ESLint warning in generated `@atlas/ui` slider component.
3. **Harmless informational:** Turbo cache messages about missing test `outputs` keys.

## Contract notes

- `atlas.config.json` reports `platform.baseline.atlasVersion` `1.1.0`.
- Consumer CI is `.github/workflows/ci.yml` (GitHub-hosted `ubuntu-latest`, no self-hosted runners).
- Internal `workspace:*` dependencies resolve within this standalone pnpm workspace (expected for scaffolded monorepo layout).

import type { OperationalIdentity } from "@/lib/operations/identity";

type IdentityPanelProps = {
  identity: OperationalIdentity;
};

export function IdentityPanel({ identity }: IdentityPanelProps) {
  const rows: Array<{ label: string; value: string }> = [
    { label: "Application", value: identity.appName },
    { label: "Version", value: identity.appVersion },
    { label: "Environment", value: identity.environment },
    { label: "Atlas baseline", value: identity.atlasBaseline },
    { label: "Git SHA", value: identity.gitSha ?? "not set" },
    { label: "Deployment ID", value: identity.deploymentId ?? "not set" },
  ];

  return (
    <section aria-labelledby="runtime-identity-heading" className="rounded-lg border p-4">
      <h2 className="text-sm font-medium" id="runtime-identity-heading">
        Runtime identity
      </h2>
      <dl className="mt-3 grid gap-2 font-mono text-xs">
        {rows.map((row) => (
          <div className="grid grid-cols-[9rem_1fr] gap-2" key={row.label}>
            <dt className="text-muted-foreground">{row.label}</dt>
            <dd className="break-all">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

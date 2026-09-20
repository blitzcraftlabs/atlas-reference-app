import { IdentityPanel } from "@/components/operations/IdentityPanel";
import { ReferenceNav } from "@/components/operations/ReferenceNav";
import { getOperationalIdentity } from "@/lib/operations/identity";

export default function AboutPage() {
  const identity = getOperationalIdentity();

  return (
    <>
      <ReferenceNav />
      <main className="mx-auto flex max-w-3xl flex-col gap-6 p-6 text-sm leading-relaxed">
        <div>
          <h1 className="text-lg font-medium">About this repository</h1>
          <p className="mt-2 text-muted-foreground">
            <code className="text-foreground">atlas-reference-app</code> is a standalone consumer
            application used to exercise Atlas installation, validation, CI, deployment,
            observability, rollback, and incident-response patterns outside the canonical Atlas
            monorepo.
          </p>
        </div>
        <section>
          <h2 className="font-medium">Origin</h2>
          <p className="mt-2 text-muted-foreground">
            Generated with{" "}
            <code className="text-foreground">pnpm dlx @blitzcraftlabs/atlas@1.1.0 init</code> from
            the published npm package. Operational documentation lives under{" "}
            <code className="text-foreground">docs/operations/</code>.
          </p>
        </section>
        <IdentityPanel identity={identity} />
      </main>
    </>
  );
}

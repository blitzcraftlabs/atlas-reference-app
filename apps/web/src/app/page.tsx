import Link from "next/link";

import { Button } from "@atlas/ui";

import { IdentityPanel } from "@/components/operations/IdentityPanel";
import { ReferenceNav } from "@/components/operations/ReferenceNav";
import { ThemeHotkey } from "@/components/ThemeHotkey";
import { getOperationalIdentity } from "@/lib/operations/identity";

export default function HomePage() {
  const identity = getOperationalIdentity();

  return (
    <>
      <ThemeHotkey />
      <ReferenceNav />
      <main className="mx-auto flex max-w-3xl flex-col gap-6 p-6">
        <div className="space-y-3 text-sm leading-relaxed">
          <h1 className="text-lg font-medium">Atlas operations reference application</h1>
          <p className="text-muted-foreground">
            A production-operations reference application generated from Atlas. This repository
            demonstrates how an external consumer scaffolds, validates, deploys, observes, and
            recovers a real frontend service using the published Atlas platform package.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/examples">
              <Button type="button">Browse examples</Button>
            </Link>
            <Link href="/about">
              <Button type="button" variant="outline">About this app</Button>
            </Link>
            <Link href="/api/health">
              <Button type="button" variant="outline">Health JSON</Button>
            </Link>
          </div>
        </div>
        <IdentityPanel identity={identity} />
      </main>
    </>
  );
}

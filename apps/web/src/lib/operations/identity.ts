import { readFileSync } from "node:fs";
import { join } from "node:path";

import { env } from "@/env/server-env";

export type OperationalIdentity = {
  appName: string;
  appVersion: string;
  atlasBaseline: string;
  environment: string;
  gitSha: string | null;
  deploymentId: string | null;
};

function readWorkspaceRootFile<T>(relativePath: string): T {
  const workspaceRoot = join(process.cwd(), "../..");
  const raw = readFileSync(join(workspaceRoot, relativePath), "utf8");
  return JSON.parse(raw) as T;
}

/**
 * Safe runtime identity for the Atlas reference consumer application.
 * Exposes only non-secret build and deployment metadata.
 */
export function getOperationalIdentity(): OperationalIdentity {
  const atlasConfig = readWorkspaceRootFile<{
    platform: { baseline: { atlasVersion: string } };
  }>("atlas.config.json");
  const pkg = readWorkspaceRootFile<{ name: string; version: string }>("package.json");

  const environment =
    process.env.NEXT_PUBLIC_APP_ENV ?? env.NODE_ENV ?? process.env.NODE_ENV ?? "development";

  return {
    appName: pkg.name,
    appVersion: pkg.version,
    atlasBaseline: atlasConfig.platform.baseline.atlasVersion,
    environment,
    gitSha: process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.NEXT_PUBLIC_BUILD_ID ?? null,
    deploymentId: process.env.VERCEL_DEPLOYMENT_ID ?? null,
  };
}

export function isReferenceHealthIncidentActive(): boolean {
  return env.REFERENCE_HEALTH_INCIDENT === true;
}

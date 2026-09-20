import { env } from "@/env/server-env";

import atlasConfig from "../../../../../atlas.config.json";
import workspacePackage from "../../../../../package.json";

import { CONTROLLED_INCIDENT_ACTIVE } from "./incident-drill";

export type OperationalIdentity = {
  appName: string;
  appVersion: string;
  atlasBaseline: string;
  environment: string;
  gitSha: string | null;
  deploymentId: string | null;
};

/**
 * Safe runtime identity for the Atlas reference consumer application.
 * Exposes only non-secret build and deployment metadata.
 */
export function getOperationalIdentity(): OperationalIdentity {
  const environment =
    process.env.NEXT_PUBLIC_APP_ENV ?? env.NODE_ENV ?? process.env.NODE_ENV ?? "development";

  return {
    appName: workspacePackage.name,
    appVersion: workspacePackage.version,
    atlasBaseline: atlasConfig.platform.baseline.atlasVersion,
    environment,
    gitSha: process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.NEXT_PUBLIC_BUILD_ID ?? null,
    deploymentId: process.env.VERCEL_DEPLOYMENT_ID ?? null,
  };
}

export function isReferenceHealthIncidentActive(): boolean {
  return CONTROLLED_INCIDENT_ACTIVE || env.REFERENCE_HEALTH_INCIDENT === true;
}

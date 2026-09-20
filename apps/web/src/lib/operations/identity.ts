import { getServerConfig } from "@/config/server";

import atlasConfig from "../../../../../atlas.config.json";
import workspacePackage from "../../../../../package.json";

import { CONTROLLED_INCIDENT_ACTIVE } from "./incident-drill";

export interface OperationalIdentity {
  appName: string;
  appVersion: string;
  atlasBaseline: string;
  environment: string;
  gitSha: string | null;
  deploymentId: string | null;
}

/**
 * Safe runtime identity for the Atlas reference consumer application.
 * Exposes only non-secret build and deployment metadata.
 */
export function getOperationalIdentity(): OperationalIdentity {
  const config = getServerConfig();

  return {
    appName: workspacePackage.name,
    appVersion: workspacePackage.version,
    atlasBaseline: atlasConfig.platform.baseline.atlasVersion,
    environment: config.app.env,
    gitSha: config.app.buildId ?? null,
    deploymentId: config.reference.deploymentId ?? null,
  };
}

export function isReferenceHealthIncidentActive(): boolean {
  const config = getServerConfig();
  return CONTROLLED_INCIDENT_ACTIVE || config.reference.healthIncident;
}

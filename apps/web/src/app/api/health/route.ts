import { NextResponse } from "next/server";

import { log } from "@/lib/logging/logger.server";
import { getRequestContext } from "@/lib/logging/request-context.server";
import { withRequestContext } from "@/lib/logging/with-request-context.server";
import {
  getOperationalIdentity,
  isReferenceHealthIncidentActive,
} from "@/lib/operations/identity";

/**
 * Health check endpoint
 * Demonstrates structured logging with correlation IDs
 */
export async function GET(req: Request) {
  return withRequestContext(req, () => {
    // Log the health check
    log.info({ event: "health_check" }, "Health check hit");

    // Get the current request context
    const ctx = getRequestContext();

    const identity = getOperationalIdentity();
    const incidentActive = isReferenceHealthIncidentActive();

    if (incidentActive) {
      log.warn({ event: "health_check_incident" }, "Reference health incident active");
      return NextResponse.json(
        {
          ok: false,
          incident: "REFERENCE_HEALTH_INCIDENT",
          requestId: ctx?.requestId,
          timestamp: new Date().toISOString(),
          ...identity,
        },
        { status: 503 },
      );
    }

    return NextResponse.json({
      ok: true,
      requestId: ctx?.requestId,
      timestamp: new Date().toISOString(),
      ...identity,
    });
  });
}

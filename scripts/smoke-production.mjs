#!/usr/bin/env node

const baseUrl = process.argv[2]?.replace(/\/$/, "");

if (!baseUrl) {
  console.error("Usage: node scripts/smoke-production.mjs <base-url>");
  process.exit(1);
}

const checks = [
  {
    name: "home page",
    path: "/",
    assertBody: (body) => body.includes("Atlas operations reference application"),
  },
  {
    name: "about page",
    path: "/about",
    assertBody: (body) => body.includes("atlas-reference-app"),
  },
  {
    name: "examples journey",
    path: "/examples",
    assertBody: (body) => body.includes("Reference examples"),
  },
  {
    name: "health endpoint",
    path: "/api/health",
    assertJson: (json) => json.ok === true && typeof json.atlasBaseline === "string",
  },
];

let failed = 0;

for (const check of checks) {
  const url = `${baseUrl}${check.path}`;
  try {
    const response = await fetch(url, { redirect: "follow" });
    const text = await response.text();

    if (!response.ok) {
      console.error(`FAIL ${check.name}: HTTP ${response.status} (${url})`);
      failed += 1;
      continue;
    }

    if (check.assertBody && !check.assertBody(text)) {
      console.error(`FAIL ${check.name}: unexpected body (${url})`);
      failed += 1;
      continue;
    }

    if (check.assertJson) {
      const json = JSON.parse(text);
      if (!check.assertJson(json)) {
        console.error(`FAIL ${check.name}: unexpected JSON (${url})`);
        failed += 1;
        continue;
      }

      if (process.env.SMOKE_EXPECT_GIT_SHA) {
        const expected = process.env.SMOKE_EXPECT_GIT_SHA;
        if (json.gitSha !== expected) {
          console.error(
            `FAIL ${check.name}: gitSha ${json.gitSha ?? "null"} !== expected ${expected}`,
          );
          failed += 1;
          continue;
        }
      }
    }

    console.log(`OK   ${check.name}`);
  } catch (error) {
    console.error(`FAIL ${check.name}: ${error instanceof Error ? error.message : String(error)}`);
    failed += 1;
  }
}

if (failed > 0) {
  process.exit(1);
}

console.log("All smoke checks passed.");

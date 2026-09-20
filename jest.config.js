/**
 * Root Jest configuration for the generated Atlas workspace.
 */
module.exports = {
  projects: ["<rootDir>/apps/web", "<rootDir>/packages/ui", "<rootDir>/packages/consent"],
  collectCoverageFrom: [
    "apps/*/src/**/*.{ts,tsx}",
    "packages/*/src/**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!**/*.stories.tsx",
    "!**/index.ts",
    "!**/node_modules/**",
  ],
};

import { defineConfig, devices } from "@playwright/test";
import { testsDir, testsResultsDir } from "./playwright.shared-vars.js";

const { BASE_URL = "http://localhost:3000" } = process.env;

export default defineConfig({
	timeout: 3 * 60 * 1000, // 3 min
	testDir: testsDir,
	outputDir: testsResultsDir,
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: [
		["html"],
		["list"],
		["junit", { outputFile: "test-results/results.xml" }],
	],
	use: {
		baseURL: BASE_URL,
		trace: "on-first-retry",
		ignoreHTTPSErrors: true,
		...devices["Desktop Chrome"],
	},
	snapshotDir: "playwright-report/test-screenshots",
});

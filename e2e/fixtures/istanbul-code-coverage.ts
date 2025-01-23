/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
import * as crypto from "crypto";
import * as fs from "fs";
import * as path from "path";
import type { BrowserContext } from "playwright";

type CollectIstanbulCoverageFn = (coverageJson: string) => void;

declare global {
	interface Window {
		__coverage__?: Record<string, unknown>;
		collectIstanbulCoverage: CollectIstanbulCoverageFn;
	}
}

function generateUUID(): string {
	return crypto.randomBytes(16).toString("hex");
}

export async function collectIstanbulCodeCoverageAsync(
	context: BrowserContext,
	use: (context: BrowserContext) => Promise<void>,
	outputDir: string
): Promise<void> {
	await fs.promises.mkdir(outputDir, { recursive: true });

	await context.exposeFunction(
		"collectIstanbulCoverage",
		(coverageJson: string) => {
			if (coverageJson) {
				const codeCoverageFilePath = path.join(
					outputDir,
					`coverage_${generateUUID()}.json`
				);
				fs.writeFileSync(codeCoverageFilePath, coverageJson);
			}
		}
	);

	await context.addInitScript(() => {
		window.addEventListener("beforeunload", () => {
			const codeCoverage = window.__coverage__;
			const codeCoverageAsJson = JSON.stringify(codeCoverage);
			window.collectIstanbulCoverage(codeCoverageAsJson);
		});
	});

	await use(context);

	for (const page of context.pages()) {
		await page.evaluate(() => {
			const codeCoverage = window.__coverage__;
			const codeCoverageAsJson = JSON.stringify(codeCoverage);
			window.collectIstanbulCoverage(codeCoverageAsJson);
		});
	}
}

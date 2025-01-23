import path from "path";

export const testsDir = path.resolve("./e2e");
export const testsResultsDir = path.resolve("./test-results");
export const codeCoverageDir = path.resolve(testsResultsDir, "code-coverage");
export const istanbulCodeCoverageInstrumentationDir = path.resolve(
	codeCoverageDir,
	"istanbul-instrumentation"
);

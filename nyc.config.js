import path from "path";
import {
	codeCoverageDir,
	istanbulCodeCoverageInstrumentationDir,
} from "./playwright.shared-vars.js";

export default {
	"temp-dir": istanbulCodeCoverageInstrumentationDir,
	"report-dir": path.resolve(codeCoverageDir, "reports"),
	all: true,
	reporter: ["html", "lcovonly", "text-summary"],
};

/* eslint-disable no-console */
import bunPluginIstanbul from "bun-plugin-istanbul";
import { getFolderSize } from "./buildSize";

export function startBuilder({
	BUILD_DIR_PATH,
	PUBLIC_PATH,
}: {
	BUILD_DIR_PATH: string;
	PUBLIC_PATH?: string;
}): Promise<void> {
	let build = 0;

	async function runBuild() {
		console.log("Starting builder...");
		const buildStart = performance.now();

		// await $`rm -rf ${BUILD_DIR_PATH}`;
		// await $`mkdir ./${BUILD_DIR_PATH}`;
		// const file = Bun.file(`${BUILD_DIR_PATH}`);
		// await file.delete();

		const buildResult = await Bun.build({
			entrypoints: ["./src/index.tsx"],
			outdir: BUILD_DIR_PATH,
			minify: process.env.BUN_DEV_BUILD !== "true",
			splitting: process.env.BUN_DEV_BUILD !== "true",
			sourcemap: process.env.BUN_DEV_BUILD === "true" ? "inline" : "none",
			publicPath: PUBLIC_PATH || "./",
			plugins: [
				...(process.env.BUN_CODE_COVERAGE === "true"
					? [
							bunPluginIstanbul({
								filter: /\.tsx$/,
								loader: "tsx",
								name: "istanbul-loader-tsx",
							}),
							bunPluginIstanbul({
								filter: /\.jsx$/,
								loader: "jsx",
								name: "istanbul-loader-jsx",
							}),
					  ]
					: []),
			],
			define: Object.fromEntries(
				Object.entries(process.env)
					.filter(([key]) => /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)) // Only valid JS identifiers
					.map(([key, value]) => [
						`process.env.${key}`,
						JSON.stringify(value?.replace(/\\/g, "\\\\")), // Escape backslashes
					])
			),
		});

		if (!buildResult.success) {
			console.error("Build failed:", buildResult.logs);
			throw new Error("Build process failed.");
		}

		const buildEnd = performance.now();

		console.log("Builder completed.");
		console.log(`Build time: ${buildEnd - buildStart} ms.`);

		console.log(`Build size: ${await getFolderSize(BUILD_DIR_PATH)} bytes.`);
	}

	if (build === 0) {
		build = 1;
		return runBuild(); // Return the promise
	}
	return Promise.resolve(); // Prevent redundant builds
}

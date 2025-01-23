import path from "path";
import { statSync } from "fs";
import { startBuilder } from "./builder";
import { BUILD_DIR, PUBLIC_DIR } from "./constants";

const PORT = process.env.PORT || 3001;

function serveFromDir(config: {
	directory: string;
	path: string;
}): Response | null {
	const basePath = path.join(config.directory, config.path);
	const suffixes = ["", ".html", "index.html"];

	for (const suffix of suffixes) {
		try {
			const pathWithSuffix = path.join(basePath, suffix);
			const stat = statSync(pathWithSuffix);
			if (stat && stat.isFile()) {
				return new Response(Bun.file(pathWithSuffix));
			}
		} catch (err) {
			// Ignored
		}
	}

	return null;
}

async function startServer() {
	const server = Bun.serve({
		port: PORT,
		async fetch(req) {
			const reqPath = new URL(req.url).pathname;

			// check public
			const publicResponse = serveFromDir({
				directory: PUBLIC_DIR,
				path: reqPath,
			});
			if (publicResponse) return publicResponse;

			// Serve built assets from BUILD_DIR
			const buildResponse = serveFromDir({
				directory: BUILD_DIR,
				path: reqPath,
			});
			if (buildResponse) return buildResponse;

			// Serve index.html for SPA fallback
			const indexResponse = serveFromDir({
				directory: PUBLIC_DIR,
				path: "/index.html",
			});
			if (indexResponse) return indexResponse;

			return new Response("Something went wrong!", { status: 404 });
		},
	});

	return server;
}

async function startApp() {
	try {
		await startBuilder({ BUILD_DIR_PATH: BUILD_DIR });
	} catch (err) {
		console.error("Builder failed:", err);
		process.exit(1); // Exit if the build fails
	}

	const server = await startServer();

	// Log the final message after everything is ready
	console.log(`App is running on ${server.url}`);
}

startApp().catch((err) => {
	console.error("Failed to start the app:", err);
});

import fs from "fs";

export function getFolderSize(folderPath: string) {
	let totalSize = 0;
	const files = fs.readdirSync(folderPath);

	for (const file of files) {
		const filePath = `${folderPath}/${file}`;
		const stats = fs.statSync(filePath);

		if (stats.isDirectory()) {
			totalSize += getFolderSize(filePath);
		} else {
			totalSize += stats.size;
		}
	}

	return totalSize;
}

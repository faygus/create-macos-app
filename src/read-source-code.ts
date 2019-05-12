import { IConfig } from "./config";
import * as fs from "fs";

export function readSourceCode(filePath: string): string {
	if (!fs.existsSync(filePath)) {
		console.error('the source code file ' + filePath + ' doesn\'t exist');
		process.exit(1);
	}
	const fileContent = fs.readFileSync(filePath, 'utf8');
	return fileContent;
}

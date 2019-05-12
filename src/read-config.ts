import { IConfig } from "./config";
import * as fs from "fs";

export function readConfig(filePath: string): IConfig {
	if (!fs.existsSync(filePath)) {
		console.error('the config file ' + filePath + ' doesn\'t exist');
		process.exit(1);
	}
	const fileContent = fs.readFileSync(filePath, 'utf8');
	const json = JSON.parse(fileContent);
	return json;
}

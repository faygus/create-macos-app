import * as fs from "fs";
import * as path from "path";
import { IConfig } from "./config";

export function generateCode(config: IConfig, sourceCode: string): void {
	const outputPath = config.outputDir;
	const productName = config.projectConfig.productName;
	const appDelegateFilePath = path.join(outputPath, productName, productName, 'AppDelegate.swift');
	fs.writeFileSync(appDelegateFilePath, sourceCode);
}

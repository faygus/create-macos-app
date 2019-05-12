import * as fs from "fs";
import * as path from "path";
import { IConfig } from "./config";
import { getDate, getYear } from "./utils";

export function generateCode(config: IConfig, sourceCode: string): void {
	const outputPath = config.outputDir;
	const productName = config.projectConfig.productName;
	const appDelegateFilePath = path.join(outputPath, productName, productName, 'AppDelegate.swift');
	const header = getHeader(config);
	sourceCode = header + sourceCode;
	fs.writeFileSync(appDelegateFilePath, sourceCode);
}

function getHeader(config: IConfig): string {
	let header = `//
//  AppDelegate.swift
//  {{productName}}
//
//  Created by {{userAlias}} on {{dd/mm/yyyy}}.
//  Copyright © {{yyyy}} {{organizationName}}. All rights reserved.
//

`;
	const valuesToReplace = [
		{
			default: 'productName',
			current: config.projectConfig.productName
		},
		{
			default: 'userAlias',
			current: 'azog'
		},
		{
			default: 'dd/mm/yyyy',
			current: getDate()
		},
		{
			default: 'yyyy',
			current: getYear()
		},
		{
			default: 'organizationName',
			current: config.projectConfig.organizationName
		}
	]
	for (const value of valuesToReplace) {
		const regex = new RegExp(`{{${value.default}}}`, 'g');
		header = header.replace(regex, value.current);
	}
	return header;
}

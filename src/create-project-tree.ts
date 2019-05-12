import * as fs from "fs";
import * as fsExtra from "fs-extra";
import * as path from "path";
import { IConfig } from "./config";

// Informations about the project template
const sourcePath = path.join(__dirname, '..', '.project-template');
const defaultProductName = 'lllllproductNamelllll';
const defaultOrganizationName = 'lllllorganizationNamelllll';
const defaultOrganizationIdentifier = 'lllllorganizationIdentifierlllll';

export function createProject(config: IConfig): void {
	const { projectConfig, outputDir } = config;
	const { productName, organizationName, organizationIdentifier } = projectConfig;
	const userAlias = 'azog';

	if (fs.existsSync(outputDir)) {
		fsExtra.removeSync(outputDir);
	}
	fs.mkdirSync(outputDir);
	const outputFullPath = path.join(process.cwd(), outputDir);
	fsExtra.copySync(sourcePath, outputFullPath);

	const projectValues: { [key: string]: { default: string, current: string } } = {
		productName: {
			default: defaultProductName,
			current: productName
		},
		organizationName: {
			default: defaultOrganizationName,
			current: organizationName
		},
		organizationIdentifier: {
			default: defaultOrganizationIdentifier,
			current: organizationIdentifier
		},
	};

	const projectPath = path.join(outputDir, defaultProductName);
	analyseFile(projectPath);

	/**
	 * rename the file if it contains a symbole to replace ($productName$)
	 */
	function analyseFile(filePath: string): void {
		const fileName = path.basename(filePath);
		const newFileName = correctFileName(fileName);
		if (newFileName !== fileName) {
			const dirName = path.dirname(filePath);
			const newFilePath = path.join(dirName, newFileName);
			fs.renameSync(filePath, newFilePath);
			filePath = newFilePath;
		}
		if (fs.lstatSync(filePath).isDirectory()) {
			fs.readdirSync(filePath).forEach(entry => {
				const entryPath = path.join(filePath, entry);
				analyseFile(entryPath);
			});
		} else {
			replaceInFile(filePath);
		}
	}

	function correctFileName(fileName: string): string {
		let res = fileName;
		for (const key in projectValues) {
			const value = projectValues[key];
			if (fileName.includes(value.default)) {
				res = res.replace(value.default, value.current);
			}
		}
		return res;
	}

	function replaceInFile(filePath: string): void {
		const content = fs.readFileSync(filePath, 'utf8');
		let newContent = content;
		const currentDate = new Date();
		const day = ((currentDate.getDate() < 10) ? '0' : '') + currentDate.getDate();
		const year = currentDate.getFullYear();
		const month = (((currentDate.getMonth() + 1) < 10) ? '0' : '') + (currentDate.getMonth() + 1);
		var dateString = day + '/' + month + '/' + year;
		const toReplace = {
			date: {
				default: 'Created by J-S Durier on 11/05/2019.',
				current: `Created by ${userAlias} on ${dateString}.`
			}
		}
		const map: { [key: string]: { default: string, current: string } } = {
			...projectValues,
			...toReplace
		};
		for (const key in map) {
			const value = map[key];
			const regex = new RegExp(`${value.default}`, 'g');
			newContent = newContent.replace(regex, value.current);
		}
		fs.writeFileSync(filePath, newContent, 'utf8');
	}
}

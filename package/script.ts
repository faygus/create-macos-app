import * as fs from "fs";
import * as fsExtra from "fs-extra";
import * as path from "path";

const distPath = 'dist';
if (!fs.existsSync(distPath)) {
	console.error('no dist directory generated');
	process.exit(1);
}
const binPath = path.join(distPath, 'bin');
const packageJSONFileName = 'package.json';
fs.copyFileSync(path.join(__dirname, 'files', packageJSONFileName), path.join(distPath, packageJSONFileName));
if (!fs.existsSync(binPath)) {
	fs.mkdirSync(binPath);
}
const binFileName = 'azog-macos';
fs.copyFileSync(path.join(__dirname, 'files', binFileName), path.join(binPath, binFileName));

// copy .project-template
fsExtra.copySync('.project-template', path.join('dist', '.project-template'));

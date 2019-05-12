export function processArgs(): { configFilePath: string, sourceCodeFilePath: string } {
	var args = process.argv.slice(2);
	if (args.length < 2) {
		console.error('two arguments required');
		console.error(usageMessage);
		process.exit(1);
	}
	return {
		configFilePath: args[0],
		sourceCodeFilePath: args[1]
	}
}

const binaryName = 'azog-macos';
const usageMessage = `usage:
${binaryName} configFilePath sourceCodeFilePath`;
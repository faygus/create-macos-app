import { createProject } from "./create-project-tree";
import { generateCode } from "./generate-code";
import { readConfig } from "./read-config";
import { readSourceCode } from "./read-source-code";
import { processArgs } from "./process-args";

const { configFilePath, sourceCodeFilePath } = processArgs();
const config = readConfig(configFilePath);
const sourceCode = readSourceCode(sourceCodeFilePath);
createProject(config);
generateCode(config, sourceCode);

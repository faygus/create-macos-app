#README#

## Description
This project provides a binary 'azog-macos' which is able to create a macOS app from a source code.
You can configure the name of the project, and the organization in a config file you give on the command line.

## Usage
The binary of this package 'azog-macos' should be used like this :

```
azog-macos config.json source-code.txt
```

The config.json file should look like this :

```
{
	"projectConfig": {
		"productName": "myAwesomeProject",
		"organizationName": "myAwesomeOrganization",
		"organizationIdentifier": "myAwesomeOrganizationId"
	},
	"outputDir": "output" // folder where the xcode app will be ouput
}
```

The source-code.txt file is the source code that will be copied in the xcode project

You can see examples in the 'example' folder

Run 'npm start' to see the result of the build in the 'output' folder.
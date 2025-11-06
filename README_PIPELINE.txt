# Jenkins Pipeline for Bookly PWA

## Requirements
- Jenkins with JDK 17
- NodeJS plugin (configured as NodeJS_18)
- Chrome & ChromeDriver installed on Jenkins agent
- npm packages: `htmlhint`, `lighthouse`, `selenium-webdriver`, `mocha`

## Run Instructions
1. Place this folder in your Git or local Jenkins workspace.
2. Create a Jenkins Pipeline job pointing to this folder.
3. The pipeline performs:
   - Code checkout
   - HTMLHint and Lighthouse analysis
   - Build packaging
   - Functional Selenium test (`test/bookly.test.js`)
   - Archive of dist/ folder

Artifacts and reports will appear in Jenkins after build.

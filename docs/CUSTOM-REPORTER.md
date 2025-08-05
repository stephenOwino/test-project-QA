📘 Playwright Custom Reporter Setup
📁 Overview
This guide walks you through setting up a custom reporter in Playwright using TypeScript and Winston for logging.

🗂️ Project Structure

e2e/
├── reporters/
│   ├── custom-reporter.ts       # TypeScript custom reporter
│   └── dist/
│       └── custom-reporter.js   # Compiled JS output
├── tests/
├── playwright.config.ts
└── .env
🧱 Custom Reporter Logic
Implemented in reporters/custom-reporter.ts

Logs test events (onTestBegin, onTestEnd, etc.)

Uses Winston for structured logging

📦 Installation
Install winston if not already installed:

npm install winston
If you're using Yarn:

yarn add winston
⚙️ Compiling TypeScript to JavaScript
Playwright can only load .js files as reporters.

Compile your reporter with:

# From within the 'e2e/' folder
npx tsc reporters/custom-reporter.ts --outDir reporters/dist
This will generate reporters/dist/custom-reporter.js.

🧩 Update playwright.config.ts
Update your reporter config:

reporter: [
  ['html', { open: process.env.CI ? 'never' : 'on-failure' }],
  ['./reporters/dist/custom-reporter.js']  // compiled JS reporter
],
Note: Do not point to the .ts file. Playwright needs .js.

🌱 Environment Setup
If you're using .env variables and dotenvx, load them at the top of your config file:


import dotenvx from "@dotenvx/dotenvx";
dotenvx.config({ path: `${__dirname}/.env` });
🚀 Running Tests
Compile the reporter:


npx tsc reporters/custom-reporter.ts --outDir reporters/dist
Run the tests:

npx playwright test
Logs will be saved to:

Console output (JSON format)

logs/test-info.log (via Winston)

🧯 Troubleshooting
Problem	Solution
Cannot find module './reporters/...ts'	Compile your .ts reporter to .js, and use the .js path in the config
TS6053 File not found	Check your working directory and path. Run from inside the e2e folder
Winston logs not showing	Make sure winston is installed and the logger is being triggered
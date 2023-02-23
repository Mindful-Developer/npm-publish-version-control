// This file will sync the version in package.json with the version in npm.
// Usage: node sync.js

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Get the package.json
const packageJsonPath = path.join(process.cwd(), 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

if (!packageJson) {
  console.error('package.json not found. Are you in the root directory?');
  process.exit(1);
}

// Get the current version from npm
let currentVersion = '0.0.1';
try {
  currentVersion = execSync(`npm view ${packageJson.name} version`, { stdio: 'pipe' }).toString().trim();
} catch (e) {
  console.warn(`Unable to get current version from npm. Using ${currentVersion}`);
}

// Update the version in the package.json
console.log(`Updating package.json version from ${packageJson.version} to ${currentVersion}`);
packageJson.version = currentVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log('Done!');
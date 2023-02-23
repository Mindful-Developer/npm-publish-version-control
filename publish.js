// This script is used to update the version in the package.json and publish the package to npm
// Usage: node publish.js [1|2|3] // 1: patch | 2: minor | 3: major
// Example: node publish.js 2
// If no argument is passed, the patch version will be incremented

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
let currentVersion = '0.0.0';
try {
  currentVersion = execSync(`npm view ${packageJson.name} version`, { stdio: 'pipe' }).toString().trim();
} catch (e) {
  console.warn(`Unable to get current version from npm. Have you published this package yet?`);
}

let major = currentVersion.split('.')[0];
let minor = currentVersion.split('.')[1];
let patch = currentVersion.split('.')[2];

// Increment the version based on the argument passed
switch (process.argv[2]) {
  case '2' || 'minor':
    minor++;
    patch = 0;
    break;

  case '3' || 'major':
    major++;
    minor = 0;
    patch = 0;
    break;

  default:
    patch++;
    break;
}
const version = `${major}.${minor}.${patch}`;

// Update the version in the package.json
if (currentVersion === '0.0.0') {
  console.log(`Setting version to ${version}`);
} else {
  console.log(`Updating version from ${currentVersion} to ${version}`);
}
packageJson.version = version;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

// Publish the package to npm
console.log('Publishing package to npm');
execSync('npm publish', { stdio: 'inherit' });
console.log('Done!');

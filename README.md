# npm-publish-version-control

This is a simple script that will help you to update or sync the version of your package.json file before publishing it to npm.
## Installation

```bash
npm install -g npm-publish-version-control
# or
yarn global add npm-publish-version-control
```

## Usage
You should be in the root directory when using these scripts.
```bash
node sync.js  # sync package.json version with current npm version
```

```bash
node publish.js        # patch update (1.0.0 -> 1.0.1)
node publish.js minor  # minor update (1.0.0 -> 1.1.0)
node publish.js major  # major update (1.0.0 -> 2.0.0)
```

or

```bash
node publish.js    # patch update (1.0.0 -> 1.0.1)
node publish.js 2  # minor update (1.0.0 -> 1.1.0)
node publish.js 3  # major update (1.0.0 -> 2.0.0)
```

## License
GNU General Public License v3.0

## Author
[Christopher James](https://github.com/gamingbuddhist)
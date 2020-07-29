// @ts-check

const path = require('path');

/** @type { import('./types/metro/metro-config').MetroConfig.InputConfigT } */
const config = {
    // https://github.com/facebook/metro/blob/38fa02d88fd66c150359c46ba0b5bb0eb536bbac/packages/metro-config/src/defaults/index.js#L127
    projectRoot: path.join(__dirname, '..', '..'),
    transformer: {
        getTransformOptions: async (entryPoints, options, getDependenciesOf) => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: false,
            },
        }),
    },
    watchFolders: [
        // Make sure metro also watches <WORKSPACE_ROOT>/node_modules
        path.join(__dirname, '..', '..', 'node_modules'),
        path.join(__dirname, '..', '..', 'libs'),
    ],
};

module.exports = config;

// @ts-check

/** @type { import('./types/metro/metro-config').MetroConfig.InputConfigT } */
const config = {
    transformer: {
        getTransformOptions: async (entryPoints, options, getDependenciesOf) => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: false,
            },
        }),
    },
};

module.exports = config;

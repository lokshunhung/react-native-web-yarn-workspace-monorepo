// @ts-check

const fs = require('fs');
const path = require('path');

const shouldWriteConfig = process.env.WRITE_CONFIG === 'true';

/** @type { (name: string) => string } */
const makeFilePath = (name) => path.join(__dirname, `${name}-${(Date.now() / 1000) | 0}.txt`);

/** @type { (config: object) => string } */
const makeFileContent = (config) =>
    JSON.stringify(config, (_, value) => (value instanceof RegExp ? value.toString() : value), 4);

/** @type { (name: string, config: object) => void } */
const writeConfigSync = (name, config) =>
    fs.writeFileSync(makeFilePath(name), makeFileContent(config), { encoding: 'utf8' });

/**
 * @param   { import('webpack').Configuration } config
 * @param   { object } env
 * @returns { import('webpack').Configuration }
 */
exports.webpack = (config, env) => {
    shouldWriteConfig && writeConfigSync('config-webpack', config);

    const corePackagePath = path.join(__dirname, '..', '..', 'libs', 'core');

    // ESLint
    const eslintRule = config.module.rules[1];
    if (!`${eslintRule.use[0].loader}`.includes(path.sep + 'eslint-loader' + path.sep)) {
        throw new Error('[config-overrides] webpack(): Cannot find ESLint Loader');
    }
    eslintRule.include = [eslintRule.include, corePackagePath];

    // Babel
    const babelRule = config.module.rules[2].oneOf[1];
    if (!`${babelRule.loader}`.includes(path.sep + 'babel-loader' + path.sep)) {
        throw new Error('[config-overrides] webpack(): Cannot find Babel Loader');
    }
    babelRule.include = [babelRule.include, corePackagePath];

    return config;
};

/**
 * @param   { import('@jest/types').Config.InitialOptionsWithRootDir } config
 * @returns { import('@jest/types').Config.InitialOptionsWithRootDir }
 */
exports.jest = (config) => {
    shouldWriteConfig && writeConfigSync('config-jest', config);
    return config;
};

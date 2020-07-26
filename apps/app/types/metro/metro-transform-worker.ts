import { Metro } from './metro';
import { MetroSourceMap } from './metro-source-map';

export namespace MetroTransformWorker {
    type MinifierConfig = Readonly<
        {
            [_: string]: any;
        } & Record<string, unknown>
    >;

    export type MinifierOptions = {
        code: string;
        map: MetroSourceMap.BasicSourceMap | null | undefined;
        filename: string;
        reserved: ReadonlyArray<string>;
        config: MinifierConfig;
    } & Record<string, unknown>;

    export type MinifierResult = {
        code: string;
        map?: MetroSourceMap.BasicSourceMap;
    } & Record<string, unknown>;

    export type Minifier = (_: MinifierOptions) => MinifierResult;

    export type Type = 'script' | 'module' | 'asset';

    export type JsTransformerConfig = Readonly<{
        assetPlugins: ReadonlyArray<string>;
        assetRegistryPath: string;
        asyncRequireModulePath: string;
        babelTransformerPath: string;
        dynamicDepsInPackages: Metro.ModuleGraph.Worker.DynamicRequiresBehavior;
        enableBabelRCLookup: boolean;
        enableBabelRuntime: boolean;
        experimentalImportBundleSupport: boolean;
        minifierConfig: MinifierConfig;
        minifierPath: string;
        optimizationSizeLimit: number;
        publicPath: string;
        allowOptionalDependencies: Metro.DeltaBundler.AllowOptionalDependencies;
    }>;
}

import type { IncomingMessage, ServerResponse } from 'http';
import { T$Shape } from '../ts-flow/shape';
import { Metro } from './metro';
import { MetroCache } from './metro-cache';
import { MetroResolver } from './metro-resolver';
import { MetroSourceMap } from './metro-source-map';
import { MetroTransformWorker } from './metro-transform-worker';

export namespace MetroConfig {
    export type PostMinifyProcess = (
        _: {
            code: string;
            map: MetroSourceMap.BasicSourceMap | null | undefined;
        } & Record<string, unknown>,
    ) => {
        code: string;
        map: MetroSourceMap.BasicSourceMap | null | undefined;
    } & Record<string, unknown>;

    export type PostProcessBundleSourcemap = (
        _: {
            code: Buffer | string;
            map: MetroSourceMap.MixedSourceMap;
            outFileName: string;
        } & Record<string, unknown>,
    ) => {
        code: Buffer | string;
        map: MetroSourceMap.MixedSourceMap | string;
    } & Record<string, unknown>;

    type ExtraTransformOptions = {
        readonly preloadedModules: ({ [path: string]: true } & Record<string, unknown>) | false;
        readonly ramGroups: Array<string>;
        readonly transform: {
            readonly experimentalImportSupport: boolean;
            readonly inlineRequires:
                | ({ readonly blacklist: { [_: string]: true } & Record<string, unknown> } & Record<string, unknown>)
                | boolean;
            readonly nonInlinedRequires?: ReadonlyArray<string>;
            readonly unstable_disableES6Transforms?: boolean;
        };
    } & Record<string, unknown>;

    export type GetTransformOptionsOpts = {
        dev: boolean;
        hot: boolean;
        platform: string | null | undefined;
    };

    export type GetTransformOptions = (
        entryPoints: ReadonlyArray<string>,
        options: GetTransformOptionsOpts,
        getDependenciesOf: (_: string) => Promise<Array<string>>,
    ) => Promise<ExtraTransformOptions>;

    export type Middleware = (_: IncomingMessage, __: ServerResponse, ___: (e: Error | null | undefined) => any) => any;

    export type ResolverConfigT = {
        assetExts: ReadonlyArray<string>;
        assetResolutions: ReadonlyArray<string>;
        blacklistRE?: RegExp | Array<RegExp>;
        blockList: RegExp | Array<RegExp>;
        dependencyExtractor: string | null | undefined;
        extraNodeModules: { [name: string]: string } & Record<string, unknown>;
        hasteImplModulePath: string | null | undefined;
        platforms: ReadonlyArray<string>;
        resolverMainFields: ReadonlyArray<string>;
        resolveRequest: MetroResolver.CustomResolver | null | undefined;
        sourceExts: ReadonlyArray<string>;
        useWatchman: boolean;
    };

    export type SerializerConfigT = {
        createModuleIdFactory: () => (path: string) => number;
        customSerializer:
            | ((
                  entryPoint: string,
                  preModules: ReadonlyArray<Metro.DeltaBundler.Module>,
                  graph: Metro.DeltaBundler.Graph,
                  options: Metro.DeltaBundler.SerializerOptions,
              ) => Promise<string | { code: string; map: string }>)
            | null
            | undefined;
        experimentalSerializerHook: (graph: Metro.DeltaBundler.Graph, delta: Metro.DeltaBundler.DeltaResult) => any;
        getModulesRunBeforeMainModule: (entryFilePath: string) => Array<string>;
        getPolyfills: (_: { platform: string | null | undefined } & Record<string, unknown>) => ReadonlyArray<string>;
        getRunModuleStatement: (_: number | string) => string;
        polyfillModuleNames: ReadonlyArray<string>;
        postProcessBundleSourcemap: PostProcessBundleSourcemap;
        processModuleFilter: (modules: Metro.DeltaBundler.Module) => boolean;
    };

    export type TransformerConfigT = MetroTransformWorker.JsTransformerConfig & {
        getTransformOptions: GetTransformOptions;
        postMinifyProcess: PostMinifyProcess;
        transformVariants: Metro.ModuleGraph.TransformVariants;
        workerPath: string;
        publicPath: string;
        experimentalImportBundleSupport: boolean;
    };

    export type MetalConfigT = {
        cacheStores: ReadonlyArray<MetroCache.CacheStore<Metro.DeltaBundler.TransformResult>>;
        cacheVersion: string;
        hasteMapCacheDirectory?: string;
        maxWorkers: number;
        projectRoot: string;
        stickyWorkers: boolean;
        transformerPath: string;
        reporter: Metro.Reporting.Reporter;
        resetCache: boolean;
        watchFolders: ReadonlyArray<string>;
    };

    export type ServerConfigT = {
        enhanceMiddleware: (_: Middleware, __: Metro.Server.Server) => Middleware;
        useGlobalHotkey: boolean;
        port: number;
        rewriteRequestUrl: (_: string) => string;
        runInspectorProxy: boolean;
        verifyConnections: boolean;
    };

    type SymbolicatorConfigT = {
        customizeFrame: (
            _: {
                readonly file: string | null | undefined;
                readonly lineNumber: number | null | undefined;
                readonly column: number | null | undefined;
                readonly methodName: string | null | undefined;
            } & Record<string, unknown>,
        ) =>
            | { readonly collapse?: boolean }
            | null
            | undefined
            | Promise<{ readonly collapse?: boolean } | null | undefined>;
    };

    export type InputConfigT = T$Shape<
        MetalConfigT &
            Readonly<{
                cacheStores:
                    | ReadonlyArray<MetroCache.CacheStore<Metro.DeltaBundler.TransformResult>>
                    | ((
                          _: MetroCache.MetroCache,
                      ) => ReadonlyArray<MetroCache.CacheStore<Metro.DeltaBundler.TransformResult>>);
                resolver: T$Shape<ResolverConfigT>;
                server: T$Shape<ServerConfigT>;
                serializer: T$Shape<SerializerConfigT>;
                symbolicator: T$Shape<SymbolicatorConfigT>;
                transformer: T$Shape<TransformerConfigT>;
            }>
    >;

    export type IntermediateConfigT = MetalConfigT & {
        resolver: ResolverConfigT;
        server: ServerConfigT;
        serializer: SerializerConfigT;
        symbolicator: SymbolicatorConfigT;
        transformer: TransformerConfigT;
    };

    export type ConfigT = Readonly<MetalConfigT> &
        Readonly<{
            resolver: Readonly<ResolverConfigT>;
            server: Readonly<ServerConfigT>;
            serializer: Readonly<SerializerConfigT>;
            symbolicator: Readonly<SymbolicatorConfigT>;
            transformer: Readonly<TransformerConfigT>;
        }>;

    export type YargArguments = {
        'config'?: string;
        'cwd'?: string;
        'port'?: string | number;
        'host'?: string;
        'projectRoot'?: string;
        'watchFolders'?: Array<string>;
        'assetExts'?: Array<string>;
        'sourceExts'?: Array<string>;
        'platforms'?: Array<string>;
        'max-workers'?: string | number;
        'maxWorkers'?: string | number;
        'transformer'?: string;
        'reset-cache'?: boolean;
        'resetCache'?: boolean;
        'runInspectorProxy'?: boolean;
        'verbose'?: boolean;
    } & Record<string, unknown>;
}

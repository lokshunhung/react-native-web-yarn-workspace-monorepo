import { BabelSourceLocation } from './babel';

export namespace Metro {
    export namespace DeltaBundler {
        export type MixedOutput = {
            readonly data: any;
            readonly type: string;
        };

        export type AsyncDependencyType = 'async' | 'prefetch';

        export type TransformResultDependency = {
            /**
             * The literal name provided to a require or import call. For example 'foo' in
             * case of `require('foo')`.
             */
            readonly name: string;

            /**
             * Extra data returned by the dependency extractor. Whatever is added here is
             * blindly piped by Metro to the serializers.
             */
            readonly data: {
                /**
                 * If not null, this dependency is due to a dynamic `import()` or `__prefetchImport()` call.
                 */
                readonly asyncType: AsyncDependencyType | null;

                /**
                 * The condition for splitting on this dependency edge.
                 */
                readonly splitCondition?: {
                    readonly mobileConfigName: string;
                };

                /**
                 * The dependency is enclosed in a try/catch block.
                 */
                readonly isOptional?: boolean;

                readonly locs: ReadonlyArray<BabelSourceLocation>;
            };
        };

        export type Dependency = {
            readonly absolutePath: string;
            readonly data: TransformResultDependency;
        };

        export type Module<T = MixedOutput> = {
            readonly dependencies: Map<string, Dependency>;
            readonly inverseDependencies: Set<string>;
            readonly output: ReadonlyArray<T>;
            readonly path: string;
            readonly getSource: () => Buffer;
        };

        export type Dependencies<T = MixedOutput> = Map<string, Module<T>>;

        export type Graph<T = MixedOutput> = {
            dependencies: Dependencies<T>;
            importBundleNames: Set<string>;
            readonly entryPoints: ReadonlyArray<string>;
        };

        export type TransformResult<T = MixedOutput> = Readonly<{
            dependencies: ReadonlyArray<TransformResultDependency>;
            output: ReadonlyArray<T>;
        }>;

        export type TransformResultWithSource<T = MixedOutput> = Readonly<TransformResult<T>> &
            Readonly<{
                getSource: () => Buffer;
            }>;

        export type TransformFn<T = MixedOutput> = (_: string) => Promise<TransformResultWithSource<T>>;

        export type AllowOptionalDependenciesWithOptions = {
            readonly exclude: Array<string>;
        };

        export type AllowOptionalDependencies = boolean | AllowOptionalDependenciesWithOptions;

        export type Options<T = MixedOutput> = {
            readonly resolve: (from: string, to: string) => string;
            readonly transform: TransformFn<T>;
            readonly onProgress: ((numProcessed: number, total: number) => any) | null | undefined;
            readonly experimentalImportBundleSupport: boolean;
            readonly shallow: boolean;
        };

        export type DeltaResult<T = MixedOutput> = {
            readonly added: Map<string, Module<T>>;
            readonly modified: Map<string, Module<T>>;
            readonly deleted: Set<string>;
            readonly reset: boolean;
        };

        export type SerializerOptions = {
            readonly asyncRequireModulePath: string;
            readonly createModuleId: (_: string) => number;
            readonly dev: boolean;
            readonly getRunModuleStatement: (_: number | string) => string;
            readonly inlineSourceMap: boolean | null | undefined;
            readonly modulesOnly: boolean;
            readonly processModuleFilter: (module: Module) => boolean;
            readonly projectRoot: string;
            readonly runBeforeMainModule: ReadonlyArray<string>;
            readonly runModule: boolean;
            readonly sourceMapUrl: string | null | undefined;
            readonly sourceUrl: string | null | undefined;
        };
    }

    export namespace Reporting {
        export type GlobalCacheDisabledReason = 'too_many_errors' | 'too_many_misses';

        export type BundleDetails = {
            bundleType: string;
            dev: boolean;
            entryFile: string;
            minify: boolean;
            platform: string | null | undefined;
            runtimeBytecodeVersion: number | null | undefined;
        } & Record<string, unknown>;

        /**
         * A tagged union of all the actions that may happen and we may want to
         * report to the tool user.
         */
        export type ReportableEvent =
            | ({
                  port: number;
                  hasReducedPerformance: boolean;
                  type: 'initialize_started';
              } & Record<string, unknown>)
            | ({
                  type: 'initialize_failed';
                  port: number;
                  error: Error;
              } & Record<string, unknown>)
            | ({
                  buildID: string;
                  type: 'bundle_build_done';
              } & Record<string, unknown>)
            | ({
                  buildID: string;
                  type: 'bundle_build_failed';
              } & Record<string, unknown>)
            | ({
                  buildID: string;
                  bundleDetails: BundleDetails;
                  type: 'bundle_build_started';
              } & Record<string, unknown>)
            | ({
                  error: Error;
                  type: 'bundling_error';
              } & Record<string, unknown>)
            | ({
                  type: 'dep_graph_loading';
                  hasReducedPerformance: boolean;
              } & Record<string, unknown>)
            | ({
                  type: 'dep_graph_loaded';
              } & Record<string, unknown>)
            | ({
                  buildID: string;
                  type: 'bundle_transform_progressed';
                  transformedFileCount: number;
                  totalFileCount: number;
              } & Record<string, unknown>)
            | ({
                  type: 'global_cache_error';
                  error: Error;
              } & Record<string, unknown>)
            | ({
                  type: 'global_cache_disabled';
                  reason: GlobalCacheDisabledReason;
              } & Record<string, unknown>)
            | ({
                  type: 'transform_cache_reset';
              } & Record<string, unknown>)
            | ({
                  type: 'worker_stdout_chunk';
                  chunk: string;
              } & Record<string, unknown>)
            | ({
                  type: 'worker_stderr_chunk';
                  chunk: string;
              } & Record<string, unknown>)
            | ({
                  type: 'hmr_client_error';
                  error: Error;
              } & Record<string, unknown>)
            | ({
                  type: 'client_log';
                  level: 'trace' | 'info' | 'warn' | 'log' | 'group' | 'groupCollapsed' | 'groupEnd' | 'debug';
                  data: Array<any>;
              } & Record<string, unknown>);

        /**
         * Code across the application takes a reporter as an option and calls the
         * update whenever one of the ReportableEvent happens. Code does not directly
         * write to the standard output, because a build would be:
         *
         *   1. ad-hoc, embedded into another tool, in which case we do not want to
         *   pollute that tool's own output. The tool is free to present the
         *   warnings/progress we generate any way they want, by specifing a custom
         *   reporter.
         *   2. run as a background process from another tool, in which case we want
         *   to expose updates in a way that is easily machine-readable, for example
         *   a JSON-stream. We don't want to pollute it with textual messages.
         *
         * We centralize terminal reporting into a single place because we want the
         * output to be robust and consistent. The most common reporter is
         * TerminalReporter, that should be the only place in the application should
         * access the `terminal` module (nor the `console`).
         */
        export type Reporter = { update: (event: ReportableEvent) => void } & Record<string, unknown>;
    }

    export namespace Server {
        export type Server = any; // I give up
    }

    export namespace ModuleGraph {
        export type TransformVariants = {
            readonly [name: string]: Record<string, unknown>;
        } & Record<string, unknown>;

        export namespace Worker {
            export type DynamicRequiresBehavior = 'throwAtRuntime' | 'reject';
        }
    }
}

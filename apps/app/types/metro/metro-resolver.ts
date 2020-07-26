export namespace MetroResolver {
    export type Resolution = FileResolution | { readonly type: 'empty' };

    export type AssetFileResolution = ReadonlyArray<string>;
    export type FileResolution =
        | { readonly type: 'sourceFile'; readonly filePath: string }
        | { readonly type: 'assetFiles'; readonly filePaths: AssetFileResolution };

    /**
     * Check existence of a single file.
     */
    export type DoesFileExist = (filePath: string) => boolean;
    export type IsAssetFile = (fileName: string) => boolean;

    export type ResolveAsset = (
        dirPath: string,
        assetName: string,
        extension: string,
    ) => ReadonlyArray<string> | null | undefined;

    export type FileContext = {
        readonly doesFileExist: DoesFileExist;
        readonly isAssetFile: IsAssetFile;
        readonly preferNativePlatform: boolean;
        readonly redirectModulePath: (modulePath: string) => string | false;
        readonly resolveAsset: ResolveAsset;
        readonly sourceExts: ReadonlyArray<string>;
    } & Record<string, unknown>;

    export type FileOrDirContext = FileContext & {
        /**
         * This should return the path of the "main" module of the specified
         * `package.json` file, after post-processing: for example, applying the
         * 'browser' field if necessary.
         *
         * FIXME: move the post-processing here. Right now it is
         * located in `node-haste/Package.js`, and fully duplicated in
         * `ModuleGraph/node-haste/Package.js` (!)
         */
        readonly getPackageMainPath: (packageJsonPath: string) => string;
    } & Record<string, unknown>;

    export type HasteContext = FileOrDirContext & {
        /**
         * Given a name, this should return the full path to the file that provides
         * a Haste module of that name. Ex. for `Foo` it may return `/smth/Foo.js`.
         */
        readonly resolveHasteModule: (name: string) => string | null | undefined;
        /**
         * Given a name, this should return the full path to the package manifest that
         * provides a Haste package of that name. Ex. for `Foo` it may return
         * `/smth/Foo/package.json`.
         */
        readonly resolveHastePackage: (name: string) => string | null | undefined;
    } & Record<string, unknown>;

    export type ModulePathContext = FileOrDirContext & {
        /**
         * Full path of the module that is requiring or importing the module to be
         * resolved.
         */
        readonly originModulePath: string;
    } & Record<string, unknown>;

    export type ResolutionContext = ModulePathContext &
        HasteContext & {
            allowHaste: boolean;
            extraNodeModules: ({ [_: string]: string } & Record<string, unknown>) | null | undefined;
            originModulePath: string;
            resolveRequest?: CustomResolver | null | undefined;
        } & Record<string, unknown>;

    export type CustomResolver = (
        context: ResolutionContext,
        moduleName: string,
        platform: string | null,
        ____: string | null,
    ) => Resolution;
}

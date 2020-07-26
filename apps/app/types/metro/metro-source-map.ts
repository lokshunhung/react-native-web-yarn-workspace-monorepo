export namespace MetroSourceMap {
    type GeneratedCodeMapping = [number, number];
    type SourceMapping = [number, number, number, number];
    type SourceMappingWithName = [number, number, number, number, string];

    export type MetroSourceMapSegmentTuple = SourceMappingWithName | SourceMapping | GeneratedCodeMapping;

    export type HermesFunctionOffsets = { [_: number]: ReadonlyArray<number> } & Record<string, unknown>;

    export type FBSourcesArray = ReadonlyArray<FBSourceMetadata | null | undefined>;
    export type FBSourceMetadata = [FBSourceFunctionMap | null | undefined];
    export type FBSourceFunctionMap = {
        readonly names: ReadonlyArray<string>;
        readonly mappings: string;
    };

    export type FBSegmentMap = { [id: string]: MixedSourceMap } & Record<string, unknown>;

    export type BasicSourceMap = {
        readonly file?: string;
        readonly mappings: string;
        readonly names: Array<string>;
        readonly sourceRoot?: string;
        readonly sources: Array<string>;
        readonly sourcesContent?: Array<string | null | undefined>;
        readonly version: number;
        readonly x_facebook_offsets?: Array<number>;
        readonly x_metro_module_paths?: Array<string>;
        readonly x_facebook_sources?: FBSourcesArray;
        readonly x_facebook_segments?: FBSegmentMap;
        readonly x_hermes_function_offsets?: HermesFunctionOffsets;
    };

    export type IndexMapSection = {
        map: IndexMap | BasicSourceMap;
        offset: {
            line: number;
            column: number;
        } & Record<string, unknown>;
    } & Record<string, unknown>;

    export type IndexMap = {
        readonly file?: string;
        readonly mappings?: void; // avoids SourceMap being a disjoint union
        readonly sourcesContent?: void;
        readonly sections: Array<IndexMapSection>;
        readonly version: number;
        readonly x_facebook_offsets?: Array<number>;
        readonly x_metro_module_paths?: Array<string>;
        readonly x_facebook_sources?: void;
        readonly x_facebook_segments?: FBSegmentMap;
        readonly x_hermes_function_offsets?: HermesFunctionOffsets;
    };

    export type MixedSourceMap = IndexMap | BasicSourceMap;
}

export type BabelSourceLocation = {
    readonly start: {
        readonly line: number;
        readonly column: number;
    };
    readonly end: {
        readonly line: number;
        readonly column: number;
    };
    readonly identifierName?: string;
};

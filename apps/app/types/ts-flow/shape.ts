// https://github.com/sindresorhus/type-fest

// prettier-ignore
type Primitive =
	| null
	| undefined
	| string
	| number
	| boolean
	| symbol
    | bigint;

// prettier-ignore
type PartialObjectDeep<ObjectType extends object> = {
    [KeyType in keyof ObjectType]?: PartialDeep<ObjectType[KeyType]>;
};

// prettier-ignore
type PartialDeep<T> =
T extends Primitive
    ? Partial<T>
: T extends (...args: infer A) => Promise<infer R>
    ? (...args: A) => Promise<PartialDeep<R>>
: T extends (...args: infer A) => infer R
    ? (...args: A) => PartialDeep<R>
: T extends object
    ? PartialObjectDeep<T>
    : unknown;

export type T$Shape<T> = PartialDeep<T>;

export function isObject(value: unknown): value is object {
	return !!value && value.constructor.name === 'Object';
}

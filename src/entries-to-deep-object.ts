// biome-ignore lint/suspicious/noExplicitAny: Just allow to return anything.
type InternalObejctType = Record<string, any>;

export const entriesToDeepObject = <T extends object>(
	input: [string, T][],
	separator = '.',
): InternalObejctType => {
	const output: InternalObejctType = {};

	for (const [name, value] of input) {
		const path = name.split(separator);

		path.reduce((acc: InternalObejctType, key: string, i: number) => {
			if (acc[key] === undefined) acc[key] = {};
			if (i === path.length - 1) acc[key] = value;
			return acc[key];
		}, output);
	}

	return output;
};

import type {
	DesignToken,
	DesignTokenValue,
	DesignTokensFormat,
} from './dtcg-types';
import { entriesToDeepObject } from './entries-to-deep-object';
import { defaultNameResolvers } from './name-resolvers';
import { resolveLocalVariableValue } from './resolve-local-variable-value';
import { resolveLocalVariableValueRecursive } from './resolve-local-variable-value-recursive';
import { defaultTypeResolvers } from './type-resolvers';
import type { VariablesToDTCGOptions } from './types';
import { defaultValueResolvers } from './value-resolvers';

export async function figvar2dtcg(
	collection: VariableCollection,
	modeName?: string | Partial<VariablesToDTCGOptions>,
	options: Partial<VariablesToDTCGOptions> = {},
): Promise<DesignTokensFormat> {
	const currentMode = collection.modes.find((mode) => mode.name === modeName);
	const defaultOptions: VariablesToDTCGOptions = {
		resolveAliases: true,
		deep: true,
		typeResolvers: defaultTypeResolvers,
		valueResolvers: defaultValueResolvers,
		nameResolvers: defaultNameResolvers,
	};

	const opts = Object.assign(defaultOptions, options);

	const output: [string, DesignToken][] = [];

	for (const variableId of collection.variableIds) {
		const currentVariable =
			await figma.variables.getVariableByIdAsync(variableId);
		if (!currentVariable) continue;

		// Resolve type of the variable
		let type = 'unknown';

		for (const [resolvedType, resolver] of Object.entries(opts.typeResolvers)) {
			const isType = await resolver(currentVariable);

			if (isType) {
				type = resolvedType;
				break;
			}
		}

		const variableValue: VariableValue = opts.resolveAliases
			? await resolveLocalVariableValueRecursive(
					currentVariable.id,
					currentMode?.modeId,
				)
			: await resolveLocalVariableValue(
					currentVariable.id,
					currentMode?.modeId,
				);

		let value: DesignTokenValue = variableValue as DesignTokenValue;

		for (const valueResolver of opts.valueResolvers) {
			const resolvedValue = await valueResolver(
				type,
				variableValue,
				currentVariable,
			);
			if (resolvedValue !== undefined && resolvedValue !== null) {
				value = resolvedValue;
				break;
			}
		}

		let name = currentVariable.name;

		for (const nameResolver of opts.nameResolvers) {
			const resolvedName = await nameResolver(currentVariable);
			if (resolvedName !== undefined && resolvedName !== null) {
				name = resolvedName;
				break;
			}
		}

		const token: DesignToken = {
			$type: type,
			$value: value,
		};

		if (currentVariable.description) {
			token.$description = currentVariable.description;
		}

		output.push([name, token]);
	}

	if (opts.deep) {
		return entriesToDeepObject(output, '/');
	}

	return Object.fromEntries(output);
}

import { isVariableAlias } from './is-variable-alias';
import { resolveLocalVariableValue } from './resolve-local-variable-value';
import type { ResolvedVariableValue } from './types';

export async function resolveLocalVariableValueRecursive(
	id: string,
	modeId?: string,
): Promise<ResolvedVariableValue> {
	let value = await resolveLocalVariableValue(id, modeId);

	if (isVariableAlias(value)) {
		value = await resolveLocalVariableValueRecursive(value.id, modeId);
	}

	return value;
}

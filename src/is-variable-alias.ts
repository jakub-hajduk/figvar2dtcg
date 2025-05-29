import { isObject } from './is-object';

export function isVariableAlias(value: VariableValue): value is VariableAlias {
	return isObject(value) && 'type' in value && value.type === 'VARIABLE_ALIAS';
}

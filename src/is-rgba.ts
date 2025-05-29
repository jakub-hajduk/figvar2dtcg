import { isObject } from './is-object';

export function isRGBA(value: VariableValue): value is RGBA | RGB {
	return isObject(value) && 'r' in value && 'g' in value && 'b' in value;
}

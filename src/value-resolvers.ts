import type { ColorTokenValue, DimensionTokenValue } from './dtcg-types';
import { isRGBA } from './is-rgba';
import { isVariableAlias } from './is-variable-alias';
import { rgbaToHexa } from './rgba-to-hexa';
import type { ValueResolverFn } from './types';

export const colorValueResolver: ValueResolverFn = (type, value) =>
	type === 'color' && isRGBA(value)
		? (rgbaToHexa(value as RGBA) as ColorTokenValue)
		: undefined;

export const dimensionValueResolver: ValueResolverFn = (type, value) =>
	type === 'dimension'
		? ({ value, unit: 'px' } as DimensionTokenValue)
		: undefined;

export const aliasValueResolver: ValueResolverFn = async (_type, value) => {
	if (isVariableAlias(value)) {
		const referencedVariable = await figma.variables.getVariableByIdAsync(
			value.id,
		);
		return referencedVariable
			? `{${referencedVariable.name.replaceAll('/', '.')}}`
			: undefined;
	}
};

export const defaultValueResolvers: ValueResolverFn[] = [
	colorValueResolver,
	dimensionValueResolver,
	aliasValueResolver,
];

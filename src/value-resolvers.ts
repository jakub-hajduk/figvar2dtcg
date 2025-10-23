import type { DimensionTokenValue } from './dtcg-types';
import { isRGBA } from './is-rgba';
import { isVariableAlias } from './is-variable-alias';
import { rgbaToHexa } from './rgba-to-hexa';
import type { ValueResolverFn } from './types';

export const colorValueResolver: ValueResolverFn = (type, value) =>
	type === 'color' && isRGBA(value)
		? {
        colorSpace: 'srgb',
        components: [value.r, value.g, value.b],
        alpha: 'a' in value ? value.a : 1,
        hex: rgbaToHexa({ r: value.r, g: value.g, b: value.b })
    }
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

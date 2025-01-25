import type { TypeResolverFn } from './types';

export const colorTypeResolver: TypeResolverFn = (variable) =>
	variable.resolvedType === 'COLOR';

export const fontFamilyTypeResolver: TypeResolverFn = (variable) =>
	variable.resolvedType === 'STRING' && variable.scopes.includes('FONT_FAMILY');

export const fontWeightTypeResolver: TypeResolverFn = (variable) =>
	variable.resolvedType === 'STRING' &&
	(variable.scopes.includes('FONT_WEIGHT') ||
		variable.scopes.includes('FONT_STYLE'));

export const fontSizeTypeResolver: TypeResolverFn = (variable) =>
	variable.resolvedType === 'FLOAT' && variable.scopes.includes('FONT_SIZE');

export const lineHeightTypeResolver: TypeResolverFn = (variable) =>
	variable.resolvedType === 'FLOAT' && variable.scopes.includes('LINE_HEIGHT');

export const letterSpacingTypeResolver: TypeResolverFn = (variable) =>
	variable.resolvedType === 'STRING' &&
	variable.scopes.includes('LETTER_SPACING');

export const dimensionTypeResolver: TypeResolverFn = (variable) =>
	variable.resolvedType === 'FLOAT' &&
	(variable.scopes.includes('GAP') ||
		variable.scopes.includes('CORNER_RADIUS') ||
		variable.scopes.includes('WIDTH_HEIGHT'));

export const numberTypeResolver: TypeResolverFn = (variable) =>
	variable.resolvedType === 'FLOAT';

export const unknownTypeResolver: TypeResolverFn = () => true;

export const defaultTypeResolvers: Record<string, TypeResolverFn> = {
	color: colorTypeResolver,
	fontFamily: fontFamilyTypeResolver,
	fontWeight: fontWeightTypeResolver,
	fontSize: fontSizeTypeResolver,
	lineHeight: lineHeightTypeResolver,
	letterSpacing: letterSpacingTypeResolver,
	dimension: dimensionTypeResolver,
	number: numberTypeResolver,
	unknown: unknownTypeResolver,
};

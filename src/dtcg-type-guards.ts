import type {
	ColorToken,
	DesignToken,
	DimensionToken,
	GradientToken,
	NumberToken,
	TypographyToken,
} from './dtcg-types';

export const isShadowToken = (token: DesignToken): token is GradientToken =>
	token.$type === 'shadow';

export const isColorToken = (token: DesignToken): token is ColorToken =>
	token.$type === 'color';

export const isTypographyToken = (
	token: DesignToken,
): token is TypographyToken => token.$type === 'typography';

export const isGradientToken = (token: DesignToken): token is GradientToken =>
	token.$type === 'gradient';

export const isDimensionToken = (token: DesignToken): token is DimensionToken =>
	token.$type === 'dimension';

export const isNumberToken = (token: DesignToken): token is NumberToken =>
	token.$type === 'number';

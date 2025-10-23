// Typography value
export interface TypographyTokenValue {
	fontFamily: string;
	fontSize: number;
	fontWeight: number;
	letterSpacing: number;
	lineHeight: number;
}

// Gradient value
export interface GradientStop {
	color: string;
	position: number;
}

export type GradientTokenValue = GradientStop[];

export type ColorSpace = 'srgb'
| 'srgb-linear'
| 'hsl'
| 'hwb'
| 'lab'
| 'lch'
| 'oklab'
| 'oklch'
| 'display-p3'
| 'a98-rgb'
| 'prophoto-rgb'
| 'rec2020'
| 'xyz-d65'
| 'xyz-d50'

export type ColorComponentValue = number | 'none'


// Color value
export type ColorTokenValue = {
  colorSpace: ColorSpace,
  components: [ColorComponentValue, ColorComponentValue, ColorComponentValue],
  alpha: number,
  hex: string
};

// Shadow value
export interface ShadowStop {
	color: ColorTokenValue;
	offsetX: number;
	offsetY: number;
	blur: number;
	spread: number;
}

export type ShadowTokenValue = ShadowStop[];

// Dimension value
export type DimensionTokenUnit = 'px' | 'rem';

export interface DimensionTokenValue {
	value: number;
	unit: DimensionTokenUnit;
}

// Token values
export type DesignTokenValue =
	| ColorTokenValue
	| TypographyTokenValue
	| ShadowTokenValue
	| GradientTokenValue
	| DimensionTokenValue
	| number
	| string;

// Token types
export type DesignTokenType =
	| 'color'
	| 'typography'
	| 'shadow'
	| 'gradient'
	| 'number'
	| 'dimension'
	| string;

export interface DesignTokenBase {
	$type: DesignTokenType;
	$description?: string;
	$value: DesignTokenValue;
}

export interface ColorToken extends DesignTokenBase {
	$type: 'color';
	$value: ColorTokenValue;
}

export interface TypographyToken extends DesignTokenBase {
	$type: 'typography';
	$value: TypographyTokenValue;
}

export interface ShadowToken extends DesignTokenBase {
	$type: 'shadow';
	$value: ShadowTokenValue;
}

export interface GradientToken extends DesignTokenBase {
	$type: 'gradient';
	$value: GradientTokenValue;
}

export interface NumberToken extends DesignTokenBase {
	$type: 'number';
	$value: number;
}

export interface DimensionToken extends DesignTokenBase {
	$type: 'dimension';
	$value: DimensionTokenValue;
}

export type DesignToken =
	| ColorToken
	| TypographyToken
	| ShadowToken
	| GradientToken
	| NumberToken
	| DimensionToken
	| DesignTokenBase;

export interface DesignTokensFormat {
	[k: string]: DesignTokensFormat | DesignToken;
}

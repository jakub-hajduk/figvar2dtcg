import type { DesignTokenValue } from './dtcg-types';

export type ResolvedVariableValue = boolean | string | number | RGB | RGBA;

export type MaybePromise<T> = T | Promise<T>;

export type TypeResolverFn = (variable: Variable) => MaybePromise<boolean>;

export type ValueResolverFn = (
	type: string,
	value: ResolvedVariableValue | VariableValue,
	variable: Variable,
) => MaybePromise<DesignTokenValue | undefined>;

export type NameResolverFn = (variable: Variable) => MaybePromise<string>;

export interface VariablesToDTCGOptions {
	/**
	 * Whether resolve aliases to final values, or just leave references.
	 */
	resolveAliases: boolean;
	/**
	 * Whether return nested JSON like:
	 * {
	 *   "colors": {
	 *     "button": {
	 *       "bg": {
	 *         $type: "color",
	 *         $value: "red"
	 *       }
	 *     }
	 *   }
	 * }
	 *
	 * or flat one like:
	 * {
	 *   "colors/button/bg": {
	 *     $type: "color",
	 *     $Value: "red"
	 *   }
	 * }
	 */
	deep: boolean;
	/**
	 * Custom type resolvers.
	 * Please check out TypeResolverFn definition for more details.
	 * If the resolver function will return `true`, the type defined by the key in the object will be applied.
	 * It will apply the type for first matching check.
	 * This function can be asynchronous.
	 *
	 * @example
	 * {
	 *   color: async (variable) => variable.resolvedType === 'COLOR'
	 * }
	 *
	 */
	typeResolvers: Record<string, TypeResolverFn>;
	/**
	 * Resolvers for values.
	 * Please check out `ValueResolverFn` definition for more defails on type.
	 * `type` is a type resolved by type resolvers.
	 * `value` is Figma variable value
	 * `variable` is Figma variable itself.
	 * This function can be asynchronous.
	 * If returns null or undefined, then this function is skipped and next one is applied.
	 * If returns anything else, then it is applied as a token value.
	 *
	 * @example
	 * [
	 *  (type, value, variable) => {
	 *    if (type === 'color) return hexa(variable.color)
	 *  }
	 * ]
	 */
	valueResolvers: ValueResolverFn[];
	/**
	 * resolves name for the tokens to apply specific format for the names.
	 *
	 * @example
	 * [
	 *   (variable) => tokenizeName(variable.name)
	 * ]
	 */
	nameResolvers: NameResolverFn[];
}

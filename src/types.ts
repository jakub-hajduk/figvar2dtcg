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
	resolveAliases: true;
	deep: true;
	typeResolvers: Record<string, TypeResolverFn>;
	valueResolvers: ValueResolverFn[];
	nameResolvers: NameResolverFn[];
}

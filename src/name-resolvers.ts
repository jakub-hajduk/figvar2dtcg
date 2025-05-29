import type { NameResolverFn } from './types';

export const dashifyName: NameResolverFn = (variable) =>
	variable.name.replaceAll(' - ', '-').replaceAll(' ', '-').toLowerCase();

export const defaultNameResolvers: NameResolverFn[] = [dashifyName];

import type { FilterFn } from './types';

export const defaultFilter: FilterFn = (variable) => {
	return !variable.name.startsWith('_') && !variable.name.startsWith('.');
};

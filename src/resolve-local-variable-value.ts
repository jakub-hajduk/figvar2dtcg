export async function resolveLocalVariableValue(
	id: string,
	modeId?: string,
): Promise<VariableValue> {
	const variable = await figma.variables.getVariableByIdAsync(id);
	if (!variable) throw new Error(`Couldn't find loal variable with ${id} id.`);
	const collection = await figma.variables.getVariableCollectionByIdAsync(
		variable.variableCollectionId,
	);
	if (!collection)
		throw new Error(`Couldn't find collection for variable with ${id} id.`);

	const value =
		variable.valuesByMode[modeId as string] ||
		variable.valuesByMode[collection.defaultModeId];

	if (!value) {
		console.error({
			origin: 'resolveLocalVariableValue',
			id,
			modeId,
			defaultModeId: collection.defaultModeId,
			value,
		});
		throw new Error(
			`Couldn't resolve value for ${modeId || collection.defaultModeId} mode, for variable with ${id} id.`,
		);
	}

	return value;
}

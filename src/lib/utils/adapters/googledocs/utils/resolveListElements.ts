import type { docs_v1 } from 'googleapis/build/src/apis/docs/v1';

export function resolveListElements(
	content?: docs_v1.Schema$StructuralElement[],
	listsMap?: Map<string, docs_v1.Schema$List>
): Map<
	string,
	{
		listProperties: docs_v1.Schema$ListProperties;
		listStructuralElements: docs_v1.Schema$StructuralElement[];
	}
> {
	const listElementsMap = new Map();
	if (!content) return listElementsMap;
	if (!listsMap) throw new Error(`"listsMap" is undefined`);

	listsMap.forEach((list, key) => {
		const listStructuralElements = content.filter(
			(structuralElement) => structuralElement.paragraph?.bullet?.listId === key
		);
		if (!list?.listProperties)
			throw new Error('List properties is not defined');

		listElementsMap.set(key, {
			listProperties: list.listProperties,
			listStructuralElements
		});
	});

	return listElementsMap;
}

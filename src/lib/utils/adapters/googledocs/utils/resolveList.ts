import { h } from 'hastscript';
import type { Element } from 'hast';
import type { docs_v1 } from 'googleapis';

const GLYPH_TYPE_CLASSES_MAP = new Map([
	['DECIMAL', 'list-decimal'],
	['ALPHA', 'list-[lower-alpha]'],
	['UPPER_ALPHA', 'list-[upper-alpha]'],
	['ROMAN', 'list-[lower-roman]'],
	['UPPER_ROMAN', 'list-[upper-roman]']
]);

const GLYPH_TYPE_MAP = new Map([
	['DECIMAL', '1'],
	['ALPHA', 'a'],
	['UPPER_ALPHA', 'A'],
	['ROMAN', 'i'],
	['UPPER_ROMAN', 'I']
]);

export interface ResolveListProps {
	listProperties: docs_v1.Schema$ListProperties;
	listStructuralElements: docs_v1.Schema$StructuralElement[];
}

export function resolveList(
	listElements: ResolveListProps | undefined,
	_resolveChildren: (elements?: docs_v1.Schema$ParagraphElement[] | undefined) => Element[]
): Element {
	if (!listElements) throw new Error(`"listElements" is undefined.`);

	function _createListNode(
		nestingLevel: docs_v1.Schema$NestingLevel | undefined,
		children: Element[] = []
	): Element {
		if (!nestingLevel) throw new Error(`"nestingLevel" is undefined`);
		const glyphType = nestingLevel.glyphType;
		// const glyphSymbol = nestingLevel.glyphSymbol;

		// TODO: Implement different glyph symbols: https://developers.google.com/docs/api/reference/rest/v1/ListProperties#NestingLevel.FIELDS.glyph_format
		// if (glyphSymbol) {
		//  return h('div', h('ul', { class: 'list-none' }, children));
		// }

		if (!glyphType || glyphType === 'NONE') {
			return h('ul', { class: 'list-disc' }, children);
		}

		const type = GLYPH_TYPE_MAP.get(glyphType);

		return h('ol', { type }, children);
	}

	function _resolveListElement(listStructuralElement: docs_v1.Schema$StructuralElement): Element {
		return h(
			'li',
			{ class: 'list-none' },
			_resolveChildren(listStructuralElement.paragraph?.elements)
		);
	}

	const { listProperties, listStructuralElements } = listElements;
	const nestingLevel = listProperties.nestingLevels?.[0];
	const rootNode = _createListNode(nestingLevel);
	let path = [rootNode];
	let currentDepth = 0;

	listStructuralElements.forEach((listStructuralElement) => {
		const depth = listStructuralElement.paragraph?.bullet?.nestingLevel ?? 0;
		const difference = depth - currentDepth;

		if (difference === 0) {
			const currentNode = path[path.length - 1];
			const childNode = _resolveListElement(listStructuralElement);
			currentNode.children.push(childNode);
		} else if (difference === 1) {
			const lastPathNode = path[path.length - 1];
			const currentNode = lastPathNode.children[lastPathNode.children.length - 1] as Element;
			const nestingLevel = listProperties.nestingLevels?.[depth];
			const childNode = _createListNode(nestingLevel, [_resolveListElement(listStructuralElement)]);
			currentNode.children.push(childNode);
			path.push(childNode);
		} else if (difference < 0) {
			path = path.slice(0, difference);
			const currentNode = path[path.length - 1];
			const childNode = _resolveListElement(listStructuralElement);
			currentNode.children.push(childNode);
		}

		currentDepth += difference;
	});

	return rootNode;
}

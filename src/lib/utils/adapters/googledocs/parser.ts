// Multiple H1s ARE semantic: https://www.youtube.com/watch?v=WsgrSxCmMbM
import type { docs_v1 } from 'googleapis/build/src/apis/docs/v1';
import { h } from 'hastscript';
import { resolveTableOfContents } from './utils/resolveTableOfContents';
import type { Element } from 'hast';
import { resolveChildren } from './utils/resolveChildren';
import { resolveHeadingLinks } from './utils/resolveHeadingLinks';
import { resolveListElements } from './utils/resolveListElements';
import { resolveList } from './utils/resolveList';
import type { ResolveListProps } from './utils/resolveList';

import toText from 'hast-util-to-text';
import { Slugger } from '$lib/utils/slugger';

const STYLE_TAG_MAP = new Map([
	['NORMAL_TEXT', 'p'],
	['SUBTITLE', 'p'],
	['TITLE', 'h1'],
	['HEADING_1', 'h1'],
	['HEADING_2', 'h2'],
	['HEADING_3', 'h3'],
	['HEADING_4', 'h4'],
	['HEADING_5', 'h5'],
	['HEADING_6', 'h6']
]);

interface ParsedDocument {
	documentRoot: Element;
	tableOfContents: Element;
	title: string | null | undefined;
	documentId: string | null | undefined;
	revisionId: string | null | undefined;
}

export function parseGoogleDoc(document: docs_v1.Schema$Document): ParsedDocument {
	if (!document) throw new Error('Document is undefined.');

	const slugger = new Slugger();
	const {
		body,
		documentStyle,
		lists,
		documentId,
		namedStyles,
		revisionId,
		title,
		inlineObjects
	} = document;
	const listsMap = new Map(Object.entries(lists ?? {}));
	const inlineObjectsMap = new Map(Object.entries(inlineObjects ?? {}));
	const resolvedListsIds = new Map<string, boolean>();
	const listElementsMap = resolveListElements(body?.content, listsMap);
	let customTitle = null;

	const _resolveChildren = (elements?: docs_v1.Schema$ParagraphElement[]): Element[] =>
		resolveChildren(elements, inlineObjectsMap);
	const _resolveHeadingLinks = (element: Element): Element => resolveHeadingLinks(element, slugger);
	const _resolveList = (listElements: ResolveListProps | undefined): Element =>
		resolveList(listElements, _resolveChildren);

	const content: Element[] | undefined = body?.content
		?.filter((structuralElement) => !!structuralElement.paragraph)
		.map((structuralElement) => {
			if (!structuralElement.paragraph?.bullet?.listId) return structuralElement;

			const alreadyVisitedList = resolvedListsIds.get(structuralElement.paragraph.bullet.listId);

			if (structuralElement.paragraph.bullet.listId && !alreadyVisitedList) {
				resolvedListsIds.set(structuralElement.paragraph.bullet.listId, true);
				return structuralElement;
			}

			return null;
		})
		.filter((structuralElement) => !!structuralElement?.paragraph)
		.map((structuralElement) => {
			if (!structuralElement?.paragraph) throw new Error('Empty paragraph');

			const { paragraph } = structuralElement;
			const paragraphStyleKey = paragraph?.paragraphStyle?.namedStyleType;
			const paragraphTag = paragraphStyleKey ? STYLE_TAG_MAP.get(paragraphStyleKey) : 'div';
			const inlineObjectElement = paragraph?.elements?.[0].inlineObjectElement;
			const bullet = paragraph?.bullet;
			const children = _resolveChildren(paragraph?.elements);

			if (bullet && bullet.listId) {
				const { listId } = bullet;
				const listElements = listElementsMap.get(listId);

				return _resolveList(listElements);
			}

			if (inlineObjectElement) {
				return h('div', children);
			}

			if (paragraphStyleKey === 'TITLE') {
				customTitle = toText(children as any)[0];
				return h(
					'h1',
					{
						class: 'font-serif-display tracking-tight text-6xl pb-10 heading-title',
						dataType: 'title',
						id: 'heading-title'
					},
					children
				);
			}

			return h(paragraphTag ?? 'p', children);
		})
		.map(_resolveHeadingLinks);

	const documentRoot = h('div', content);
	const tableOfContents = h('div', [resolveTableOfContents(documentRoot) || '']);

	return {
		documentRoot,
		tableOfContents,
		title: customTitle ?? title,
		documentId,
		revisionId
	};
}

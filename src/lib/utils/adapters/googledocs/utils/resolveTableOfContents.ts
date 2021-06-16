import h from 'hastscript';
import type { Element } from 'hast';
import rank from 'hast-util-heading-rank';
import toText from 'hast-util-to-text';

export function resolveTableOfContents(
	rootElement: Element | undefined
): Element | null {
	if (!rootElement) return null;
	// if (rootElement.tagName !== 'h1') return rootElement;

	function _resolveListElement(element: Element): Element {
		const anchor = element.children.filter(
			(element) => element.tagName === 'a'
		)[0] as Element;
		const href = anchor?.properties?.href ?? '';
		const depth = rank(element);

		// Make H1's bold
		if (depth === 1) {
			return h(
				'li',
				{ class: 'mt-2' },
				h(
					'a',
					{
						href,
						class: 'no-underline line-clamp-1 font-semibold text-gray-700'
					},
					toText(element)
				)
			);
		}

		return h(
			'li',
			{ class: 'mt-2' },
			h(
				'a',
				{ href, class: 'no-underline line-clamp-1 text-sm text-gray-500' },
				toText(element)
			)
		);
	}

	const rootNode: Element = h('ul');

	let currentPath: Element[] = [rootNode];
	let currentDepth = 1;

	try {
		((rootElement.children as unknown) as Element[])
			.filter((element) => rank(element))
			.forEach((element) => {
				const depth = rank(element);
				const difference = depth - currentDepth;

				if (difference > 1) {
					throw new Error(
						`Non-semantic hierarchy not supported. H2 must be nested within H1, H3 must be nested with H2, etc.`
					);
				}

				if (difference === 0) {
					const currentNode = currentPath[currentPath.length - 1];
					const childNode = _resolveListElement(element);
					currentNode.children.push(childNode);
				} else if (difference === 1) {
					const lastPathNode = currentPath[currentPath.length - 1];
					const currentNode = lastPathNode.children[
						lastPathNode.children.length - 1
					] as Element;
					const childNode = h(
						'ul',
						{ class: 'ml-4' },
						_resolveListElement(element)
					);
					currentNode.children.push(childNode);
					currentPath.push(childNode);
				} else if (difference < 0) {
					currentPath = currentPath.slice(0, difference);
					const currentNode = currentPath[currentPath.length - 1];
					const childNode = _resolveListElement(element);
					currentNode.children.push(childNode);
				}

				currentDepth += difference;
			});

		return rootNode;
	} catch (e) {
		console.log(
			'Table of contents could not be generated. Check that headings are not skipped: H1 > H2 > H3 ...'
		);
		return rootElement;
	}
}

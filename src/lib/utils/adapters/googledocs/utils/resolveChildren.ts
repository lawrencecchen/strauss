import type { Element } from 'hast';
import type { docs_v1 } from 'googleapis/build/src/apis/docs/v1';
import { h } from 'hastscript';
import { resolveShortcode } from './resolveShortcode';

const TEXT_STYLE_MAP = new Map([
	['bold', 'font-bold'],
	['italic', 'italic'],
	['underline', 'underline'],
	['strikethrough', 'line-through'],
	['link', 'underline'],
	['smallCaps', 'uppercase']
]);

export function resolveChildren(
	elements?: docs_v1.Schema$ParagraphElement[],
	inlineObjectsMap?: Map<string, docs_v1.Schema$InlineObject>
): Element[] {
	if (!elements) throw new Error(`"elements" is missing from "resolveChildren"`);

	function _removeLineBreaks(text?: string | null): string {
		if (!text) throw new Error("removeLineBreaks doesn't work on non-strings.");
		return text?.replace(/(\r\n|\n|\r)/gm, ' ');
	}

	function _resolveLink(link?: docs_v1.Schema$Link, children?: Element | string): Element {
		if (!link) return h('span', `Error with link`);
		return h('a', { href: link.url, target: '_blank', rel: 'noopener noreferrer' }, children || '');
	}

	function _resolveInlineObjectElement(
		inlineObjectElement?: docs_v1.Schema$InlineObjectElement
	): Element {
		if (!inlineObjectElement) throw new Error(`Error with "inlineObjectElement" object (image).`);
		if (!inlineObjectsMap) throw new Error(`"inlineObjectsMap" is undefined`);

		const { inlineObjectId } = inlineObjectElement;
		const embeddedObject = inlineObjectsMap.get(inlineObjectId ?? '');
		const altText = `${embeddedObject?.inlineObjectProperties?.embeddedObject?.title}: ${embeddedObject?.inlineObjectProperties?.embeddedObject?.description}`;
		const ptToPx = (pt?: number | null): number => ((pt ?? 0) * 4) / 3;
		let image = h('img', {
			src: embeddedObject?.inlineObjectProperties?.embeddedObject?.imageProperties?.contentUri,
			alt: altText,
			width: ptToPx(embeddedObject?.inlineObjectProperties?.embeddedObject?.size?.width?.magnitude),
			height: ptToPx(
				embeddedObject?.inlineObjectProperties?.embeddedObject?.size?.height?.magnitude
			)
		});

		if (inlineObjectElement?.textStyle?.link) {
			const link = inlineObjectElement?.textStyle?.link;
			image = _resolveLink(link, image);
		}

		return h('figure', { class: 'flex flex-col items-center' }, [
			// h('zoom', image),
			image,
			h('figcaption', { class: 'text-center' }, altText)
		]);
	}

	return elements.map((element) => {
		const textRun = element.textRun;
		const inlineObjectElement = element.inlineObjectElement;
		const content = textRun?.content;
		const value = content ? _removeLineBreaks(content) : '';
		const textStyle = textRun?.textStyle;
		const link = textStyle?.link;

		const classes = Object.entries(textStyle ?? {})
			.filter((value) => !!value?.[1])
			.map((value) => TEXT_STYLE_MAP.get(value[0]))
			.filter((value) => !!value);

		let child: Element | string = value || '';

		const shortcodeRegex = new RegExp('(?<={{).*?(?=}})');
		const regexMatch = child.match(shortcodeRegex);

		if (regexMatch) {
			const shortcode = regexMatch[0];
			child = resolveShortcode(shortcode);
		}

		if (inlineObjectElement) {
			child = _resolveInlineObjectElement(inlineObjectElement);
		}

		if (link) {
			child = _resolveLink(link, child);
		}

		return h('span', { class: classes.join(' ') }, child || '');
	});
}

import type { Element } from 'hast';
import isHeading from 'hast-util-heading';
import toText from 'hast-util-to-text';
import { h } from 'hastscript';
import type { Slugger } from '$lib/utils/slugger';

function classNames(...args: (string | string[] | null | undefined)[]): string {
	return (args.filter((arg) => arg && typeof arg !== 'undefined').join(' ') as any).replaceAll(
		',',
		' '
	);
}

export function resolveHeadingLinks(element: Element, slugger: Slugger): Element {
	if (!isHeading(element)) return element;

	const text = toText(element);
	const classes = element.properties?.className as string | undefined;
	const slug = slugger.slug(text);

	// Elements with data-type="title" should not have quicklinks.
	if (element.properties?.dataType === 'title') {
		return h('span', { id: slug }, element);
	}

	return h(
		element.tagName,
		{
			class: classNames('group flex whitespace-pre-wrap scroll-margin-top', classes),
			id: slug
		},
		[
			h('a', {
				href: `#${slug}`,
				'data-slug': slug,
				class:
					'no-underline absolute after:hash opacity-0 group-hover:opacity-100 text-gray-400 ml-[-1em] pr-[0.5em] transition-opacity duration-75'
			}),
			text
		]
	);
}

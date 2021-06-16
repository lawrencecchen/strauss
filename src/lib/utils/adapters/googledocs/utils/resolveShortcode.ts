// https://dev.to/p/editor_guide
// https://github.com/transitive-bullshit/react-static-tweets#readme
import type { Element } from 'hast';
import { h } from 'hastscript';

const removeEmpty = (d: any): boolean => !!d;

const SHORTCODES_MAP = new Map([
	[
		'youtube',
		(...args: any[]): Element =>
			h(
				'span',
				{ class: 'block aspect-w-16 aspect-h-9' },
				h('iframe', {
					src: `https://www.youtube.com/embed/${args[0]}`,
					frameborder: 0,
					allow:
						'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
					allowfullscreen: true,
					title: 'YouTube video'
				})
			)
	],
	[
		'vimeo',
		(...args: any[]): Element =>
			h(
				'span',
				{ class: 'block aspect-w-16 aspect-h-9' },
				h('iframe', {
					src: `https://player.vimeo.com/video/${args[0]}`,
					frameborder: 0,
					allow: 'autoplay; fullscreen; picture-in-picture',
					allowfullscreen: true,
					title: 'Vimeo video'
				})
			)
	],
	['twitter', (...args: any[]): Element => h('Tweet', { id: args[0] })]
]);

export function resolveShortcode(shortcode: string): Element {
	const data = shortcode.split(' ').filter(removeEmpty);
	const key = data[0];
	const args = data.slice(1);
	const elementFn = SHORTCODES_MAP.get(key);
	if (!elementFn) {
		return h('span', `Could not display shortcode: "{{${shortcode}}}"`);
	}
	const result = elementFn(args);
	// console.log(result);

	return result;
}

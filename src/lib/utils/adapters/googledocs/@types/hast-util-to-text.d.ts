import type { Element } from 'hast';

declare module 'hast-util-to-text' {
	function toText(node: Element): string;
	export = toText;
}

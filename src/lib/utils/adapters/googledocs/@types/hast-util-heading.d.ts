import type { Element } from 'hast';

declare module 'hast-util-heading' {
	function isHeading(node: Element): boolean;
	export = isHeading;
}

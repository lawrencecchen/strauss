import type { Element } from 'hast';

declare module 'hast-util-heading-rank' {
	function headingRank(node: Element): number;
	export = isHeading;
}

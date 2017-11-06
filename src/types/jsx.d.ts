import Vue, { VNode } from "vue";

declare global {
	namespace JSX {
		interface ElementClass extends Vue {}
		interface Element extends VNode {}
		interface ElementAttributesProperty {
			$props: {}
		}

		interface IntrinsicElements {
			[elem: string]: any;
		}
	}
}
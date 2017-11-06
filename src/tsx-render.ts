import { VNodeData } from 'vue'
import { createDecorator } from "vue-class-component"

function kebabToCamel(v: string): string
{
	return v.replace(/\-([a-z])/gi, v => v.charAt(1).toUpperCase())
}

function processKey(hAttr: VNodeData, attrs: { [key: string]: any }, key: string)
{
	key = kebabToCamel(key)

	if (/^on[A-Z]/.test(key)) {
		const eventName = key.slice(2).toLowerCase()
		hAttr.on = hAttr.on || {}
		hAttr.on[eventName] = attrs[key]
	} else
	if (/^nativeOn[A-Z]/.test(key)) {
		const eventName = key.slice(8).toLowerCase()
		hAttr.nativeOn = hAttr.nativeOn || {}
		hAttr.nativeOn[eventName] = attrs[key]
	} else
	if (/^domProps[A-Z]/.test(key)) {
		const property = key.slice(8, 9).toLowerCase() + key.slice(9)
		hAttr.domProps = hAttr.domProps || {}
		hAttr.domProps[property] = attrs[key]
	} else
	switch (key) {

		case "key":
		case "class":
		case "style":
		case "ref":
		case "slot": 
		case "directives":
			hAttr[key] = attrs[key]
			break 

		default:
			hAttr.attrs = hAttr.attrs || {}
			hAttr.attrs![key] = attrs[key]
	}

	return hAttr
}

export function TSXRender(): PropertyDecorator
{
	return function (target: any, key: string | symbol)
	{
		createDecorator((componentOptions, k) =>
		{
			const orender = componentOptions.render!

			if (!orender) return

			const render = function (this: any, h: any)
			{
				const self = this
				const f = function (tagName: string | ObjectConstructor, attrs: {})
				{
					let nodeData: VNodeData = { attrs: {} }

					for (const key in attrs)
					{
						nodeData = processKey(nodeData, attrs, key)
					}

					const children: any[] = Array.prototype.slice.call(arguments, 2)
					return h.apply(self, [tagName, nodeData, children])
				}

				return orender.call(self, f)
			}

			componentOptions.render = render
		})(target, String(key))
	}
}
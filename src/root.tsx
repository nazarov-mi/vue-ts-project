import Vue, { VNode } from 'vue'
import { TSXRender } from './tsx-render'

import Component from 'vue-class-component'
import Hello from './components/hello'

@Component({})
class Root extends Vue {

	@TSXRender()
	private render(h: Function): VNode {
		return (
			<div id="vue_app">
				<div class="logo"></div>
				{[
					Array.from({ length: 5 }).map(_ => (
						<Hello/>
					))
				]}
			</div>
		)
	}
}

export default Root
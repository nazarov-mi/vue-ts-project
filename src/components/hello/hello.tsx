import Vue, { VNode } from 'vue'
import { TSXRender } from '@/tsx-render'

import Component from 'vue-class-component'

@Component({})
class Hello extends Vue
{
	private message: String = 'Hello there, Vue works!'

	@TSXRender()
	private render(h: Function): VNode
	{
		return (
			<div class="c-hello">
				<label class="c-hello__label">{this.message}</label>
				<input
					class="c-hello__input"
					type="text"
					value={this.message}
					onInput={this.handleInput}
				/>
			</div>
		)
	}

	private handleInput(e: any): void {
		this.message = e.target.value
	}
}

export default Hello

import Vue from 'vue'
import { CreateElement, VNode } from 'vue'

import Root from './root'

import './assets/style.sass'

class App {
	private instance: Vue

	private init(): void {
		this.instance = new Vue({
			el: '#app',
			render(h: CreateElement): VNode {
				return h(Root)
			}
		})
	}

	constructor() {
		this.init()
	}
}

new App()
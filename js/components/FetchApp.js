import { loadResults } from "../components-fetchapp/FetchData.js"
import { state } from "../components-fetchapp/State.js"

class FetchApp {
	constructor() {
		this.events()
	}
	events() {
		document.addEventListener(
			"DOMContentLoaded",
			this.controllerLoadResults.bind(this)
		)
	}
	dispatcher() {}
	async controllerLoadResults() {
		await loadResults()

		console.log(state)
	}
}
new FetchApp()

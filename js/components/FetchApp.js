import * as fetchs from "../components-fetchapp/FetchData.js"
import * as renders from "../components-fetchapp/RenderData.js"
import * as sort from "../components-fetchapp/SortData.js"
import * as state from "../components-fetchapp/State.js"

class FetchApp {
	constructor() {
		this.events()
	}
	/* controlers */
	async controllerLoadResults() {
		this.executer(renders.renderFilterNames, "filter")
		this.executer(renders.renderLayoutBtn, "filter")
		this.executer(renders.renderSpiner, "root")

		await fetchs.loadResults()
		await fetchs.wait(3)

		this.executer(state.saveStateObjectByCategory, "root")

		sort.sortDataByDate()
		sort.sortDataByCategory()

		this.executer(
			renders.renderResults,
			"root",
			sort.sortDataByLimit(3)
		)
		console.log(state.state)
	}
	/* configs */
	events() {
		document.addEventListener(
			"DOMContentLoaded",
			this.controllerLoadResults.bind(this)
		)
	}
	dispatcher() {}
	executer(cb, role, ...rest) {
		const parents = document.querySelectorAll(`[role=${role}`)
		if (parents.length > 0) parents.forEach(e => cb(e, ...rest))
	}
}
new FetchApp()

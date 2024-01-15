import * as states from "../components-fetchapp/State.js"
import * as renders from "../components-fetchapp/RenderData.js"
import * as fetchs from "../components-fetchapp/FetchData.js"

class FilterApp {
	constructor() {
		this.parents = document.querySelectorAll("[role=filter]")
		this.events()
	}
	events() {
		this.parents.forEach(e =>
			e.addEventListener("click", this.dispatcher.bind(this))
		)
	}
	dispatcher(e) {
		const theNode = e.target
		const selectDate = theNode.closest(".select-item")

		if (selectDate) this.updateDate(theNode)
	}
	async updateDate(theNode) {
		const currentDate =
			+theNode.parentElement.parentElement.querySelector("select")
				.selectedIndex

		states.saveStateObjectByDate(currentDate)

		this.executer(renders.renderSpiner, "root")
		await fetchs.wait(3)

		console.log(currentDate)
	}
	executer(cb, role, ...rest) {
		const parents = document.querySelectorAll(`[role=${role}`)
		if (parents.length > 0) parents.forEach(e => cb(e, ...rest))
	}
}
new FilterApp()

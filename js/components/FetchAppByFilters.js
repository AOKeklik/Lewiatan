import * as states from "../components-fetchapp/State.js"
import * as renders from "../components-fetchapp/RenderData.js"
import * as fetchs from "../components-fetchapp/FetchData.js"
import * as sorts from "../components-fetchapp/SortData.js"

class FetchAppByFilters {
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
		const selectLayout = theNode.closest("[aria-controls]")

		if (selectDate) this.constrollerLoadResultsByDate(theNode)
		if (selectLayout) this.constrollerLoadResultsByLayout(selectLayout)
	}
	async constrollerLoadResultsByDate(theNode) {
		const theSelect =
			theNode.parentElement.parentElement.querySelector("select")
		const currentDate = +theSelect.selectedIndex

		states.saveStateObjectByDate(currentDate)

		this.executer(this.renderingData, "root")
	}
	async constrollerLoadResultsByLayout(theNode) {
		const type = theNode.getAttribute("aria-controls")

		states.saveStateObjectByLayout(type === "grid" ? 0 : 1)

		this.executer(this.renderingData, "root")

		this.executer(renders.renderLayoutBtn, "filter")
	}
	async constrollerLoadResultsByCategory(theNode) {}
	async constrollerLoadResultsByTags(theNode) {}
	async renderingData(parent) {
		renders.renderSpiner(parent)
		await fetchs.wait(3)

		states.saveStateObjectByCategory(parent)

		sorts.sortDataByDate()
		sorts.sortDataByCategory()

		renders.renderResults(parent, sorts.sortDataByLimit)
	}
	executer(cb, role, ...rest) {
		const parents = document.querySelectorAll(`[role=${role}`)
		if (parents.length > 0) parents.forEach(e => cb(e, ...rest))
	}
}
new FetchAppByFilters()

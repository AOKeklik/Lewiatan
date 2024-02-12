import * as renders from "../components-fetchapp/RenderData.js"
import * as states from "../components-fetchapp/State.js"
import * as fetchs from "../components-fetchapp/FetchData.js"
import * as sorts from "../components-fetchapp/SortData.js"

class FetchAppByFilter {
	constructor() {
		this.parents = document.querySelectorAll("[role=filter]")
		this.events()
	}
	renderFilterLabels() {
		this.executer(renders.renderFilterNames, "filter")
		this.executer(renders.renderLayoutBtn, "selectlayout")
	}
	async controllerLoadResultsByDate(theNode) {
		const theSelect = theNode.parentElement.parentElement.querySelector("select")
		const currentDate = +theSelect.selectedIndex

		states.saveStateObjectByDate(currentDate)

		this.executer(this.renderingData, "root")
	}
	async constrollerLoadResultsByCategory(theNode) {
		const theSelect = theNode.parentElement.parentElement.querySelector("select")
		const currentCategory = +theSelect.value

		states.saveStateObjectByCategory(theSelect, currentCategory)

		this.executer(this.renderingData, "root", currentCategory)
	}
	async controllerLoadResultsByLayout(theNode) {
		const type = +theNode.getAttribute("aria-select-id")

		console.log(type)

		states.saveStateObjectByLayout(type)

		this.executer(this.renderingData, "root", "layout")

		this.executer(renders.renderLayoutBtn, "selectlayout")
	}
	async renderingData(parent) {
		const catId = parent.getAttribute("aria-category-id") === null && +parent.getAttribute("aria-category-id")

		renders.renderSpiner(parent)
		await fetchs.wait(3)

		sorts.sortDataByDate()
		sorts.sortDataByCategory(catId)

		renders.renderResults(parent, sorts.sortDataByLimit)
	}
	dispatcher(e) {
		const theNode = e.target
		const selectDate = theNode.closest("[aria-select-type=date] .select-item")
		const selectCategory = theNode.closest("[aria-select-type=category] .select-item")
		const selectLayout =
			theNode.closest("[aria-select-type=grid]") || theNode.closest("[aria-select-type=line]")

		if (selectDate) this.controllerLoadResultsByDate(theNode)
		if (selectCategory) this.constrollerLoadResultsByCategory(theNode)
		if (selectLayout) this.controllerLoadResultsByLayout(selectLayout)
	}
	events() {
		this.renderFilterLabels()
		this.parents.forEach(e => e.addEventListener("click", this.dispatcher.bind(this)))
	}
	executer(cb, role, ...rest) {
		const parents = document.querySelectorAll(`[role=${role}`)
		if (parents.length > 0) parents.forEach(e => cb(e, ...rest))
	}
}
new FetchAppByFilter()

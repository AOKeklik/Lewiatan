import * as fetchs from "../components-fetchapp/FetchData.js"
import * as renders from "../components-fetchapp/RenderData.js"
import * as sort from "../components-fetchapp/SortData.js"

class FetchApp {
	constructor() {
		this.events()
	}
	/* controlers */
	async controllerLoadResults(parent, catID = null) {
		// console.log(catID)

		renders.renderSpiner(parent)

		await fetchs.wait(3)
		await fetchs.loadResults()

		sort.sortDataByDate()
		sort.sortDataByCategory(catID)

		renders.renderResults(parent, sort.sortDataByLimit)
	}
	controllerPagination() {
		const parentResults = document.querySelector(".results")
		const parentPagination = document.querySelector(".pagination")

		parentPagination.addEventListener("click", function (e) {
			e.preventDefault()
			const theNode = e.target.closest(".pagination-btn")
			if (!theNode) return
			let thePage = +theNode.dataset.page

			saveStateObjectByPage(thePage)

			renderResults(parentResults, sortDataByPagination())
			renderPagination(parentPagination)
		})
	}
	/* configs */
	events() {
		this.dispatcher()
		this.controllerPagination()
	}
	dispatcher(e) {
		const theRoot = document.querySelectorAll("[role=root]")
		if (theRoot < 0) return

		theRoot.forEach(el => {
			const catID = +el.getAttribute("aria-category-id")

			if (catID === -1) return this.controllerLoadResults(el, null)

			this.controllerLoadResults(el, catID)
		})
	}
}
new FetchApp()

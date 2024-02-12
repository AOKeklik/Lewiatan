import * as fetchs from "../components-fetchapp/FetchData.js"
import * as renders from "../components-fetchapp/RenderData.js"
import * as sorts from "../components-fetchapp/SortData.js"
import * as states from "../components-fetchapp/State.js"

async function controllerLoadResults(catID) {
	try {
		const parentResults = document.querySelector(`[aria-category-id="${catID}"]`)

		renders.renderFilterNames("date")
		renders.renderLayoutBtn()
		renders.renderSpiner(parentResults)

		await fetchs.wait(3)
		await fetchs.loadResults()

		states.saveStateObjectByCategory(catID)

		sorts.sortDataByDate()
		sorts.sortDataByCategory(catID)

		renders.renderResults(parentResults, sorts.sortDataByLimit)
	} catch (err) {
		console.log(err)
	}
}
async function controllerLoadResultsByDate(catID) {
	try {
		const parentResults = document.querySelector(`[aria-category-id="${catID}"]`)
		const theDteSelect = document.querySelector(`select[aria-select-type="date"]`)
		const currentDate = +theDteSelect.selectedIndex

		renders.renderSpiner(parentResults)
		await fetchs.wait(5)

		states.saveStateObjectByDate(currentDate)
		states.saveStateObjectByCategory(catID)

		sorts.sortDataByDate()
		sorts.sortDataByCategory(catID)

		renders.renderResults(parentResults, sorts.sortDataByLimit)
	} catch (err) {
		console.log(err)
	}
}
async function controllerLoadResultsByLayout(theNode, catID) {
	const parentResults = document.querySelector(`[aria-category-id="${catID}"]`)
	const type = +theNode.getAttribute("aria-select-id")

	renders.renderSpiner(parentResults)
	await fetchs.wait(5)

	states.saveStateObjectByCategory(catID)
	states.saveStateObjectByLayout(type)

	sorts.sortDataByDate()
	sorts.sortDataByCategory(catID)

	renders.renderResults(parentResults, sorts.sortDataByLimit)
	renders.renderLayoutBtn()
}
/* events */
function dispatcher(e) {
	e.preventDefault()
	const theNode = e.target
	const selectDate = theNode.closest("[aria-select-type=date] .select-item")
	const selectLayout = theNode.closest("[aria-select-type=grid]") || theNode.closest("[aria-select-type=line]")

	if (selectDate) {
		controllerLoadResultsByDate(1)
		controllerLoadResultsByDate(4)
	}
	if (selectLayout) {
		controllerLoadResultsByLayout(selectLayout, 1)
		controllerLoadResultsByLayout(selectLayout, 4)
	}
}
if (window.location.pathname === "/") {
	controllerLoadResults(1)
	controllerLoadResults(4)
	document.querySelector(".filter").addEventListener("click", dispatcher)
}

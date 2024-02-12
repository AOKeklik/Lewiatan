import * as fetchs from "../components-fetchapp/FetchData.js"
import * as renders from "../components-fetchapp/RenderData.js"
import * as sorts from "../components-fetchapp/SortData.js"
import * as states from "../components-fetchapp/State.js"

const parentResults = document.querySelector("[role=root]")
const parentPagination = document.getElementById("pagination")

async function controllerLoadResults() {
	try {
		// const parent = parent.getAttribute("aria-category-fixed")
		// const categoryId = +parent.getAttribute("data-category-id")

		renders.renderFilterNames("date")
		renders.renderLayoutBtn()
		renders.renderSpiner(parentResults)

		await fetchs.wait(3)
		await fetchs.loadResults()

		states.saveStateObjectByCategory(1)

		sorts.sortDataByDate()
		sorts.sortDataByCategory(1)

		renders.renderResults(parentResults, sorts.sortDataByPagination)
		renders.renderPagination(parentPagination)
	} catch (err) {
		console.log(err)
	}
}
async function controllerLoadResultsByDate() {
	try {
		const theDteSelect = document.querySelector(`select[aria-select-type="date"]`)
		const currentDate = +theDteSelect.selectedIndex

		renders.renderSpiner(parentResults)

		await fetchs.wait(5)

		states.saveStateObjectByDate(currentDate)

		sorts.sortDataByDate()
		sorts.sortDataByCategory()

		renders.renderResults(parentResults, sorts.sortDataByPagination)
		renders.renderPagination(searchPagination)
		renders.renderFilterNames()
	} catch (err) {
		console.log(err)
	}
}
async function constrollerLoadResultsByCategory() {
	try {
		const theDteSelect = document.querySelector(`select[aria-select-type=category]`)
		const currentCategory = +theDteSelect.value

		renders.renderSpiner(parentResults)

		await fetchs.wait(5)

		states.saveStateObjectByCategory(currentCategory)
		states.saveStateObjectByPage(1)

		sorts.sortDataByDate()
		sorts.sortDataByCategory()

		renders.renderResults(parentResults, sorts.sortDataByLimit)
		renders.renderPagination(searchPagination)
		renders.renderFilterNames()
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
function controllerPagination() {
	parentPagination.addEventListener("click", function (e) {
		e.preventDefault()
		const theNode = e.target.closest(".pagination-btn")
		if (!theNode) return
		let thePage = +theNode.dataset.page

		states.saveStateObjectByPage(thePage)

		renders.renderResults(parentResults, sorts.sortDataByPagination)
		renders.renderPagination(parentPagination)
	})
}
/* events */
function dispatcher(e) {
	e.preventDefault()
	const theNode = e.target
	const selectDate = theNode.closest("[aria-select-type=date] .select-item")
	const selectCategory = theNode.closest("[aria-select-type=category] .select-item")
	const selectLayout = theNode.closest("[aria-select-type=grid]") || theNode.closest("[aria-select-type=line]")

	if (selectDate) controllerLoadResultsByDate()
	if (selectCategory) constrollerLoadResultsByCategory()
	if (selectLayout) controllerLoadResultsByLayout(selectLayout)
}
if (window.location.pathname === "/lokalnosc-w-lewiatanie.html") {
	controllerLoadResults(1)
	controllerPagination()
	document.querySelector(".filter").addEventListener("click", dispatcher)
}
if (window.location.pathname === "/eksperci-w-lokalnosci.html") {
	controllerLoadResults(4)
	controllerPagination()
	document.querySelector(".filter").addEventListener("click", dispatcher)
}

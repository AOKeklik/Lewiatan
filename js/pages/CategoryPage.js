import * as fetchs from "../components-fetchapp/FetchData.js"
import * as renders from "../components-fetchapp/RenderData.js"
import * as sorts from "../components-fetchapp/SortData.js"
import * as states from "../components-fetchapp/State.js"

const parentResults = document.querySelector("[role=root]")
const parentPagination = document.getElementById("pagination")

async function controllerLoadResults(catID) {
	try {
		// const parent = parent.getAttribute("aria-category-fixed")
		// const categoryId = +parent.getAttribute("data-category-id")

		renders.renderLayoutBtn()
		renders.renderSpiner(parentResults)

		await fetchs.wait(3)
		await fetchs.loadResults()

		states.saveStateObjectByCategory(catID)
		states.saveStateObjectByPage(1)
		renders.renderFilterNames()

		sorts.sortDataByDate()
		sorts.sortDataByCategory(catID)

		renders.renderResults(parentResults, sorts.sortDataByPagination)
		renders.renderPagination(parentPagination)
	} catch (err) {
		console.log(err)
	}
}
async function controllerLoadResultsByDate() {
	try {
		const parentPagination = document.querySelector(".pagination")
		const theDteSelect = document.querySelector(`select[aria-select-type="date"]`)
		const currentDate = +theDteSelect.selectedIndex

		renders.renderSpiner(parentResults)

		await fetchs.wait(5)

		states.saveStateObjectByDate(currentDate)

		sorts.sortDataByDate()
		sorts.sortDataByCategory()

		renders.renderResults(parentResults, sorts.sortDataByPagination)
		renders.renderPagination(parentPagination)
		renders.renderFilterNames()
	} catch (err) {
		console.log(err)
	}
}
async function constrollerLoadResultsByCategory() {
	try {
		const parentPagination = document.querySelector(".pagination")
		const theDteSelect = document.querySelector(`select[aria-select-type=category]`)
		const currentCategory = +theDteSelect.value

		renders.renderSpiner(parentResults)

		await fetchs.wait(5)

		states.saveStateObjectByCategory(currentCategory)
		states.saveStateObjectByPage(1)

		sorts.sortDataByDate()
		sorts.sortDataByCategory()

		renders.renderResults(parentResults, sorts.sortDataByPagination)
		renders.renderPagination(parentPagination)
		renders.renderFilterNames()
	} catch (err) {
		console.log(err)
	}
}
async function controllerLoadResultsByLayout(theNode) {
	const type = +theNode.getAttribute("aria-select-id")

	renders.renderSpiner(parentResults)
	await fetchs.wait(5)

	states.saveStateObjectByLayout(type)

	renders.renderResults(parentResults, sorts.sortDataByPagination)
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
	document.addEventListener("DOMContentLoaded", () => controllerLoadResults(1))
	controllerPagination()
	document.querySelector(".filter").addEventListener("click", dispatcher)
}
if (window.location.pathname === "/eksperci-w-lokalnosci.html") {
	document.addEventListener("DOMContentLoaded", () => controllerLoadResults(4))
	controllerPagination()
	document.querySelector(".filter").addEventListener("click", dispatcher)
}

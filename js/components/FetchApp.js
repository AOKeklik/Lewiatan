import { loadResults, wait } from "../components-fetchapp/FetchData.js"
import {
	renderFilterNames,
	renderLayout,
	renderLayoutBtn,
	renderPagination,
	renderResults,
	renderSpiner,
} from "../components-fetchapp/RenderData.js"
import {
	sortDataByCategory,
	sortDataByDate,
	sortDataByPagination,
} from "../components-fetchapp/SortData.js"
import {
	saveStateObjectByCategory,
	saveStateObjectByDate,
	saveStateObjectByLayout,
	saveStateObjectByPage,
} from "../components-fetchapp/State.js"

/* App JS */
async function controllerLoadResults() {
	try {
		const parentResults = document.querySelector(".results")
		// const parentPagination = document.querySelector(".pagination")
        console.log(parentPagination)

		renderFilterNames()
		renderLayoutBtn()
		renderSpiner(parentResults)
		await wait(3)
		await loadResults()

		sortDataByDate()
		sortDataByCategory()

		renderResults(parentResults, sortDataByPagination())
		// renderPagination(parentPagination)
	} catch (err) {
		console.log(err)
	}
}
async function controllerLoadResultsByDate(e) {
	try {
		const parentResults = document.querySelector(".results")
		const parentPagination = document.querySelector(".pagination")

		saveStateObjectByDate()
		saveStateObjectByCategory(true)

		renderSpiner(parentResults)
		await wait(3)

		sortDataByDate()

		renderResults(parentResults, sortDataByPagination())
		renderPagination(parentPagination)
		renderFilterNames()
	} catch (err) {
		console.log(err)
	}
}
async function controllerLoadResultsByCategory(e) {
	try {
		const parentResults = document.querySelector(".results")
		const parentPagination = document.querySelector(".pagination")

		saveStateObjectByCategory()
		saveStateObjectByPage(1)

		renderSpiner(parentResults)
		await wait(3)

		sortDataByDate()
		sortDataByCategory()

		renderResults(parentResults, sortDataByPagination())
		renderPagination(parentPagination)
		renderFilterNames()
	} catch (err) {
		console.log(err)
	}
}
function controllerPagination() {
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
async function controllerLayout(e) {
	const parentElement = document.querySelector(".results")
	const parendClone = parentElement.cloneNode(true)

	saveStateObjectByLayout()

	renderSpiner(parentElement)
	await wait(3)

	renderLayout(parendClone, parentElement, e)
	renderLayoutBtn()
}
/* App JS */
/* events */
function executeClickEvents(e) {
	e.preventDefault()
	let theNode = e.target.closest("[class^=filter-]")

	if (!theNode) return
	theNode = theNode.classList

	if (theNode.contains("filter-date")) controllerLoadResultsByDate(e)
	if (theNode.contains("filter-cat")) controllerLoadResultsByCategory(e)
	if (theNode.contains("filter-grid") || theNode.contains("filter-horizontal"))
		controllerLayout(e)
}
// window.onload = function () {
	controllerLoadResults()
	controllerPagination()
// }
document
	.querySelector(".filter")
	.addEventListener("click", executeClickEvents)
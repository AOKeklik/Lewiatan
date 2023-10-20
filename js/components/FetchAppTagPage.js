import { loadResults, wait } from "../components-fetchapp/FetchData.js"
import {
	renderFilterTagNames,
	renderLayoutBtn,
	renderPagination,
	renderResults,
	renderSpiner,
} from "../components-fetchapp/RenderData.js"
import {
	sortDataByDate,
	sortDataByPagination,
	sortDataByTag,
} from "../components-fetchapp/SortData.js"
import {
	saveStateObjectByDate,
	saveStateObjectByLayout,
	saveStateObjectByPage,
	saveStateObjectByTag,
	state,
} from "../components-fetchapp/State.js"

async function controllerLoadResults() {
	try {
		const parentResults = document.querySelector(`.results`)
		const parentPagination = document.querySelector(".pagination")

		// renderFilterTagNames("all", "działania Lewiatana")
		renderFilterTagNames()
		renderLayoutBtn()
		renderSpiner(parentResults)

		await wait(3)
		await loadResults()

		/* działania Lewiatana 0 */
		/* owoce i warzywa 1 */
		// saveStateObjectByCategory(1)

		sortDataByDate()
		sortDataByTag()

		renderResults(parentResults, sortDataByPagination())
		renderPagination(parentPagination)
	} catch (err) {
		console.log(err)
	}
}
async function controllerLoadResultsByDate() {
	try {
		const parentResults = document.querySelector(`.results`)
		const parentPagination = document.querySelector(".pagination")

		saveStateObjectByDate()

		renderSpiner(parentResults)
		await wait(5)

		sortDataByDate()
		sortDataByTag()

		renderResults(parentResults, sortDataByPagination())
		renderPagination(parentPagination)
		renderFilterTagNames()
	} catch (err) {
		console.log(err)
	}
}
async function controllerLoadResultsByTag() {
	try {
		const parentResults = document.querySelector(".results")
		const parentPagination = document.querySelector(".pagination")

		saveStateObjectByTag()
		saveStateObjectByPage(1)

		renderSpiner(parentResults)
		await wait(3)

		sortDataByDate()
		sortDataByTag()
		console.log(state.data)

		renderResults(parentResults, sortDataByPagination())
		renderPagination(parentPagination)
		renderFilterTagNames()
	} catch (err) {
		console.log(err)
	}
}
async function controllerLayout() {
	const parentElement = document.querySelector(`.results`)

	saveStateObjectByLayout()

	renderSpiner(parentElement)
	await wait(5)

	renderResults(parentElement, sortDataByPagination())
	renderLayoutBtn()
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
/* events */
function executeClickEvents(e) {
	e.preventDefault()
	let theNode = e.target.closest("[class^=filter-]")

	if (!theNode) return

	if (theNode.closest(".filter-date")) controllerLoadResultsByDate()
	if (theNode.closest(".filter-cat")) controllerLoadResultsByTag()

	if (
		theNode.closest(".filter-grid") ||
		theNode.closest(".filter-horizontal")
	) {
		controllerLayout()
	}
}
if (window.location.pathname === "/") {
	controllerLoadResults()
	controllerPagination()
	document.querySelector(".filter").addEventListener("click", executeClickEvents)
}

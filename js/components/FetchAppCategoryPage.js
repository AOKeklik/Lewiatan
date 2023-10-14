import { loadResults, wait } from "../components-fetchapp/FetchData.js"
import {
	renderFilterNames,
	renderLayoutBtn,
	renderPagination,
	renderResults,
	renderSpiner,
} from "../components-fetchapp/RenderData.js"
import {
	sortDataByCategory,
	sortDataByDate,
	sortDataByLimit,
	sortDataByPagination,
} from "../components-fetchapp/SortData.js"
import {
	saveStateObjectByCategory,
	saveStateObjectByDate,
	saveStateObjectByLayout,
	saveStateObjectByPage,
} from "../components-fetchapp/State.js"
import { POSTS_PER_CATEGORY_PAGE } from "../components-fetchapp/config.js"

async function controllerLoadResults() {
	try {
		const parentResults = document.querySelector(`.results`)
		const parentPagination = document.querySelector(".pagination")

		renderFilterNames()
		renderLayoutBtn()
		renderSpiner(parentResults)

		await wait(3)
		await loadResults()

		sortDataByDate()
		sortDataByCategory()
		sortDataByCategory()

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
		saveStateObjectByCategory()

		renderSpiner(parentResults)
		await wait(5)

		sortDataByDate()

		renderResults(parentResults, sortDataByPagination())
		renderPagination(parentPagination)
		renderFilterNames()
	} catch (err) {
		console.log(err)
	}
}
async function controllerLoadResultsByCategory() {
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
	if (theNode.closest(".filter-cat")) controllerLoadResultsByCategory()

	if (
		theNode.closest(".filter-grid") ||
		theNode.closest(".filter-horizontal")
	) {
		controllerLayout()
	}
}
document.querySelector(".filter").addEventListener("click", executeClickEvents)
if (window.location.pathname === "/") {
	controllerLoadResults()
	controllerPagination()
}

import { loadResults, wait } from "../components-fetchapp/FetchData.js"
import {
	renderFilterNames,
	renderLayoutBtn,
	renderResults,
	renderSpiner,
} from "../components-fetchapp/RenderData.js"
import {
	sortDataByCategory,
	sortDataByDate,
	sortDataByLimit,
} from "../components-fetchapp/SortData.js"
import {
	saveStateObjectByCategory,
	saveStateObjectByDate,
	saveStateObjectByLayout,
	state,
} from "../components-fetchapp/State.js"

async function controllerLoadResults(direct) {
	try {
		const parentResults = document.querySelector(`.results-${direct}`)

		renderFilterNames("date")
		renderLayoutBtn()
		renderSpiner(parentResults)

		await wait(3)
		await loadResults()

		saveStateObjectByCategory(
			direct === "top"
				? /* Lokalność w Lewiatanie */ 1
				: /* Eksperci w lokalności */ 0
		)

		sortDataByDate()
		sortDataByCategory()

		// console.log(direct, state.data)

		renderResults(parentResults, sortDataByLimit(3))
	} catch (err) {
		console.log(err)
	}
}
async function controllerLoadResultsByDate(direct) {
	try {
		const parentResults = document.querySelector(`.results-${direct}`)

		if (direct === "top") saveStateObjectByDate()

		renderSpiner(parentResults)
		await wait(5)

		saveStateObjectByCategory(
			direct === "top"
				? /* Lokalność w Lewiatanie */ 1
				: /* Eksperci w lokalności */ 0
		)

		sortDataByDate()
		sortDataByCategory()

		console.log(direct, state.data)

		renderResults(parentResults, sortDataByLimit(3))
		renderFilterNames("date")
	} catch (err) {
		console.log(err)
	}
}
async function controllerLayout(e, direct) {
	const parentElement = document.querySelector(`.results-${direct}`)

	if (direct === "top") saveStateObjectByLayout()

	renderSpiner(parentElement)
	await wait(5)

	saveStateObjectByCategory(
		direct === "top"
			? /* Lokalność w Lewiatanie */ 1
			: /* Eksperci w lokalności */ 0
	)

	sortDataByDate()
	sortDataByCategory()

	renderResults(parentElement, sortDataByLimit(3))
	renderLayoutBtn()
}
/* events */
function executeClickEvents(e) {
	e.preventDefault()
	let theNode = e.target.closest("[class^=filter-]")

	if (!theNode) return

	if (theNode.closest(".filter-date")) {
		controllerLoadResultsByDate("top")
		controllerLoadResultsByDate("bottom")
	}

	if (
		theNode.closest(".filter-grid") ||
		theNode.closest(".filter-horizontal")
	) {
		controllerLayout(e, "top")
		controllerLayout(e, "bottom")
	}
}
if (window.location.pathname === "/") {
	controllerLoadResults("top")
	controllerLoadResults("bottom")
	document
		.querySelector(".filter")
		.addEventListener("click", executeClickEvents)
}

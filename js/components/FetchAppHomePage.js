import { loadResults, wait } from "../components-fetchapp/FetchData.js"
import {
	renderFilterNames,
	renderLayout,
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

		sortDataByDate()
		sortDataByCategory(
			direct === "top" ? "Eksperci w lokalności" : "Lokalność w Lewiatanie"
		)

		renderResults(parentResults, sortDataByLimit(3))
		console.log(state.data)
	} catch (err) {
		console.log(err)
	}
}
async function controllerLoadResultsByDate(direct) {
	try {
		const parentResults = document.querySelector(`.results-${direct}`)
		console.log(parentResults)

		if (direct === "top") saveStateObjectByDate()

		renderSpiner(parentResults)
		await wait(5)

		sortDataByDate()
		sortDataByCategory(
			direct === "top" ? "Eksperci w lokalności" : "Lokalność w Lewiatanie"
		)

		renderResults(parentResults, sortDataByLimit(3))
		renderFilterNames("date")
	} catch (err) {
		console.log(err)
	}
}
if (window.location.pathname === "/") {
	controllerLoadResults("top")
	controllerLoadResults("bottom")
}
async function controllerLayout(e, direct) {
	const parentElement = document.querySelector(`.results-${direct}`)
	const parendClone = parentElement.cloneNode(true)

	if (direct === "top") saveStateObjectByLayout()

	renderSpiner(parentElement)
	await wait(5)

	renderLayout(parendClone, parentElement)
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
document.querySelector(".filter").addEventListener("click", executeClickEvents)

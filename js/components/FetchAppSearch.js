import { loadSearchResults, wait } from "../components-fetchapp/FetchData.js"
import {
	renderPagination,
	renderResults,
	renderSpiner,
} from "../components-fetchapp/RenderData.js"
import {
	sortDataByCategory,
	sortDataByDate,
	sortDataByPagination,
} from "../components-fetchapp/SortData.js"
import { saveStateObjectByLink, saveStateObjectByPage, state } from "../components-fetchapp/State.js"

const root = document.querySelector(".results")
const paginationElement = document.querySelector(".pagination")
const searchElement = document.querySelector(".nav-search--input")
const searchform = document.querySelector("form")

async function controllerLoadResultsBySearch(e) {
	try {
		const theValue = searchElement.value
		if (!theValue) return

		await loadSearchResults(theValue)
		await renderSpiner(root)
		await wait(3)

		sortDataByDate()
		sortDataByCategory()

		renderResults(root, sortDataByPagination())
		renderPagination(paginationElement)
	} catch (err) {
		console.log(err)
	}
}
async function controllerLoadResultsBySearchInHomePage(e) {
	try {
		const theValue = searchElement.value
		if (!theValue) return

		document.body.insertAdjacentHTML(
			"afterbegin",
			`
			<div class="searchpop">
				<div class="searchpop-icon">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93A10 10 0 0 1 2.93 17.07zm1.41-1.41A8 8 0 1 0 15.66 4.34A8 8 0 0 0 4.34 15.66zm9.9-8.49L11.41 10l2.83 2.83l-1.41 1.41L10 11.41l-2.83 2.83l-1.41-1.41L8.59 10L5.76 7.17l1.41-1.41L10 8.59l2.83-2.83l1.41 1.41z"/></svg>
				</div>

				<div id="results-pop" class="row">
				</div>
				<div class="pagination" id="pagination-pop">
				</div>
			</div>
		`
		)
		document.body.style.overflow = "hidden"
		document
			.querySelector(".searchpop-icon")
			.addEventListener("click", async function () {
				e.preventDefault()
				const popup = document.querySelector(".searchpop")
				document.body.style = ""
				popup.style.transform = "translateY(-5rem)"
				popup.style.opacity = "0"
				await wait(3)
				popup.remove()
			})

		const root = document.querySelector("#results-pop")
		const paginationElement = document.querySelector("#pagination-pop")
		console.log(root)
		controllerPagination()

		await renderSpiner(root)
		await loadSearchResults(theValue)
		await wait(3)

		sortDataByDate()

		renderResults(root, sortDataByPagination())
		renderPagination(paginationElement)
	} catch (err) {
		console.log(err)
	}
}
function controllerPagination() {
	const parentResults = document.querySelector("#results-pop")
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
function controllerGetPostId (e) {
	const theNode = e.target.closest("#post-link")
	if (!theNode) return

	const theCat = theNode.dataset.cat
	const theLink = state.sortCategories.categories.find(n => {
		return n.name === theCat
	})?.link

	const path = theLink.split('/').filter(Boolean)
	const pathLenght = path.length - 1

	saveStateObjectByLink(path[pathLenght])
}
/* events */
if (
	window.location.pathname !== "/category/lokalnosc-w-lewiatanie/" ||
	window.location.pathname !== "/category/eksperci-w-lokalnosci/"
)
	searchElement.addEventListener("keyup", controllerLoadResultsBySearch)
else {
	searchform.addEventListener(
		"submit",
		controllerLoadResultsBySearchInHomePage
	)
}
searchform.addEventListener("submit", function (e) {
	e.preventDefault()
})
document.querySelector(".grid")?.addEventListener("click", controllerGetPostId)

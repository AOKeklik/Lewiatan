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

const root = document.querySelector(".results")
const paginationElement = document.querySelector(".pagination")
const searchElement = document.querySelector(".nav-search--input")

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
searchElement.addEventListener("keyup", controllerLoadResultsBySearch)

import * as states from "../components-fetchapp/State.js"
import { HOMEPAGE_LIMIT } from "./config.js"

export function sortDataByDate() {
	const date = states.state.sortDate
	let sortedData

	sortedData = states.state.results.posts
		.slice()
		.sort((a, b) => new Date(date === 0 ? a.date : b.date) - new Date(date === 0 ? b.date : a.date))

	states.state.data = sortedData
}
export function sortDataByCategory(catID = null) {
	const theId = catID ? catID : states.state.sortCategories.currentCategory.id

	let sortedData
	sortedData =
		theId === -1
			? states.state.data.slice()
			: states.state.data.slice().filter(el => {
					return el.categories.some(n => {
						return n.id === theId
					})
			  })

	states.state.data = sortedData
}
export function sortDataByTag() {
	let sortedData

	sortedData = !states.state.sortTags.currentSort
		? states.state.data.slice()
		: states.state.data.slice().filter(el => {
				return el.tags.some(n => {
					return n.name === states.state.sortTags.currentSort
				})
		  })

	states.state.data = sortedData
}
export function sortDataByPagination(page = states.state.pagination.page, dataOnly = null) {
	states.state.pagination.page = page

	const end = page * states.state.pagination.resultsPerPage
	const start = (page - 1) * states.state.pagination.resultsPerPage
	const newData = states.state.data.slice(start, end)

	if (dataOnly !== null) return states.state.data
	return newData
}
export function sortDataByLimit() {
	const limit = HOMEPAGE_LIMIT || -1
	return states.state.data.slice(0, limit)
}

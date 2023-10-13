import { state } from "./State.js"

export function sortDataByDate(date = state.sortDate) {
	let sortedData

	sortedData = state.results.posts
		.slice()
		.sort(
			(a, b) =>
			new Date(date === "true" ? a.date : b.date) -
			new Date(date === "true" ? b.date : a.date)
		)

	state.data = sortedData
}
export function sortDataByCategory(cat = null) {
	let sortedData

	state.sortCategories.currentSort = !cat
		? state.sortCategories.currentSort
		: cat

	sortedData = !state.sortCategories.currentSort
		? state.data.slice()
		: state.data.slice().filter(el => {
				return el.categories.some(n => {
					return n === state.sortCategories.currentSort
				})
		  })

	state.data = sortedData
}
export function sortDataByPagination(page = state.pagination.page) {
	state.pagination.page = page

	const end = page * state.pagination.resultsPerPage
	const start = (page - 1) * state.pagination.resultsPerPage
	const newData = state.data.slice(start, end)

	return newData
}
export function sortDataByLimit(limit = -1) {
	return state.data.slice(0, limit)
}

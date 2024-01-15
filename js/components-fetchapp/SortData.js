import { state } from "./State.js"

export function sortDataByDate() {
	const date = state.sortDate
	let sortedData

	sortedData = state.results.posts
		.slice()
		.sort(
			(a, b) =>
				new Date(date === 0 ? a.date : b.date) -
				new Date(date === 0 ? b.date : a.date)
		)

	state.data = sortedData
}
export function sortDataByCategory() {
	let sortedData

	sortedData =
		state.sortCategories.currentCategory.id === 0
			? state.data.slice()
			: state.data.slice().filter(el => {
					return el.categories.some(n => {
						return (
							n.id ===
							state.sortCategories.currentCategory
								.id
						)
					})
			  })

	state.data = sortedData
}
export function sortDataByTag() {
	let sortedData

	sortedData = !state.sortTags.currentSort
		? state.data.slice()
		: state.data.slice().filter(el => {
				return el.tags.some(n => {
					return n.name === state.sortTags.currentSort
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
export function sortDataByLimit(parent) {
	const limit = +parent.getAttribute("aria-data-limit") || -1
	return state.data.slice(0, limit)
}

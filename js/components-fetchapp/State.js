import { POSTS_PER_PAGE } from "./config.js"

export const state = {
	data: [],
	layout: "false",
	sortDate: "false",
	sortCategories: {
		sort: [],
		currentSort: null,
		categoryLength: 0,
		counter: null,
	},
	pagination: {
		page: 1,
		resultsPerPage: POSTS_PER_PAGE,
	},
	results: {
		posts: [],
	},
}

export function createStateObject(posts, categories) {
	const newData = posts.map(el => {
		return {
			id: el.id,
			link: el.link,
			date: el.date,
			categories: el.categories.map(n => {
				return categories.filter(m => m.id === n)[0].name
			}),
			title: el.title.rendered,
			content: el.content.rendered,
			excerpt: el.excerpt.rendered,
			name: el.name,
		}
	})
	return newData
}

export function createCategoriesObject(categories) {
	const newData = {}
	newData.sort = categories.map(el => el.name)
	newData.currentSort =
		JSON.parse(localStorage.getItem("categories")) &&
		JSON.parse(localStorage.getItem("categories")).currentSort
	newData.categoryLength = categories.length
	newData.counter =
		JSON.parse(localStorage.getItem("categories")) &&
		+JSON.parse(localStorage.getItem("categories")).counter

	return newData
}

export function saveStateObjectByDate() {
	state.sortDate = state.sortDate === "false" ? "true" : "false"
	localStorage.setItem("sortDate", state.sortDate)
}

export function saveStateObjectByCategory(resetCategory = false) {
	state.sortCategories.counter = resetCategory
		? state.sortCategories.categoryLength
		: state.sortCategories.counter < state.sortCategories.categoryLength
		? state.sortCategories.counter + 1
		: 0

	state.sortCategories.currentSort =
		state.sortCategories.sort[state.sortCategories.counter]

	localStorage.setItem(
		"categories",
		JSON.stringify({
			currentSort: state.sortCategories.currentSort,
			counter: state.sortCategories.counter,
		})
	)
}

export function saveStateObjectByPage(page = state.pagination.page) {
	state.pagination.page = page
	localStorage.setItem("page", page)
}

export function saveStateObjectByLayout() {
	state.layout = state.layout === "false" ? "true" : "false"
	localStorage.setItem("layout", state.layout)
}
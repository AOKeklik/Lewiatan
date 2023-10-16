import { POSTS_PER_PAGE } from "./config.js"

export const state = {
	data: [],
	layout: localStorage.getItem("layout") ?? "false",
	sortDate: localStorage.getItem("sortDate") ?? "false",
	sortCategories: {
		sort: [],
		currentSort:
			JSON.parse(localStorage.getItem("categories")) &&
			JSON.parse(localStorage.getItem("categories")).currentSort,
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

export function createStateObject(posts, categories, tags) {
	const newData = posts.map(el => {
		return {
			id: el.id,
			link: el.link,
			date: el.date,
			categories: el.categories.map(n => {
				const { name } = categories.filter(nn => nn.id === n)[0]
				return name
			}),
			tags: el.tags.map(n => {
				const { name, link } = tags.filter(nn => nn.id === n)[0]
				return { name, link }
			}),
			title: el.title.rendered,
			img: el.img,
			content: el.content.rendered,
			excerpt: el.excerpt.rendered,
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
	state.sortCategories.counter =
		resetCategory !== false
			? resetCategory
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
	console.log(state.layout)
	localStorage.setItem("layout", state.layout)
}

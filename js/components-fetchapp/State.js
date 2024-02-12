import { POSTS_PER_PAGE } from "./config.js"

/* oldest 0 - newest - 1 */
/* line 0 - grid 1 */
export const state = {
	data: [],
	layout: +localStorage.getItem("layout") ?? 0,
	sortDate: +localStorage.getItem("sortDate") ?? 0,
	sortCategories: {
		categories: [],
		currentCategory:
			localStorage.getItem("category") === null || localStorage.getItem("category") === "undefined"
				? { id: -1, name: "Wszystkie Kategorie" }
				: JSON.parse(localStorage.getItem("category")),
	},
	sortTags: {
		tags: [],
		currentTag:
			JSON.parse(localStorage.getItem("tags")) && JSON.parse(localStorage.getItem("tags")).currentSort,
	},
	pagination: {
		page: 1,
		resultsPerPage: POSTS_PER_PAGE,
	},
	results: {
		posts: [],
	},
}

/* creating */
export function createStateObject(posts, categories, tags) {
	const newData = posts.map(el => {
		return {
			id: el.id,
			link: el.link,
			date: el.date,
			categories: el.categories.map(n => {
				const { id, name, slug, link } = categories.filter(nn => nn.id === n)[0]
				return { id, name, slug, link }
			}),
			tags: el.tags.map(n => {
				const { id, name, slug, link } = tags.filter(nn => nn.id === n)[0]
				return { id, name, slug, link }
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
	newData.categories = categories.map(e => ({
		id: e.id,
		name: e.name,
		slug: e.slug,
		link: e.link,
	}))
	newData.categories.unshift({ id: -1, name: "Wszystkie Kategorie" })
	newData.currentCategory =
		localStorage.getItem("category") === null || localStorage.getItem("category") === "undefined"
			? { id: -1, name: "Wszystkie Kategorie" }
			: JSON.parse(localStorage.getItem("category"))

	return newData
}
export function createTagsObject(tags) {
	const newData = {}
	newData.tags = tags.map(e => ({
		id: e.id,
		name: e.name,
		slug: e.slug,
		link: e.link,
	}))
	newData.tags.push({
		id: 0,
		name: "Wszystko",
	})
	newData.currentTag =
		JSON.parse(localStorage.getItem("tags")) && JSON.parse(localStorage.getItem("tags")).currentTag
	newData.tagLength = tags.length

	return newData
}

/* saving */
export function saveStateObjectByDate(newDate) {
	state.sortDate = newDate
	localStorage.setItem("sortDate", state.sortDate)
}
export function saveStateObjectByCategory(catID = null) {
	const theID = catID === null ? -1 : catID
	state.sortCategories.currentCategory = state.sortCategories.categories.find(e => {
		return e.id === theID
	})
	localStorage.setItem("category", JSON.stringify(state.sortCategories.currentCategory))
}
export function saveStateObjectByTag(resetTag = false) {
	state.sortTags.counter =
		resetTag !== false
			? resetTag
			: state.sortTags.counter < state.sortTags.tagLength
			? state.sortTags.counter + 1
			: 0

	state.sortTags.currentSort = state.sortTags.sort[state.sortTags.counter]

	localStorage.setItem(
		"tags",
		JSON.stringify({
			currentSort: state.sortTags.currentSort,
			counter: state.sortTags.counter,
		})
	)
}
export function saveStateObjectByPage(page = state.pagination.page) {
	state.pagination.page = page
	localStorage.setItem("page", page)
}
export function saveStateObjectByLayout(layout) {
	state.layout = layout
	localStorage.setItem("layout", state.layout)
}
export function saveStateObjectByLink(link) {
	localStorage.setItem("link", link)
}

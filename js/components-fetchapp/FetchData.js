import { API_URL } from "./config.js"
import { state, createStateObject, createCategoriesObject } from "./State.js"

export async function fetchPosts(u1, u2) {
	try {
		const features = {
			method: "get",
			header: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		}
		const res = await Promise.all([
			fetch(API_URL + u1, features),
			fetch(API_URL + u2, features),
		])
		if (res.every(data => !data.ok)) throw new Error("Error Fetch Posts!!")
		const data = {
			posts: await res[0].json(),
			categories: await res[1].json(),
		}
		return data
	} catch (err) {
		throw err
	}
}

export function wait(ms) {
	return new Promise(resolve => setTimeout(resolve, 100 * ms))
}

export async function loadResults() {
	try {
		const { posts, categories } = await fetchPosts("posts", "categories")
		state.results.posts = createStateObject(posts, categories)
		state.pagination.page = localStorage.getItem("page")
			? +localStorage.getItem("page")
			: 1
		// state.sortDate = localStorage.getItem("sortDate") ?? "false"
		state.sortCategories = createCategoriesObject(categories)
		// state.layout = localStorage.getItem("layout") ?? "false"
	} catch (err) {
		return err
	}
}
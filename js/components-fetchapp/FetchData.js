import { API_URL } from "./config.js"
import {
    state,
    createStateObject,
    createCategoriesObject,
    createTagsObject,
} from "./State.js"

export async function fetchPosts(u1, u2, u3) {
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
            fetch(API_URL + u3, features),
        ])
        if (res.every((data) => !data.ok))
            throw new Error("Error Fetch Posts!!")
        const data = {
            posts: await res[0].json(),
            categories: await res[1].json(),
            tags: await res[2].json(),
        }
        return data
    } catch (err) {
        throw err
    }
}
export async function loadResults() {
    try {
        const { posts, categories, tags } = await fetchPosts(
            "posts",
            "categories",
            "tags"
        )
        state.results.posts = createStateObject(posts, categories, tags)
        state.sortCategories = createCategoriesObject(categories)
        state.sortTags = createTagsObject(tags)
        state.pagination.page = localStorage.getItem("page")
            ? +localStorage.getItem("page")
            : 1
    } catch (err) {
        throw err
    }
}
export async function loadSearchResults(query) {
    try {
        const { posts, categories, tags } = await fetchPosts(
            "posts?search=" + query,
            "categories",
            "tags"
        )
        state.results.posts = createStateObject(posts, categories, tags)
        state.sortCategories = createCategoriesObject(categories)
        state.pagination.page = 1
    } catch (err) {
        throw err
    }
}
export function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, 100 * ms))
}

import { state } from "./State.js"

export function renderSpiner(parentElement) {
	const markup = `<span class="spinner">Loading..</span>`
	parentElement.innerHTML = ""
	parentElement.insertAdjacentHTML("afterbegin", markup)
}
export function renderResults(parentElement, data) {
	const renderData = data
		.map(
			d => `<div class="${
				state.layout === "false" ? "col-1-of-4" : "col-1-of-1"
			}">
					<p>
						<a href="${d.link}"><strong>${d.title}</strong></a>
						<br>
						<span>${d.date}</span>
						<br>
						<span>${d.categories.join(", ")}</span>
					</p>
					<p>${d.content}</p>
				</div>
			`
		)
		.join("")
	parentElement.innerHTML = ""
	parentElement.insertAdjacentHTML("afterbegin", renderData)
}
export function renderPagination(parentElement) {
	const pageCurrent = state.pagination.page
	const pageLength = Math.ceil(
		state.data.length / state.pagination.resultsPerPage
	)
	const pagePrev = pageCurrent - 1
	const pageNext = pageCurrent + 1

	let markup

	if (pageCurrent === 1 && pageLength > 1)
		markup = `
			<span class="pagination-text">Strona ${pageCurrent} z ${pageLength}</span>	
			<button class="pagination-btn active-pagination" data-page=" ${pageCurrent}">${pageCurrent}</button>	
			<button class="pagination-btn" data-page="${pageNext}">następna strona</button>
		`
	else if (pageCurrent === pageLength && pageLength > 1)
		markup = `
				<span class="pagination-text">Strona ${pageCurrent} z ${pageLength}</span>	
				<button class="pagination-btn" data-page="${pagePrev}">poprzednia strona</button>
				<button class="pagination-btn active-pagination" data-page=" ${pageCurrent}">${pageCurrent}</button>	
			`
	else if (pageCurrent < pageLength)
		markup = `
				<span class="pagination-text">Strona ${pageCurrent} z ${pageLength}</span>	
				<button class="pagination-btn" data-page="${pagePrev}">poprzednia strona</button>
				<button class="pagination-btn active-pagination" data-page=" ${pageCurrent}">${pageCurrent}</button>	
				<button class="pagination-btn" data-page="${pageNext}">następna strona</button>
			`
	else markup

	parentElement.innerHTML = ""
	parentElement.insertAdjacentHTML("beforeend", markup)
}
export function renderFilterNames() {
	const parentDate = document.querySelector(".filter-date")
	const parentCategories = document.querySelector(".filter-cat")

	console.log(state.sortCategories.currentSort)

	parentDate.innerHTML =
		state.sortDate === "false" ? "Najnowszy" : "Najstarszy"

	parentCategories.innerHTML = !state.sortCategories.currentSort
		? "Wszystkie Kategorie"
		: state.sortCategories.currentSort
}
export function renderLayout(theClone, parent, e) {
	const theNode = e.target
	const theName = theNode.className

	parent.innerHTML = ""

	let i = 0
	while (i < theClone.children.length) {
		state.layout && theName === "btn-grid"
			? (theClone.children[i].className = "col-1-of-4")
			: (theClone.children[i].className = "col-1-of-1")
		parent.insertAdjacentElement(
			"afterbegin",
			theClone.children[i].cloneNode(true)
		)
		i++
	}
}
export function renderLayoutBtn() {
	const theName = state.layout === "false" ? ".filter-grid" : ".filter-horizontal"
	document.querySelector(".active-layout")?.classList.remove("active-layout")
	document.querySelector(theName).classList.add("active-layout")
}
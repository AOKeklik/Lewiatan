import { state } from "./State.js"
import { convertedDate, stripHtml } from "./Utilities.js"

export function renderSpiner(parentElement) {
	const markup = `<span class="spinner">&#9697;</span>`
	parentElement.innerHTML = ""
	parentElement.insertAdjacentHTML("afterbegin", markup)
}
export function renderResults(parentElement, data) {
	if (state.layout === "true") parentElement.classList.remove("bg-paper")
	if (state.layout === "false") parentElement.classList.add("bg-paper")

	const renderData = data
		.map((d, i) => {
			return `<div class="${
				state.layout === "false" ? "col-1-of-3" : "col-1-of-1 bg-paper"
			}">
					<div class="card-header">
						<span class="card-date">${convertedDate(d.date)}</span>
						<div class="card-img" style="background-image:url('${d.img}');"></div>
					</div>
					<div class="card-body">
						<h3 class="card-title">${d.title}</h3>
						<p class="card-desc">${stripHtml(d.content)}</p>
						<div class="card-btn">
							<p class="card-btn-tags">
								${
									state.layout === "true"
										? d.tags
												.map(
													el =>
														`
												<a href="${el.link}">
													${el.name}
												</a>`
												)
												.join(
													'<span class="card-separator"> | </span>'
												)
										: ""
								}
							</p>
							<a href="${d.link}" class="btn btn-primary">czytaj dalej...</a>
						</div>
					</div>
				</div>
			`
		})
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

	let markup = ""

	if (pageCurrent === 1 && pageLength > 1)
		markup = `
			<div class="pagination-left">
				<span class="pagination-text">
					Strona <span class="color-secondary">${pageCurrent}</span> z 
					<span class="color-secondary">${pageLength}</span>
				</span>	
				<button class="pagination-btn pagination-btn-page active-pagination" data-page="${pageCurrent}">${pageCurrent}</button>	
				<button class="pagination-btn pagination-btn-page" data-page="${pageNext}">${pageNext}</button>
			</div>
			<button class="pagination-btn pagination-btn-page" data-page="${pageNext}">następna strona</button>
		`
	else if (pageCurrent === pageLength && pageLength > 1)
		markup = `
			<div class="pagination-left">
				<span class="pagination-text">
					Strona <span class="color-secondary">${pageCurrent}</span> z 
					<span class="color-secondary">${pageLength}</span>
				</span>		
				<button class="pagination-btn pagination-btn-page" data-page="${pagePrev}">poprzednia strona</button>
				<button class="pagination-btn pagination-btn-page" data-page="${pagePrev}">${pagePrev}</button>
				<button class="pagination-btn pagination-btn-page active-pagination" data-page=" ${pageCurrent}">${pageCurrent}</button>
			</div>	
		`
	else if (pageCurrent < pageLength)
		markup = `
			<div class="pagination-left">
				<span class="pagination-text">
					Strona <span class="color-secondary">${pageCurrent}</span> z 
					<span class="color-secondary">${pageLength}</span>
				</span>	
				<button class="pagination-btn pagination-btn-page" data-page="${pagePrev}">poprzednia strona</button>
				<button class="pagination-btn pagination-btn-page" data-page="${pagePrev}">${pagePrev}</button>
				<button class="pagination-btn pagination-btn-page active-pagination" data-page=" ${pageCurrent}">${pageCurrent}</button>
				<button class="pagination-btn pagination-btn-page" data-page="${pageNext}">${pageNext}</button>
			</div>	
			<button class="pagination-btn pagination-btn-page" data-page="${pageNext}">następna strona</button>
		`
	else markup

	parentElement.innerHTML = ""
	parentElement.insertAdjacentHTML("beforeend", markup)
}
export function renderFilterNames(type = "all") {
	const parentDate = document.querySelector(
		".filter-date > .filter-sort-text"
	)
	parentDate.innerHTML =
		state.sortDate === "false" ? "Najnowszy" : "Najstarszy"

	if (type !== "all") return

	const parentCategories = document.querySelector(
		".filter-cat > .filter-sort-text"
	)
	parentCategories.innerHTML = !state.sortCategories.currentSort
		? "Wszystkie Kategorie"
		: state.sortCategories.currentSort
}
export function renderLayoutBtn() {
	const theName =
		state.layout === "false" ? ".filter-grid" : ".filter-horizontal"
	document.querySelector(".active-layout")?.classList.remove("active-layout")
	document.querySelector(theName).classList.add("active-layout")
}

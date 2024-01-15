import { state } from "./State.js"
import { convertedDate, stripHtml } from "./Utilities.js"

export function renderSpiner(parent) {
	const markup = `<div class="p-y-l flex flex-center">
		<span class="spinner">&#9697;</span>
	</div>`
	parent.innerHTML = ""
	parent.insertAdjacentHTML("afterbegin", markup)
}
// export function renderResults(parentElement, data) {
// 	if (state.layout === "true") parentElement.classList.remove("bg-paper")
// 	if (state.layout === "false") parentElement.classList.add("bg-paper")
// 	const renderData = data
// 		.map(d => {
// 			return `<div class="${
// 				state.layout === "false"
// 					? "col-1-of-3"
// 					: "col-1-of-1 bg-paper"
// 			}">
// 					<div class="card-header">
// 						<span class="card-date">${convertedDate(d.date)}</span>
// 						<div class="card-img" style="background-image:url('${d.img}');"></div>
// 					</div>
// 					<div class="card-body">
// 						<a id="post-link" href="${d.link}" data-cat="${
// 				d.categories[0]
// 			}"><h3 class="card-title">${d.title}</h3></a>
// 						<p class="card-desc">${stripHtml(d.content)}</p>
// 						<div class="card-btn">
// 							<p class="card-btn-tags">
// 								${
// 									state.layout === "true"
// 										? d.tags
// 												.map(
// 													el =>
// 														`
// 												<a href="${el.link}">
// 													${el.name}
// 												</a>`
// 												)
// 												.join(
// 													'<span class="card-separator"> | </span>'
// 												)
// 										: ""
// 								}
// 							</p>
// 							<a href="${d.link}" class="btn btn-primary">czytaj dalej...</a>
// 						</div>
// 					</div>
// 				</div>
// 			`
// 		})
// 		.join("")

// 	parentElement.innerHTML = ""
// 	parentElement.insertAdjacentHTML("afterbegin", renderData)
// }
export function renderResults(parentElement, data) {
	let renderPostsGrid = () => {
		return data
			.map(d => {
				return `<div class="col1of3">
			<div class="flex flex-center">
				<div class="w50">
					<span class="text-s m-b-s box-i-block">${convertedDate(d.date)}</span>
					<div class="bg-img-cov h20 m-b-s"
						style="background-image:url('${d.img}');"></div>
					<a href="${d.link}">
						<h3 class="heading-quaternary text-fifth m-b-s">${d.title}</h3>
					</a>
					<p class="paragraph-primary m-b-s">
						Lokalne produkty to dla mnie gwarancja świeżości i wspaniałego smaku potraw.
						Wybieram
						właśnie takie – których dostarczenie do sklepu zajęło pół godziny...
					</p>
					<a href="${d.link}" class="btn btn-primary">czytaj dalej...</a>
				</div>
			</div>
		</div>`
			})
			.join("")
	}
	let renderData = `<div class="container-bigger bg-paper-light">
			<div class="container p-y-s">
				<div class="row results-top">
					${renderPostsGrid()}
				</div>
			</div>
		</div>`

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
export function renderFilterNames(parent) {
	const isDateLabel = parent.getAttribute("aria-filter-date")
	const isCategoryLabel = parent.getAttribute("aria-filter-category")

	/* sort by just date */
	if (isDateLabel === "true") {
		const status = state.sortDate === "false"
		const theSelect = parent.querySelector("[aria-select-type=date]")
		const theSelectLabel = parent.querySelector(".select-label")
		const theSelecItem = parent.querySelectorAll(".select-item")

		theSelect.selectedIndex = status ? 0 : 1
		theSelectLabel.innerHTML = status ? "Najnowsze" : "Najstarszy"
		theSelecItem.forEach(el => {
			el.setAttribute("aria-selected", "false")
			if (el.innerHTML === theSelectLabel.innerHTML)
				el.setAttribute("aria-selected", "true")
		})
	}

	/* sort by ... */
	if (isCategoryLabel === "false") return

	const parentCategories = document.querySelector(
		".filter-cat > .filter-sort-text"
	)

	parentCategories.innerHTML =
		catName !== null
			? catName
			: !state.sortCategories.currentSort
			? "Wszystkie Kategorie"
			: state.sortCategories.currentSort
}
export function renderFilterTagNames(type = "all", catName = null) {
	const parentDate = document.querySelector(
		".filter-date > .filter-sort-text"
	)
	parentDate.innerHTML =
		state.sortDate === "false" ? "Najnowszy" : "Najstarszy"

	if (type !== "all") return

	const parentCategories = document.querySelector(
		".filter-cat > .filter-sort-text"
	)

	parentCategories.innerHTML =
		catName !== null
			? catName
			: !state.sortTags.currentSort
			? "Wszystkie Tagi"
			: state.sortTags.currentSort
}
export function renderLayoutBtn(parent) {
	const theButtons = parent.querySelectorAll("[aria-controls]")

	const theName = state.layout === "false" ? "grid" : "line"

	theButtons.forEach(el => {
		if (el.getAttribute("aria-controls") === theName)
			el.setAttribute("aria-current", "true")
		else el.setAttribute("aria-current", "false")
	})
}

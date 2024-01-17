import { state } from "./State.js"
import * as utls from "./Utilities.js"

export function renderSpiner(parent) {
	const markup = `<div class="p-y-l flex flex-center">
		<span class="spinner">&#9697;</span>
	</div>`
	parent.innerHTML = ""
	parent.insertAdjacentHTML("afterbegin", markup)
}
export function renderResults(parentElement, data) {
	const renderPostsGrid = () => {
		let markup = ``
		data(parentElement).forEach((d, i) => {
			if (i % 3 === 0)
				markup += `<div class="container-bigger bg-paper-light m-b-m"><div class="container p-y-s"><div class="row"> `
			markup += `<div class="col1of3">
						<div class="flex flex-center">
							<div class="w50">
								<span class="text-s m-b-s box-i-block">${utls.convertedDate(d.date)}</span>
								<div class="bg-img-cov h20 m-b-s"
									style="background-image:url('${d.img}');"></div>
								<a href="${d.link}">
									<h3 class="heading-quaternary text-fifth m-b-s">${d.title}</h3>
								</a>
								<p class="paragraph-primary m-b-s">${utls.stripHtml(d.content)}</p>
								<a href="${d.link}" class="btn btn-primary">czytaj dalej...</a>
							</div>
						</div>
					</div>`
			if (i % 3 === 2) markup += `</div></div></div>`
		})

		return markup
	}
	const renderPostsLine = () => {
		return `<div class="flex-v flex-gap2"> 		
			${data(parentElement)
				.map(d => {
					return `<div class="container-bigger bg-paper-light m-x-s-l">
					<div class="container p-y-s">
						<div class="">
							<div class="row gap2">
								<div class="col1of3">
									<span class="text-s m-b-s box-i-block">${utls.convertedDate(d.date)}</span>
									<div class="bg-img-cov h20x30-m m-b-s"
										style="background-image:url('${d.img}');">
									</div>
								</div>
								<div class="col2of3">
									<a href="${d.link}">
										<h3 class="heading-quaternary text-fifth m-b-s">${d.title}</h3>
									</a>
									<p class="paragraph-primary m-b-s text-justify">${utls.stripHtml(d.content)}</p>
									<div class="flex flex-wrap flex-between flex-center-y flex-gap2">
										<span class="">
										${d.tags
											.map(
												el =>
													`<a href="${el.link}" class="text-s text-secondary">${el.name}</a>`
											)
											.join(
												'<span class="text-s"> | </span>'
											)}
										</span>
										<a href="${d.link}" class="btn btn-primary">czytaj dalej...</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>`
				})
				.join("")}
		</div>`
	}

	const renderData =
		state.layout === 0 ? renderPostsGrid() : renderPostsLine()

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
		const status = state.sortDate === 0
		const theSelect = parent.querySelector("[aria-select-type=date]")
		const theSelectLabel = parent.querySelector(".select-label")
		const theSelecItem = parent.querySelectorAll(".select-item")

		theSelect.selectedIndex = status ? 1 : 0
		theSelectLabel.innerHTML = status ? "Najstarszy" : "Najnowsze"
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
	const type = state.layout === 0 ? "grid" : "line"
	const theButtons = parent.querySelectorAll("[aria-controls]")

	theButtons.forEach(el => {
		if (el.getAttribute("aria-controls") === type)
			el.setAttribute("aria-current", "true")
		else el.setAttribute("aria-current", "false")
	})
}

import { state } from "./State.js"
import * as utls from "./Utilities.js"
import * as fetchs from "../components-fetchapp/FetchData.js"

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
		data().forEach((d, i) => {
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
			${data()
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
											.join('<span class="text-s"> | </span>')}
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

	const renderData = state.layout === 0 ? renderPostsLine() : renderPostsGrid()

	parentElement.innerHTML = ""
	parentElement.insertAdjacentHTML("afterbegin", renderData)
}
export function renderSearchResults(parentElement, data) {
	const renderPostsLine = () => {
		return data()
			.map(d => {
				return `
					<div class="col1of3">
						<div class="row">
							<div class="col1of3">
								<div class="bg-img-cov h15 m-b-s"
									style="background-image:url('${d.img}');">
								</div>
							</div>
							<div class="col2of3">
								<span class="text-s m-b-s box-i-block">${utls.convertedDate(d.date)}</span>
								<a href="${d.link}">
									<h3 class="heading-tertiary text-fifth m-b-s text-s">${d.title}</h3>
									<p class="paragraph-primary m-b-s">${utls.stripHtml(d.content, 60)}</p>
								</a>
							</div>
						</div>
					</div>`
			})
			.join("")
	}

	parentElement.innerHTML = ""
	parentElement.insertAdjacentHTML("afterbegin", renderPostsLine())
}
export function renderPagination(parentElement) {
	const pageCurrent = state.pagination.page
	const pageLength = Math.ceil(state.data.length / state.pagination.resultsPerPage)
	const pagePrev = pageCurrent - 1
	const pageNext = pageCurrent + 1

	let markup

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
	parentElement.innerHTML = markup
}
export function renderFilterNames() {
	const parent = document.querySelector("[role='filter']")
	const isDateLabel = parent.getAttribute("aria-filter-date")
	const isCategoryLabel = parent.getAttribute("aria-filter-category")

	/* sort by just date */
	if (isDateLabel === "true") {
		const parentDate = document.querySelector("div[aria-select-type=date]")
		const theSelect = document.querySelector("select[aria-select-type=date]")
		const theSelectLabel = parentDate.querySelector(".select-label")
		const theSelecItem = parentDate.querySelectorAll(".select-item")

		theSelect.selectedIndex = state.sortDate
		theSelectLabel.innerHTML = theSelecItem[theSelect.selectedIndex].innerHTML
		theSelecItem.forEach((el, i) => {
			el.setAttribute("aria-selected", "false")
			if (i === theSelect.selectedIndex) el.setAttribute("aria-selected", "true")
		})
	}

	/* sort by category */
	if (isCategoryLabel === "true") {
		const parentDate = document.querySelector("div[aria-select-type=category]")
		const theSelect = document.querySelector("select[aria-select-type=category]")
		const theSelectLabel = parentDate.querySelector(".select-label")
		const theSelecItem = parentDate.querySelectorAll(".select-item")

		theSelect.selectedIndex = [...theSelecItem].findIndex(e => {
			return e.innerHTML === state.sortCategories.currentCategory.name
		})
		theSelectLabel.innerHTML = theSelecItem[theSelect.selectedIndex].innerHTML
		theSelecItem.forEach((el, i) => {
			el.setAttribute("aria-selected", "false")
			if (i === theSelect.selectedIndex) el.setAttribute("aria-selected", "true")
		})
	}
}
export function renderFilterTagNames(type = "all", catName = null) {
	const parentDate = document.querySelector(".filter-date > .filter-sort-text")
	parentDate.innerHTML = state.sortDate === "false" ? "Najnowszy" : "Najstarszy"

	if (type !== "all") return

	const parentCategories = document.querySelector(".filter-cat > .filter-sort-text")

	parentCategories.innerHTML =
		catName !== null ? catName : !state.sortTags.currentSort ? "Wszystkie Tagi" : state.sortTags.currentSort
}
export function renderLayoutBtn() {
	const parent = document.querySelector("[role='filter']")
	const type = state.layout === 0 ? "line" : "grid"

	const theButtons = parent.querySelectorAll("div[aria-select-type]")

	theButtons.forEach(el => {
		if (el.getAttribute("aria-select-type") === type) el.setAttribute("aria-current", "true")
		else el.setAttribute("aria-current", "false")
	})
	// console.log(state)
}

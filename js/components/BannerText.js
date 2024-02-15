import * as fetchs from "../components-fetchapp/FetchData.js"
import * as renders from "../components-fetchapp/RenderData.js"
import * as sorts from "../components-fetchapp/SortData.js"
import * as states from "../components-fetchapp/State.js"
import * as utls from "../components-fetchapp/Utilities.js"

class BannerText {
	constructor(parent) {
		this.parent = parent
		this.type = parent.getAttribute("aria-type")
		this.events()
	}
	events() {
		this.dispatcher()
	}
	dispatcher() {
		if (this.type === "page") this.displayBannerTextInPages()
		if (this.type === "single-page") this.displayBannerTextInSinglePage()
	}
	displayBannerTextInPages() {
		const pageLink = window.location.pathname
			.split("/")
			.filter(Boolean)
			.map(e => e.replace(/\.(php|html)/i, ""))

		if (pageLink.slice(-1).includes("lokalnosc-w-lewiatanie"))
			return (this.parent.innerHTML = `
					<span class="text-quaternary">LOKALNOŚĆ</span>
					<span class="text-fifth">W LEWIATANIE</span>
				`)

		if (pageLink.slice(-1).includes("eksperci-w-lokalnosci"))
			return (this.parent.innerHTML = `
						<span class="text-quaternary">EKSPERCI</span>
						<span class="text-fifth">W LEWIATANIE</span>
				`)

		if (pageLink.length === 0)
			this.parent.innerHTML = `
					<span class="text-quaternary">NAJLEPSZE PRODUKTY</span>
					<span class="text-primary">POCHODZĄ</span>
					<span class="text-secondary">Z NAJBLIŻSZEJ OKOLICY!</span>
				`
	}
	async displayBannerTextInSinglePage() {
		const theSearch = window.location.search.slice(1).split("=")

		if (!Array.isArray(theSearch) || theSearch[0] !== "id") return

		await fetchs.loadResults()

		const theID = +theSearch[1]
		const thePost = states.state.results.posts.find(e => e.id === theID)

		this.parent.innerHTML = `
			<span class="text-s m-b-s box-i-block">${utls.convertedDate(thePost.date)}</span>
			<span class="">
				${thePost.tags
					.map(el => `<a href="${el.link}" class="text-s text-secondary">${el.name}</a>`)
					.join('<span class="text-s"> | </span>')}
			</span>
			
		`
	}
}
const parents = document.querySelectorAll("[role=banner-text]")
if (parents.length > 0) {
	parents.forEach(e => new BannerText(e))
}

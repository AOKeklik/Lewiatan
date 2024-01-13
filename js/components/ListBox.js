class ListBox {
	constructor(parent) {
		this.parent = parent
		this.element = parent.dataset.item
		this.type = parent.dataset.type
		this.items = parent.textContent
		this.dispatcher()
	}
	dispatcher() {
		if (this.type === "text") return this.doBannerList()
		this.doList()
	}
	doList() {
		const items = this.items
			.trim()
			.split(",")
			.map(n => n.trim())

		this.parent.innerHTML = ""

		items.forEach((el, i) => {
			const item = document.createElement(this.element)
			item.textContent = el
			this.parent.appendChild(item)
		})
	}
	doBannerList() {
		const pageLink = window.location.pathname
		const link = localStorage.getItem("link")
		console.log(link)
		if (pageLink !== "/" && !pageLink.startsWith("/tag")) {
			if (pageLink === "/category/eksperci-w-lokalnosci/") {
				this.parent.innerHTML = `
					<span class="color-quaternary">EKSPERCI</span>
					<span class="color-fifth">W LEWIATANIE</span>
				`
				return
			}
			if (pageLink === "/category/lokalnosc-w-lewiatanie/") {
				this.parent.innerHTML = `
					<span class="color-quaternary">LOKALNOŚĆ</span>
					<span class="color-fifth">W LEWIATANIE</span>
				`
				return
			}
			if (link && link === "lokalnosc-w-lewiatanie") {
				this.parent.innerHTML = `
					<span class="color-quaternary">LOKALNOŚĆ</span>
					<span class="color-fifth">W LEWIATANIE</span>
				`
				return
			}
			if (link && link === "eksperci-w-lokalnosci") {
				this.parent.innerHTML = `
					<span class="color-quaternary">EKSPERCI</span>
					<span class="color-fifth">W LEWIATANIE</span>
				`
				return
			}
		} else {
			this.parent.innerHTML = `
				<span class="color-quaternary">NAJLEPSZE PRODUKTY</span>
				<span class="color-primary">POCHODZĄ</span>
				<span class="color-secondary">Z NAJBLIŻSZEJ OKOLICY!</span>
			`
		}
	}
}

const parents = document.querySelectorAll("[role=listbox]")
if (parents.length > 0) {
	parents.forEach(el => new ListBox(el))
}

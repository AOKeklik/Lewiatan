class ListBox {
	constructor(parent) {
		this.parent = parent
		this.type = parent.dataset.type
		this.element = parent.dataset.item
		this.classNames = parent.dataset.class
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
		const classNames = this.classNames && this.classNames.split("_")

		this.parent.innerHTML = ""

		items.forEach((el, i, arr) => {
			const item = document.createElement(this.element)
			item.textContent = el

			/* If a class exists, add the class to the current tag */
			if (classNames && classNames[i] !== "")
				item.className = classNames[i]

			/* add a space between tags */
			if (arr.length - 1 !== i) item.textContent += " "

			this.parent.insertAdjacentElement("beforeend", item)
		})
	}
	doBannerList() {
		const pageLink = window.location.pathname
		const link = localStorage.getItem("link")
		if (pageLink !== "/" && !pageLink.startsWith("/tag")) {
			if (pageLink === "/category/eksperci-w-lokalnosci/") {
				this.parent.innerHTML = `
					<span class="text-quaternary">EKSPERCI</span>
					<span class="text-fifth">W LEWIATANIE</span>
				`
				return
			}
			if (pageLink === "/category/lokalnosc-w-lewiatanie/") {
				this.parent.innerHTML = `
					<span class="text-quaternary">LOKALNOŚĆ</span>
					<span class="text-fifth">W LEWIATANIE</span>
				`
				return
			}
			if (link && link === "lokalnosc-w-lewiatanie") {
				this.parent.innerHTML = `
					<span class="text-quaternary">LOKALNOŚĆ</span>
					<span class="text-fifth">W LEWIATANIE</span>
				`
				return
			}
			if (link && link === "eksperci-w-lokalnosci") {
				this.parent.innerHTML = `
					<span class="text-quaternary">EKSPERCI</span>
					<span class="text-fifth">W LEWIATANIE</span>
				`
				return
			}
		} else {
			this.parent.innerHTML = `
				<span class="text-quaternary">NAJLEPSZE PRODUKTY</span>
				<span class="text-primary">POCHODZĄ</span>
				<span class="text-secondary">Z NAJBLIŻSZEJ OKOLICY!</span>
			`
		}
	}
}

const parents = document.querySelectorAll("[role=listbox]")
if (parents.length > 0) {
	parents.forEach(el => new ListBox(el))
}

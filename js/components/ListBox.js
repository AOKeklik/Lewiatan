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
		const navLinks = document.querySelectorAll(
			"#menu-header .menu-item a"
		)
		const pageLink = window.location.pathname
			.split("/")
			.filter(Boolean)
			.map(e => e.replace(/\.(php|html)/i, ""))
		const cat = localStorage.getItem("link")

		if (pageLink.length > 0)
			pageLink.forEach(e => {
				if (
					e.includes("lokalnosc-w-lewiatanie") ||
					(cat && cat)
				) {
					return (this.parent.innerHTML = `
					<span class="text-quaternary">LOKALNOŚĆ</span>
					<span class="text-fifth">W LEWIATANIE</span>
				`)
				}

				if (e.includes("eksperci-w-lokalnosci") || (cat && cat))
					return (this.parent.innerHTML = `
						<span class="text-quaternary">EKSPERCI</span>
						<span class="text-fifth">W LEWIATANIE</span>
				`)

				this.parent.innerHTML = `
					<span class="text-quaternary">NAJLEPSZE PRODUKTY</span>
					<span class="text-primary">POCHODZĄ</span>
					<span class="text-secondary">Z NAJBLIŻSZEJ OKOLICY!</span>
				`
			})
		else
			this.parent.innerHTML = `
				<span class="text-quaternary">NAJLEPSZE PRODUKTY</span>
				<span class="text-primary">POCHODZĄ</span>
				<span class="text-secondary">Z NAJBLIŻSZEJ OKOLICY!</span>
				`
	}
}

const parents = document.querySelectorAll("[role=listbox]")
if (parents.length > 0) {
	parents.forEach(el => new ListBox(el))
}

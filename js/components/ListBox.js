class ListBox {
	constructor(parent) {
		this.parent = parent
		this.type = parent.dataset.type
		this.element = parent.dataset.item
		this.classNames = parent.dataset.class
		this.items = parent.textContent
		this.events()
	}
	events() {
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
			if (classNames && classNames[i] !== "") item.className = classNames[i]

			/* add a space between tags */
			if (arr.length - 1 !== i) item.textContent += " "

			this.parent.insertAdjacentElement("beforeend", item)
		})
	}
}

const parents = document.querySelectorAll("[role=listbox]")
if (parents.length > 0) {
	parents.forEach(el => new ListBox(el))
}

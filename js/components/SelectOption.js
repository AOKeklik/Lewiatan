class SelectOption {
	selectLabel = document.createElement("div")
	selectItems = document.createElement("div")

	constructor(parent) {
		this.parent = parent
		this.selectElement = parent.children[0]
		this.options = [...parent.children[0].children]
		this.optionsLength = parent.children[0].children.length
		this.arrowIcon = parent.nextElementSibling
		this.events()
	}
	events() {
		this.doCreateElements()
	}
	doCreateElements() {
		const currentSelectedOption =
			this.options[this.selectElement.selectedIndex]

		/* select label elmnt */
		this.selectLabel.setAttribute("class", "select-label")
		this.selectLabel.innerHTML = currentSelectedOption.innerHTML
		this.parent.insertAdjacentElement("afterbegin", this.selectLabel)

		/* select items */
		this.selectItems.setAttribute("class", "select-items select-hide")
		this.parent.insertAdjacentElement("afterbegin", this.selectItems)

		/* creat customoptions el */
		this.options.forEach(el => {
			const div = document.createElement("div")
			div.innerHTML = el.innerHTML
			div.setAttribute("class", "select-item")
			div.setAttribute("aria-selected", "false")
			div.addEventListener(
				"click",
				this.doClickEventOnSelectItems.bind(this)
			)

			this.selectItems.appendChild(div)
		})
		this.selectItems.childNodes.forEach(el => {
			if (el.innerHTML === currentSelectedOption.innerHTML)
				el.setAttribute("aria-selected", "true")
		})
	}
	doClickEventOnSelectItems(e) {
		const theSelectItem = e.target || e
		const theSelectList = theSelectItem.parentElement.querySelectorAll(
			"[aria-selected=true]"
		)
		const theSelectLabel =
			theSelectItem.parentElement.nextElementSibling

		this.options.forEach((el, i) => {
			if (el.innerHTML === theSelectItem.innerHTML) {
				this.selectElement.selectedIndex = i
				theSelectLabel.innerHTML = el.innerHTML
			}
		})

		theSelectList.forEach(el => {
			el.setAttribute("aria-selected", "false")
		})

		theSelectItem.setAttribute("aria-selected", "true")
	}
}

const parents = document.querySelectorAll("[role=selectoption]")
if (parents.length > 0) {
	parents.forEach(e => new SelectOption(e))
}

function doToggleSelectList(e) {
	const theNode = e.target.closest("[role=selectoption]")
	const selects = document.querySelectorAll("[role=selectoption]")

	selects.forEach(el => {
		if (el === theNode) {
			el.firstElementChild.classList.toggle("select-hide")
		} else {
			el.firstElementChild.classList.add("select-hide")
		}
	})
}
document.addEventListener("click", doToggleSelectList)

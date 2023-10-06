class Header {
	constructor() {
		this.navHeader = document.querySelector(".nav")
		this.navItems = document.querySelectorAll(".menu-item")
		this.events()
	}
	events() {
		this.navHeader.addEventListener(
			"click",
			this.handleEventClickOnNav.bind(this)
		)
	}
	handleEventClickOnNav(e) {
		this.handleBurgerToggle(e)
		this.addActiveClass(e)
	}
    addActiveClass(e) {
        e.preventDefault()

		const theNode = e.target.closest(".menu-item")
		if (!theNode) return

		this.navItems.forEach(item => item.classList.remove("active"))
		theNode.classList.add("active")
	}

	handleBurgerToggle(e) {
		const theNode = e.target.closest(".nav-burger")
		if (!theNode) return

		theNode.classList.toggle("toggle")
		this.navHeader.classList.toggle("active-nav")
	}
}
new Header()

class Header2 {
	constructor() {
		this.nav = document.querySelector("#menu-header")
		this.marker = document.querySelector(".marker")
		this.events()
	}

	events() {
		this.nav.addEventListener(
			"mouseenter",
			this.showMarker.bind(this),
			true
		)
		this.nav.addEventListener(
			"mouseleave",
			this.showMarker.bind(this),
			true
		)
	}

	showMarker(e) {
		const theNode = e.target

		if (
			e.type === "mouseleave" && theNode === this.nav
		) {
			this.marker.style.transformOrigin = "right"
			this.marker.style.transform = "scaleX(0)"
			return
		}

		if (!theNode.classList.contains("menu-item")) return

		this.reLocateMarker(theNode)
	}

	reLocateMarker(el) {
		this.marker.style.transformOrigin = "left"
		this.marker.style.transform = "scaleX(1)"
		this.marker.style.width = el.offsetWidth + "px"
		this.marker.style.height = el.offsetHeight + "px"
		this.marker.style.left = el.offsetLeft + "px"
		this.marker.style.top =
			el.offsetTop + el.offsetHeight - this.marker.offsetHeight + "px"
	}
}

new Header2()
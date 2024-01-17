class Header {
	constructor() {
		/* header */
		this.navHeader = document.querySelector(".nav")
		this.navItems = document.querySelectorAll("#menu-header .menu-item")
		this.navLinks = document.querySelectorAll(
			"#menu-header .menu-item a"
		)
		this.footerNav = document.querySelectorAll(
			".footer-nav .menu-item a"
		)
		this.bannerTitle = document.querySelector(".banner-text")

		/* marker */
		this.nav = document.querySelector("#menu-header")
		this.marker = document.querySelector(".marker")

		/* events */
		this.events()
	}
	events() {
		this.navHeader.addEventListener(
			"click",
			this.handleEventClickOnNav.bind(this)
		)
		window.addEventListener("load", () => {
			this.addActiveClassOnload.bind(this)()
			this.addattributeToFooterNavLinks.bind(this)()
		})
		/* marker */
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
	handleEventClickOnNav(e) {
		this.handleBurgerToggle(e)
		this.addActiveClass(e)
	}
	addActiveClass(e) {
		// e.preventDefault()

		const theNode = e.target.closest(".menu-item")
		if (!theNode) return

		this.navItems.forEach(item => item.classList.remove("active-item"))
		theNode.classList.add("active-item")
	}
	addActiveClassOnload() {
		let currentPath = window.location.pathname
			.split("/")
			.filter(Boolean)
		currentPath = currentPath.map(e => e.replace(/\.(html|php)/, ""))

		this.navItems.forEach((el, _, arr) => {
			el.classList.remove("active-item")
			const link = el.querySelector("a")

			if (currentPath.length === 0)
				return arr[0].classList.add("active-item")

			if (link.href.includes(currentPath[0]))
				el.classList.add("active-item")
		})
	}
	addattributeToFooterNavLinks() {
		this.footerNav.forEach(e => {
			e.setAttribute("target", "_blank")
		})
	}
	handleBurgerToggle(e) {
		const theNode = e.target.closest(".nav-burger")
		if (!theNode) return

		theNode.classList.toggle("toggle")
		document.body.classList.toggle("active-nav")
	}
	/* marker */
	showMarker(e) {
		const theNode = e.target

		if (e.type === "mouseleave" && theNode === this.nav) {
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
			el.offsetTop +
			el.offsetHeight -
			this.marker.offsetHeight +
			"px"
	}
}
new Header()

window.onload = function () {
	const sections = document.querySelectorAll(
		".reveal-fadeup-50, .reveal-fadeup-10, .reveal-fadeRight-30, .reveal-fadeLeft-30"
	)

	function updateActiveSection() {
		sections.forEach(el => {
			const windowHeight = window.innerHeight
			const r = el.getBoundingClientRect()
			const revealTop = r.top
			const revealMargin = r.height * 0

			if (revealTop < windowHeight - revealMargin) {
				el.classList.add("active-reveal")
			}
			if (revealTop > windowHeight) {
				el.classList.remove("active-reveal")
			}
		})
	}
	window.addEventListener("scroll", updateActiveSection)
	updateActiveSection()
}
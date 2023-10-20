const slide = document.querySelectorAll(".slider li")

let current = 0
const length = slide.length - 1
let redirect = true

slide[current].className = "start"

function executeSlide(dir) {
	let prev
	let next
	if (dir === "next") current = current < slide.length - 1 ? current + 1 : 0
	else current = current > 0 ? current - 1 : slide.length - 1

	next = current < slide.length - 1 ? current + 1 : 0
	prev = current > 0 ? current - 1 : slide.length - 1

	slide[prev].className = "slider-prev"
	slide[current].className = "slider-active"
	slide[next].className = ""
}

setInterval(() => {
	if (redirect) {
		if (current == length) redirect = !redirect
		executeSlide("next")
	} else {
		executeSlide("prev")
		if (current === 0) redirect = !redirect
	}
}, 5000)
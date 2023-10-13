import { CHARACTERS } from "./config.js"

export function stripHtml(html) {
	let tmp = document.createElement("DIV")
	tmp.innerHTML = html
	const results = tmp.textContent || tmp.innerText || ""
	return results.substring(1, CHARACTERS) + "..."
}
export function convertedDate(date) {
	const toDay = new Date()
	const theDay = new Date(date)
	const howManyDay = Math.floor(
		Math.abs(toDay - theDay) / (1000 * 60 * 60 * 24)
	)
	const results =
		howManyDay === 0
		? "Dzisiaj"
		: howManyDay === 1
		? howManyDay + " dzień temu"
		: howManyDay > 3
		? theDay.toLocaleDateString("pl")
		: howManyDay + " dni temu"
	return results
}

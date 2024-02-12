import * as fetchs from "../components-fetchapp/FetchData.js"
import * as renders from "../components-fetchapp/RenderData.js"
import * as sorts from "../components-fetchapp/SortData.js"
import * as states from "../components-fetchapp/State.js"

const searchElement = document.querySelector(".nav-search--input")

async function controllerLoadResultsBySearch(e) {
	try {
		document.body.insertAdjacentHTML(
			"afterbegin",
			`
                <section class="section-search">
                    <div class="module-search--overlay">
                        <div class="module-search--content">
                            <div id="module-search--root" class="row">
                            </div>
                            <div id="module-search--pagination" class="pagination">
                            </div>
                        </div>
    
                        <div class="module-search--icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93A10 10 0 0 1 2.93 17.07zm1.41-1.41A8 8 0 1 0 15.66 4.34A8 8 0 0 0 4.34 15.66zm9.9-8.49L11.41 10l2.83 2.83l-1.41 1.41L10 11.41l-2.83 2.83l-1.41-1.41L8.59 10L5.76 7.17l1.41-1.41L10 8.59l2.83-2.83l1.41 1.41z"/></svg>
                        </div>
                        <div class="module-search--control">
                            <input type="text" name="search" id="search" />
                        </div>
                    </div>
                </section>
            `
		)
		document.documentElement.style.overflowY = "hidden"
		document.body.style.overflowY = "hidden"

		searchElement.blur()
		const searchSection = document.querySelector(".module-search--overlay")
		await fetchs.wait(0)
		searchSection.classList.add("module-search--open")
		await fetchs.wait(3)

		const searchInput = document.querySelector(".module-search--control input")
		const searchRoot = document.getElementById("module-search--root")
		const searchPagination = document.getElementById("module-search--pagination")

		searchInput.focus()

		/* events */
		document.querySelector(".module-search--icon").addEventListener("click", async function (e) {
			e.preventDefault()
			searchSection.classList.remove("module-search--open")
			await fetchs.wait(10)
			searchSection.remove()
			document.documentElement.style.overflowY = ""
			document.body.style.overflowY = ""
		})
		searchInput.addEventListener("keyup", async function (e) {
			const theValue = searchInput.value
			if (!theValue) return
			// controllerPagination()
			await renders.renderSpiner(searchRoot)
			await fetchs.loadSearchResults(theValue)
			await fetchs.wait(3)
			sorts.sortDataByDate()
			renders.renderSearchResults(searchRoot, sorts.sortDataByPagination)
			renders.renderPagination(searchPagination)
		})
		searchPagination.addEventListener("click", function (e) {
			e.preventDefault()
			const theNode = e.target.closest(".pagination-btn")
			if (!theNode) return
			let thePage = +theNode.dataset.page

			states.saveStateObjectByPage(thePage)

			renders.renderSearchResults(searchRoot, sorts.sortDataByPagination)
			renders.renderPagination(searchPagination)
		})
	} catch (err) {
		console.log(err)
	}
}

/* events */
searchElement.addEventListener("click", controllerLoadResultsBySearch)

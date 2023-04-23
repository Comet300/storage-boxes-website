let messageBox = document.querySelector("#preturi_txt");

function bindSmoothScroll() {
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();
			messageBox.textContent = `Bună ziua\nMă interesează ${
				e.target.parentElement.parentElement.parentElement.parentElement.querySelector("h4").textContent
			}.\nVa rog să mă contactați pentru detalii`;
			document.querySelector(this.getAttribute("href")).scrollIntoView({
				behavior: "smooth",
			});
		});
	});
}

(function () {
	let boxes = Array.from(document.querySelectorAll("#one .product-flex .item"));
	boxes[boxes.length - 1].style.marginTop = "24px";
	if (boxes.length % 2 == 0) boxes[boxes.length - 2].style.marginTop = "24px";

	boxes = Array.from(document.querySelectorAll("#two .product-flex .item"));
	boxes[boxes.length - 1].style.marginTop = "24px";
	if (boxes.length % 2 == 0) boxes[boxes.length - 2].style.marginTop = "24px";
})();

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

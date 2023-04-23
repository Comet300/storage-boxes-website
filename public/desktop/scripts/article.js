//alignment fix
if (window.innerWidth > 1455) {
	document.querySelector(".image-right").parentElement.style.right = 0;
} else if (window.innerWidth <= 1455 && window.innerWidth >= 1440) {
	value = Math.ceil((window.innerWidth - 1455) * -1 * (8 / 15));
	if (value > 0) document.querySelector(".image-right").parentElement.parentElement.style.right = "-" + Math.ceil((window.innerWidth - 1455) * -1 * (8 / 15)) + "px";
} else {
	document.querySelector(".image-right").parentElement.style.right = "-8px";
}


window.addEventListener("resize", () => {
	if (window.innerWidth > 1455) {
		document.querySelector(".image-right").parentElement.style.right = 0;
	} else if (window.innerWidth <= 1455 && window.innerWidth >= 1440) {
		value = Math.ceil((window.innerWidth - 1455) * -1 * (8 / 15));
		if (value > 0) document.querySelector(".image-right").parentElement.style.right = "-" + Math.ceil((window.innerWidth - 1455) * -1 * (8 / 15)) + "px";
	} else {
		document.querySelector(".image-right").parentElement.style.right = "-8px";
	}
});
let imageURLs = Array.from(document.querySelectorAll("#one #gallery .item img")).map((img) => img.src);
function getNextImg(currentImgURL) {
	let val = imageURLs.indexOf(currentImgURL);
	if (val >= imageURLs.length - 1) {
		return imageURLs[0];
	}
	return imageURLs[++val];
}

function getPrevImg(currentImgURL) {
	let val = imageURLs.indexOf(currentImgURL);
	if (val <= 0) {
		return imageURLs[imageURLs.length - 1];
	}
	return imageURLs[--val];
}

let galleryImageObj = document.querySelector("#galleryModal .content .image img");
let modalObj = document.querySelector("#galleryModal");

document.querySelectorAll("#one #gallery .item").forEach((item) => {
	item.addEventListener("click", (e) => {
		galleryImageObj.src = e.target.parentElement.querySelector("img").src;
		modalObj.classList.remove("hidden");
		document.querySelector("body").style.overflow = "hidden";
	});
});

document.querySelector("#galleryModal .content .image span").addEventListener("click", () => {
	modalObj.classList.add("hidden");
	document.querySelector("body").style.overflow = "unset";
});

document.querySelector("#prevImg").addEventListener("click", (e) => {
	galleryImageObj.src = getPrevImg(e.target.parentElement.querySelector("img").src);
});

document.querySelector("#nextImg").addEventListener("click", (e) => {
	galleryImageObj.src = getNextImg(e.target.parentElement.querySelector("img").src);
});

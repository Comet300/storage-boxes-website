function getRelativeOffsetLeft(parent, child) {
	parent = parent.getBoundingClientRect();
	child = child.getBoundingClientRect();
	return Math.floor(child.left - parent.left);
}
-11012021;
function adjustDiscountGraphics() {
	try {
		let graphics = document.querySelector(".graphics");
		let percents = document.querySelectorAll(".fivePercent, .tenPercent");
		let triangles = document.querySelectorAll(".beforeFive, .afterFive, .beforeTen, .afterTen");
		let graphicsObjects = [];
		graphicsObjects.push({ parent: graphics, percent: percents[0], shadow: triangles[0], left: true });
		graphicsObjects.push({ parent: graphics, percent: percents[0], shadow: triangles[1], left: false });
		graphicsObjects.push({ parent: graphics, percent: percents[1], shadow: triangles[2], left: true });
		graphicsObjects.push({ parent: graphics, percent: percents[1], shadow: triangles[3], left: false });

		graphicsObjects.forEach((item) => {
			let value;
			if (item.left) value = getRelativeOffsetLeft(item.parent, item.percent) - item.shadow.getBoundingClientRect().width;
			else value = getRelativeOffsetLeft(item.parent, item.percent) + item.percent.getBoundingClientRect().width;

			item.shadow.style.left = value + "px";
		});

		//Math.floor((a.x+a.width)-(b.x+b.width))
		//a=graphics
		//b=tenPercent

		let a = document.querySelector(".graphics").getBoundingClientRect();
		let b = document.querySelector(".tenPercent").getBoundingClientRect();
		triangles[3].style.width = Math.floor(a.x + a.width - (b.x + b.width)) + "px";
	} catch (err) {
		console.log("unable to adjust elements");
		console.log(err);
	}
}

(function () {
	let spans = document.querySelectorAll("#car-animation .dots>div p");
	let spansRect = Array.from(spans).map((item) => item.getBoundingClientRect());
	let dots = Array.from(document.querySelectorAll("#car-animation .dots>div .dot")).map((item) => item.getBoundingClientRect());
	let parentOffset = document.querySelector("#car-animation").getBoundingClientRect().left;
	for (let i = 0; i < spans.length; i++) {
		spans[i].style.left = dots[i].left - parentOffset - (spansRect[i].width - dots[i].width) / 2 + "px";
	}
	adjustDiscountGraphics();
})();

window.addEventListener("load", adjustDiscountGraphics);
window.addEventListener("resize", adjustDiscountGraphics);

window.onbeforeunload = function () {
	window.scrollTo(0, 0);
};

window.addEventListener("resize", () => {
	if (window.innerWidth > 1455) {
		document.querySelector("#bg-right").style.right = 0;
	} else if (window.innerWidth <= 1455 && window.innerWidth >= 1440) {
		value = Math.ceil((window.innerWidth - 1455) * -1 * (8 / 15));
		if (value > 0) document.querySelector("#bg-right").style.right = "-" + Math.ceil((window.innerWidth - 1455) * -1 * (8 / 15)) + "px";
	} else {
		document.querySelector("#bg-right").style.right = "-8px";
	}
});

(function () {
	let sentinel = document.querySelector("#pickup-track");
	let delay = 0;

	let carObserver = new IntersectionObserver(
		(entries) => {
			if (entries[0].intersectionRatio <= 0) {
				return;
			}
			entries[0].target.classList.add("visible");
			try {
				let dots = entries[0].target.querySelectorAll(".dot");
				setTimeout(() => {
					try {
						dots[0].classList.add("active");
					} catch (err) {}
				}, delay * 1000);
				delay += +0.8;
				setTimeout(() => {
					try {
						dots[1].classList.add("active");
					} catch (err) {}
				}, delay * 1000);
				delay += +0.4;
				setTimeout(() => {
					try {
						dots[2].classList.add("active");
					} catch (err) {}
				}, delay * 1000);
				delay += +0.4;
				setTimeout(() => {
					try {
						dots[3].classList.add("active");
					} catch (err) {}
				}, delay * 1000);
				delay += +0.4;
				setTimeout(() => {
					try {
						dots[4].classList.add("active");
					} catch (err) {}
				}, delay * 1000);
				delay += +0.8;
				setTimeout(() => {
					try {
						dots[5].classList.add("active");
					} catch (err) {}
				}, delay * 1000);
			} catch (err) {
				return;
			}
		},
		{
			threshold: 0.5,
		}
	);
	carObserver.observe(sentinel);
	sentinel = document.querySelector("#car-animation");
	carObserver.observe(sentinel);

	if (!!window.IntersectionObserver) {
		let observer = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.toggle("active");
						entry.target.querySelector(".dot").classList.add("active");
						observer.unobserve(entry.target);
					}
				});
			},
			{ rootMargin: "0px 0px -50% 0px" }
		);
		document.querySelectorAll("#two div + div .item").forEach((item) => {
			observer.observe(item);
		});
	} else document.querySelector("#warning").style.display = "block";

	// the callback we setup for the observer will be executed now for the first time
	// it waits until we assign a target to our observer (even if the target is currently not visible
})();

let scrollitem = document.querySelector("#two div + div");
let scrollLine = document.querySelector("#two .lines .hide");
let initialPos = window.innerHeight * 0.5;
let finalPos = initialPos + scrollitem.getBoundingClientRect().height;
let actualVal = 0;
function scroll() {
	let newVal = initialPos - scrollitem.getBoundingClientRect().top;
	if (actualVal < newVal) {
		scrollLine.style.height = newVal + "px";
		actualVal = newVal;
		if (newVal > 328) window.removeEventListener("scroll", scroll);
	}
}
window.addEventListener("scroll", scroll);

let articleList = document.querySelectorAll("#slideshow .content");
let lastIndex = articleList.length - 1;
let hasNext = true;

function bindPrevArticle() {
	let currentArticle = document.querySelector("#slideshow .content.visible");
	let prevElement = currentArticle.previousElementSibling;
	if (prevElement) {
		currentArticle.classList.remove("visible");
		prevElement.classList.add("visible");
	}
	articleList = document.querySelectorAll("#slideshow .content");
}

function bindNextArticle() {
	let currentArticle = document.querySelector("#slideshow .content.visible");

	if (getVisiblePosition() >= articleList.length - 2 && hasNext) {
		axios.get(`/getNextArticle/${parseInt(currentArticle.querySelector("div.hide").textContent) + 1}`).then(function (response) {
			if (!response.data) {
				let nextElement = currentArticle.nextElementSibling;
				if (nextElement) {
					currentArticle.classList.remove("visible");
					nextElement.classList.add("visible");
				}
				articleList = document.querySelectorAll("#slideshow .content");
				hasNext = false;
				return;
			}
			let continut = JSON.parse(response.data.continut);
			document
				.querySelector("#slideshow")
				.appendChild(getArticleStructure(lastIndex + 1, response.data.imagine, continut.div[0].h2, continut.div[0].p, continut.div[1].p, response.data.id2));
			lastIndex++;
			let nextElement = currentArticle.nextElementSibling;
			if (nextElement) {
				currentArticle.classList.remove("visible");
				nextElement.classList.add("visible");
			}
			articleList = document.querySelectorAll("#slideshow .content");
		});
	} else {
		let nextElement = currentArticle.nextElementSibling;
		if (nextElement) {
			currentArticle.classList.remove("visible");
			nextElement.classList.add("visible");
		}
		articleList = document.querySelectorAll("#slideshow .content");
	}
}

function getVisiblePosition() {
	for (let i = 0; i < articleList.length; i++) if (articleList[i].classList.contains("visible")) return i;
	return -1;
}

function getArticleStructure(index, imagine, titlu, p1, p2, id) {
	let el = document.createElement("html");
	el.innerHTML = `
	<div class="content">
		<div class="text">
			<div class="hide">${index}</div>
			<h1>${titlu}</h1>
			<p>${p1}</p>
			<p>${p2}</p>
			<a href="/sfaturi/${id}" title="${titlu}">Citește mai mult</a>
		</div>

		<div class="image">
			<img src="${imagine}" alt="poză cu cutii de depozitare, articol" width="320"
				height="320">
		</div>
	</div>`;
	return el.querySelector("div");
}

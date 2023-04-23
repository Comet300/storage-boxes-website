function bindObservers() {
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
			{ rootMargin: "0px 0px -40% 0px" }
		);
		document.querySelectorAll("#scroll-animation .item").forEach((item) => {
			observer.observe(item);
		});
	} else document.querySelector("#warning").style.display = "block";

	// the callback we setup for the observer will be executed now for the first time
	// it waits until we assign a target to our observer (even if the target is currently not visible

	let scrollitem = document.querySelector("#scroll-animation .item");
	let scrollLine = document.querySelector("#scroll-animation .hide");
	let initialPos = window.innerHeight * 0.6;
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
}

let articleList = document.querySelectorAll("#slideshow .article");
let lastIndex = articleList.length - 1;
let hasNext = true;

function bindPrevArticle() {
	let currentArticle = document.querySelector("#slideshow .article.visible");
	let prevElement = currentArticle.previousElementSibling;
	if (prevElement) {
		currentArticle.classList.remove("visible");
		prevElement.classList.add("visible");
	}
	articleList = document.querySelectorAll("#slideshow .article");
}

function bindNextArticle() {
	let currentArticle = document.querySelector("#slideshow .article.visible");

	if (getVisiblePosition() >= articleList.length - 2 && hasNext) {
		axios.get(`/getNextArticle/${parseInt(currentArticle.querySelector("div.hide").textContent) + 1}`).then(function (response) {
			console.log(response);
			if (!response.data) {
				let nextElement = currentArticle.nextElementSibling;
				if (nextElement) {
					currentArticle.classList.remove("visible");
					nextElement.classList.add("visible");
				}
				articleList = document.querySelectorAll("#slideshow .article");
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
			articleList = document.querySelectorAll("#slideshow .article");
		});
	} else {
		let nextElement = currentArticle.nextElementSibling;
		if (nextElement) {
			currentArticle.classList.remove("visible");
			nextElement.classList.add("visible");
		}
		articleList = document.querySelectorAll("#slideshow .article");
	}
}

function getVisiblePosition() {
	for (let i = 0; i < articleList.length; i++) if (articleList[i].classList.contains("visible")) return i;
	return -1;
}

function getArticleStructure(index, imagine, titlu, p1, p2, id) {
	let el = document.createElement("html");
	el.innerHTML = `<div class="article">
    <div class="image">
	<img src="${imagine}" width="312" height="313.516" alt="Imagine cu boxe de cartol pentru depozitare pentru articol">
	</div>
	    <div class="hide">${index}</div>
	    <h1>${titlu}</h1>
	    <p>${p1}</p>
	    <p>${p2}</p>
	    <a href="/sfaturi/${id}" title="${titlu}">Citește mai mult</a>
</div>`;
	return el.querySelector("div");
}

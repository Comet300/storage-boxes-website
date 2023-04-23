function parseArticle(imagine, id, titlu, p1, p2) {
	return `
    <div class="item">
    <div class="content">
        <div class="image">
            <img src="/${imagine}" alt="poza articol">
        </div>
        <div class="text-content">
            <h2>${titlu}</h2>
            <p>${p1}</p>
            <p>${p2}</p>
            <a href="/sfaturi/${id}" title="${titlu}">Citește mai mult</a>
        </div>
    </div>
    </div>
    `;
}

let currentPage = 2;
function bindLoadArticles() {
	let articleStatus = document.querySelector("#article-status");
	let articlesContainer = document.querySelector("#articles");
	articleStatus.classList.add("loading");
	axios.get(`/getArticlePage/${currentPage}`).then(function (response) {
		// handle success
		if (response.data.articles.length > 0) {
			response.data.articles.forEach((element) => {
				let continut = JSON.parse(element.continut);
				setTimeout(() => {
					articlesContainer.innerHTML += parseArticle(element.imagine, element.id2, continut.div[0].h2, continut.div[0].p, continut.div[1].p);
				}, 600);
			});
			currentPage++;

			if (response.data.end == true) {
				setTimeout(() => {
					articleStatus.classList.remove("loading");
					articleStatus.classList.add("end");
				}, 600);
			} else {
				setTimeout(() => {
					articleStatus.classList.remove("loading");
				}, 600);
			}
		} else if (response.data.end == true) {
			articleStatus.classList.remove("loading");
			articleStatus.classList.add("end");
		} else {
			articleStatus.classList.remove("loading");
		}
	});
}

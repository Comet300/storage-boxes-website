const express = require("express");
const app = express();
const compression = require("compression");
const ua = require("ua-parser-js");
const sendEmail = require("./email.js");
const bodyParser = require("body-parser");
const expAutoSan = require("express-autosanitizer");
const cors = require("cors");
const secure = require("express-force-https");
const mysql = require("mysql");
const apiKey = process.env.MAPS_API_KEY;
const mapId = process.env.MAPS_ID;
const session = require("cookie-session");
const cookieParser = require("cookie-parser");
var flash = require("connect-flash");

function isMobile(req) {
	let uaItem = ua(req.headers["user-agent"]);
	if (uaItem.device.type == "mobile" || uaItem.device.type == "tablet") return true;
	return false;
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expAutoSan.all);
app.use(compression());

app.use(cookieParser("Santa Claus is real"));
app.use(
	session({
		saveUninitialized: true,
		secret: "Santa Claus is real",
		resave: false,
		cookie: { maxAge: 60000, secure: true },
	})
);
app.use(flash());

app.use(
	express.static(__dirname + "/public", {
		maxAge: 31557600,
	})
);

app.use(
	express.static(__dirname + "/assets", {
		maxAge: 31557600,
	})
);

app.set("view engine", "ejs");

app.use(secure);

app.use(function (req, res, next) {
	res.locals.success = req.flash("success");
	res.locals.error = req.flash("error");
	next();
});

// var connection = mysql.createConnection({
// 	host: process.env.DB_HOST,
// 	user: process.env.DB_USER,
// 	password: process.env.DB_PASSWORD,
// 	database: process.env.DB_DATABASE,
// });

// connection.connect();

// const getQueryAsList = (query) => {
// 	return new Promise(function (resolve, reject) {
// 		connection.query(query, function (err, result, fields) {
// 			if (!err) resolve(JSON.parse(JSON.stringify(result)));
// 			// Hacky solution
// 			else reject(err);
// 		});
// 	});
// };

// const articles = getQueryAsList(`select * from articles order by id`);

// async function getNthArticlePage(n) {
// 	return new Promise(function (resolve, reject) {
// 		if (n <= 1) {
// 			articles.then((articles) => {
// 				let end = false;
// 				let result = { articles: [], end: false };
// 				if (articles.length - 1 < 0) end = true;
// 				else result.articles.push(articles[0]);

// 				if (articles.length - 1 < 1) end = true;
// 				else result.articles.push(articles[1]);

// 				if (articles.length - 1 == 0 || articles.length - 1 == 1) end = true;

// 				result.end = end;

// 				resolve(result);
// 			});
// 		}
// 		let e1 = 4 * n - 6;
// 		let e2 = e1 + 1,
// 			e3 = e1 + 2,
// 			e4 = e1 + 3;
// 		let result = { articles: [], end: false };
// 		if (e1 > articles.length - 1) resolve(result);
// 		let end = false;
// 		articles.then((articles) => {
// 			if (articles.length - 1 < e1) end = true;
// 			else result.articles.push(articles[e1]);

// 			if (articles.length - 1 < e2) end = true;
// 			else result.articles.push(articles[e2]);

// 			if (articles.length - 1 < e3) end = true;
// 			else result.articles.push(articles[e3]);

// 			if (articles.length - 1 < e4) end = true;
// 			else result.articles.push(articles[e4]);

// 			if (articles.length - 1 == e4 || articles.length - 1 == e3 || articles.length - 1 == e2 || articles.length - 1 == e1) end = true;

// 			result.end = end;
// 			resolve(result);
// 		});
// 	});
// }

async function getNextArticle(currentIndex) {
	return new Promise(function (resolve, reject) {
		articles.then((articles) => {
			let nextIndex = currentIndex + 1;
			if (currentIndex > articles.length - 1) resolve(false);
			if (currentIndex < 0) resolve(articles[articles.length - 1]);
			if (nextIndex > articles.length - 1) resolve(false);
			resolve(articles[nextIndex]);
		});
	});
}

app.get("/", (req, res) => {
	// getNthArticlePage(1).then((results) => {
	if (isMobile(req)) return res.render("mobile/index.ejs", { data: { articles: [] } });
	res.render("desktop/index.ejs", { data: { articles: [] } });
	// });
});

app.get("/contact", (req, res) => {
	if (isMobile(req)) return res.render("mobile/contact.ejs", { mapConfig: { apiKey: apiKey, mapId: mapId } });
	res.render("desktop/contact.ejs", { mapConfig: { apiKey: apiKey, mapId: mapId } });
});

app.get("/galerie", (req, res) => {
	if (isMobile(req)) return res.render("mobile/galerie.ejs");
	res.render("desktop/galerie.ejs");
});

app.get("/mutari", (req, res) => {
	if (isMobile(req)) return res.render("mobile/mutari.ejs");
	res.render("desktop/mutari.ejs");
});

app.get("/preturi", (req, res) => {
	if (isMobile(req)) return res.render("mobile/preturi.ejs");
	res.render("desktop/preturi.ejs");
});

app.get("/sfaturi", async (req, res) => {
	getNthArticlePage(1).then((results) => {
		if (isMobile(req)) return res.render("mobile/sfaturi.ejs", { data: results });
		res.render("desktop/sfaturi.ejs", { data: results });
	});
});

app.get("/getArticlePage/:page", async (req, res) => {
	getNthArticlePage(req.params.page).then((result) => {
		res.json(result);
	});
});

app.get("/getNextArticle/:index", async (req, res) => {
	getNextArticle(parseInt(req.params.index)).then((result) => {
		res.json(result);
	});
});

app.get("/sfaturi/:idArticol", (req, res) => {
	articles.then((items) => {
		let index = -1;
		for (let i = 0; i < items.length; i++) {
			if (items[i].id2 == req.params.idArticol) {
				index = i;
				break;
			}
		}
		if (index == -1) {
			res.send("404");
		}

		if (isMobile(req)) return res.render("mobile/articol.ejs", { article: items[index], idArticol: req.params.idArticol });
		res.render("desktop/articol.ejs", { article: items[index], idArticol: req.params.idArticol });
	});
});

app.get("/termeni-si-conditii", (req, res) => {
	if (isMobile(req)) return res.render("mobile/tc.ejs");
	res.render("desktop/tc.ejs");
});

app.get("/spatii-de-depozitare-de-inchiriat-in-bucuresti-sector-6", (req, res) => {
	if (isMobile(req)) return res.render("mobile/spatiiSector6.ejs");
	res.render("desktop/spatiiSector6.ejs");
});

app.get("/inchiriere-spatiu-de-depozitare-si-boxe-de-inchiriat", (req, res) => {
	if (isMobile(req)) return res.render("mobile/spatiuInchiriat.ejs");
	res.render("desktop/spatiuInchiriat.ejs");
});

app.get("/boxa-depozitare-de-inchiriat-in-bucuresti", (req, res) => {
	if (isMobile(req)) return res.render("mobile/inchiriatBucuresti.ejs");
	res.render("desktop/inchiriatBucuresti.ejs");
});

app.post("/email", (req, res) => {
	let obj = req.autosan.body;
	if (!obj.nume || !obj.telefon || !obj.email) {
		req.flash("error", "Informatiile introduse sunt invalide");
		return res.redirect("back");
	}
	sendEmail(obj);
	req.flash("success", "Mesajul a fost trimis");
	return res.redirect("back");
});

const port = 3000;

app.listen(port, (err) => {
	if (err) {
		throw new Error(err);
	}
	console.log("Server started on port " + port + ".");
});

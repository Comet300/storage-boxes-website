function hamburgerClick() {
	document.querySelector("#hamburger-icon").classList.toggle("open");
	document.querySelector("nav").classList.toggle("open");
	document.querySelector("body").classList.toggle("fixed");
}

/*
setTimeout(() => {
	try {
		let cookieConsent = document.cookie;
		if (!cookieConsent.includes("cookieConsent")) {
			document.querySelector("#cookie-prompt").classList.add("cookie-visible");
			document.querySelector("#cookie-prompt button").addEventListener("click", () => {
				var CookieDate = new Date();
				CookieDate.setFullYear(CookieDate.getFullYear() + 1);
				document.cookie = "cookieConsent=true; expires=" + CookieDate.toGMTString() + ";";
				document.querySelector("#cookie-prompt").classList.remove("cookie-visible");
				document.querySelector("#cookie-prompt").classList.add("cookie-hidden");
			});
		}
	} catch (err) {}
}, 2000);
*/

function toggleDropdown(){
	document.querySelector(".dropdown").classList.toggle("active")
	document.querySelector("nav #tail span").classList.toggle("flip")
}


try{
	document.querySelector("#form-popup button").addEventListener('click',()=>{
		document.querySelector("#popup-background").classList.add("checked");
	});
}
catch(err){}
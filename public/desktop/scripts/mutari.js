//alignment fix
window.addEventListener("resize",()=>{
	if(window.innerWidth>1455){
        document.querySelector("#bg-right").style.right=0;
        document.querySelector("#truck-back").style.right="-35px";
	}
	else if(window.innerWidth<=1455 && window.innerWidth>=1440){
		value=Math.ceil((window.innerWidth-1455)*-1*(8/15));
		if(value>0)
            document.querySelector("#bg-right").style.right="-"+(Math.ceil((window.innerWidth-1455)*-1*(8/15)))+"px"
            document.querySelector("#truck-back").style.right="-31px";
	}
	else{
        document.querySelector("#bg-right").style.right="-8px";
	}
});

(function () {
	let delay=0;
	let carObserver = new IntersectionObserver(
		(entries) => {
			if (entries[0].intersectionRatio <= 0) {
				return;
			}
			entries[0].target.classList.add("visible");


			try {
				let dots = entries[0].target.querySelectorAll(".dot");
				setTimeout(() => {
					dots[0].classList.add("active");
				}, delay * 1000);
				delay += +0.8;
				setTimeout(() => {
					dots[1].classList.add("active");
				}, delay * 1000);
				delay += +0.5;
				setTimeout(() => {
					dots[2].classList.add("active");
				}, delay * 1000);
				delay += +0.4;
				setTimeout(() => {
					dots[3].classList.add("active");
				}, delay * 1000);
				delay += +0.4;
				setTimeout(() => {
					dots[4].classList.add("active");
				}, delay * 1000);
				delay += +0.8;
				setTimeout(() => {
					dots[5].classList.add("active");
				}, delay * 1000);
			} catch (err) {
				return;
			}

		},
		{
			threshold: 0.5,
		}
	);
	let sentinel = document.querySelector("#car-animation");
	carObserver.observe(sentinel);
})();
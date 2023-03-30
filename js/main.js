// Page loader
let loader = document.querySelector(".pageLoader");

window.onload = () => {
	loader.classList.remove("pageLoader--active");
	document.body.classList.add("page-loaded");
};

// Fixed header
let headerFixed = document.getElementById("fixHeader");
let mainBody = document.querySelector(".home-page");
let headerHeight = headerFixed.clientHeight;
let sticky = headerFixed.offsetTop;

window.onscroll = () => {
	if (window.pageYOffset > sticky) {
		headerFixed.classList.add("header-fixed--sticky");
		mainBody.style.paddingTop = headerHeight + "px";
	} else {
		headerFixed.classList.remove("header-fixed--sticky");
		mainBody.style.paddingTop = "0";
	}
};

// Mobile header menu
let hamburger = document.querySelector(".header-mobile__hamburger");
let mobileMenu = document.querySelector(".header-mobile-menu");
let pageOverlay = document.querySelector(".pageOverlay");
let headerMenuLinks = document.querySelectorAll(".header-menu__link");

hamburger.addEventListener("click", function () {
	mobileMenu.classList.add("header-mobile-menu--active");
	pageOverlay.classList.add("pageOverlay--active");
	this.classList.add("header-mobile__hamburger--active");
});

pageOverlay.addEventListener("click", function () {
	mobileMenu.classList.remove("header-mobile-menu--active");
	hamburger.classList.remove("header-mobile__hamburger--active");
	this.classList.remove("pageOverlay--active");
});

headerMenuLinks.forEach((each) => {
	each.addEventListener("click", () => pageOverlay.click());
});

// Smooth scroll to anchors
const smoothScroll = (targetEl, duration) => {
	let target = document.querySelector(targetEl);
	let targetPosition = target.getBoundingClientRect().top - headerHeight;
	let startPosition = window.pageYOffset;
	let startTime = null;

	const ease = (t, b, c, d) => {
		t /= d / 2;
		if (t < 1) return (c / 2) * t * t + b;
		t--;
		return (-c / 2) * (t * (t - 2) - 1) + b;
	};

	const animation = (currentTime) => {
		if (startTime === null) startTime = currentTime;
		const timeElapsed = currentTime - startTime;
		const run = ease(timeElapsed, startPosition, targetPosition, duration);
		window.scrollTo(0, run);
		if (timeElapsed < duration) requestAnimationFrame(animation);
	};

	requestAnimationFrame(animation);
};

const scrollTo = () => {
	const links = document.querySelectorAll(".js-scroll");
	links.forEach((each) => {
		each.addEventListener("click", function () {
			const currentTarget = this.getAttribute("href");
			smoothScroll(currentTarget, 1000);
		});
	});
};
scrollTo();

// Product slider
const swiper = new Swiper(".product-list", {
	autoplay: {
		delay: 2000,
	},
	navigation: {
		nextEl: ".product-button--next",
		prevEl: ".product-button--prev",
	},
	breakpoints: {
		320: {
			slidesPerView: 2,
			spaceBetween: 8,
		},
		640: {
			slidesPerView: 4,
			spaceBetween: 16,
		},
	},
});

// Copyright year
const currentYear = document.getElementById("currentYear");
currentYear.innerText = new Date().getFullYear();

// Animation
["load", "scroll"].forEach(function (e) {
	window.addEventListener(e, function () {
		// Intro animate
		let intro = document.querySelector(".intro");
		if (window.pageYOffset >= intro.offsetTop - 300) {
			intro.classList.add("intro--active");
		}
		// Info animate
		let infoItem = document.querySelectorAll(".info-inner__item");
		infoItem.forEach((each) => {
			if (window.pageYOffset >= each.offsetTop - 700) {
				each.classList.add("info-inner__item--active");
			}
		});
		// Product animate
		let product = document.getElementById("product");
		if (window.pageYOffset >= product.offsetTop - 570) {
			product.classList.add("product--active");
		}
	});
});

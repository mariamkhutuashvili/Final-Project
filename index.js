//scroll to top button
document.addEventListener("scroll", function () {
  let yPos = document.documentElement.scrollTop || document.body.scrollTop;

  if (yPos > 10) {
    document.getElementById("scroll-top-btn").style.bottom = "20px";
  } else {
    document.getElementById("scroll-top-btn").style.bottom = "-50px";
  }
});

function ScrollTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// navigation menu
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navUl = document.querySelector("nav ul");
  const body = document.body;
  const allNavLinks = document.querySelectorAll("nav ul li a");
  const submenuToggle = document.querySelector(".submenu-toggle");

  function toggleBodyScroll(isMenuOpen) {
    body.style.overflow = isMenuOpen ? "hidden" : "";
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      const isActive = this.classList.toggle("active");
      navUl.classList.toggle("active", isActive);
      toggleBodyScroll(isActive);
    });
  }

  allNavLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      const isPagesLinkOrDropdown =
        event.target.closest(".submenu-toggle") != null;
      if (!isPagesLinkOrDropdown) {
        menuToggle.classList.remove("active");
        navUl.classList.remove("active");
        toggleBodyScroll(false);
      }
    });
  });

  if (submenuToggle) {
    submenuToggle.addEventListener("click", function () {
      const dropdownMobile = this.querySelector(".submenu-mobile");
      const isDropdownVisible =
        window.innerWidth < 768 && dropdownMobile.style.display !== "flex";
      dropdownMobile.style.display = isDropdownVisible ? "flex" : "none";
    });
  }
});

//header banner slider
const images = document.querySelectorAll(".banner-slider img");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

let currentIndex = 0;
let slideshowInterval;
const slideshowDelay = 5000;

function setInitialImagePositions() {
  images.forEach((img, index) => {
    img.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
  });
}

function moveToImage(index) {
  currentIndex = index;
  images.forEach((img, i) => {
    img.style.opacity = i === currentIndex ? "1" : "0";
    img.style.transform = `translateX(${(i - currentIndex) * 100}%)`;
  });
}

function startSlideshow() {
  clearInterval(slideshowInterval);
  slideshowInterval = setInterval(() => {
    let nextIndex = (currentIndex + 1) % images.length;
    moveToImage(nextIndex);
  }, slideshowDelay);
}

function handleUserInteraction(nextIndex) {
  clearInterval(slideshowInterval);
  moveToImage(nextIndex);
  setTimeout(startSlideshow, slideshowDelay);
}

setInitialImagePositions();

startSlideshow();

btnPrev.addEventListener("click", () => {
  let prevIndex = (currentIndex - 1 + images.length) % images.length;
  handleUserInteraction(prevIndex);
});

btnNext.addEventListener("click", () => {
  let nextIndex = (currentIndex + 1) % images.length;
  handleUserInteraction(nextIndex);
});

// explore more box
let header = document.querySelector("header");
let exploreMore = header.querySelector(".btn-blue");
let exploreContent = document.querySelector(".explore-content");
let btnClose = exploreContent.querySelector(".btn-close");
let body = document.body;
let newDiv = document.createElement("div");
newDiv.classList.add("exploreMoreText");
let modalOverlay = document.querySelector(".modal-overlay");

exploreMore.addEventListener("click", function () {
  exploreContent.style.display = "block";
  modalOverlay.style.display = "block";
  body.classList.add("no-scroll");
});

btnClose.addEventListener("click", function () {
  exploreContent.style.display = "none";
  modalOverlay.style.display = "none";
  body.classList.remove("no-scroll");
});

newDiv.innerHTML = `
Your Financial Status Is Our Goal
At Finanza, we are dedicated to empowering you on your financial journey.
Our mission is to provide you with the tools, resources, and guidance you need to achieve your financial goals.

Whether you're planning for retirement, saving for a home, or simply looking to better manage your finances, we're here to help.
Our team of experts is committed to understanding your unique financial situation and working with you to develop personalized strategies for success.`;
exploreContent.prepend(newDiv);

// about us tabs
let storyTab = document.getElementById("storyTab");
let missionTab = document.getElementById("missionTab");
let vissionTab = document.getElementById("vissionTab");
let storyContent = document.getElementById("storyContent");
let missionContent = document.getElementById("missionContent");
let vissionContent = document.getElementById("vissionContent");

storyTab.addEventListener("click", function () {
  storyContent.style.display = "block";
  missionContent.style.display = "none";
  vissionContent.style.display = "none";
  this.classList.add("activeBtn");
  missionTab.classList.remove("activeBtn");
  vissionTab.classList.remove("activeBtn");
});

missionTab.addEventListener("click", function () {
  missionContent.style.display = "block";
  storyContent.style.display = "none";
  vissionContent.style.display = "none";
  this.classList.add("activeBtn");
  storyTab.classList.remove("activeBtn");
  vissionTab.classList.remove("activeBtn");
});

vissionTab.addEventListener("click", function () {
  vissionContent.style.display = "block";
  storyContent.style.display = "none";
  missionContent.style.display = "none";
  this.classList.add("activeBtn");
  storyTab.classList.remove("activeBtn");
  missionTab.classList.remove("activeBtn");
});

//contact form
let form = document.getElementById("contactForm");
let phoneInput = document.getElementById("phone");
let phoneError = document.getElementById("phoneError");
let phoneError2 = document.getElementById("phoneError2");
let subjectInput = document.getElementById("subject");
let subjectError = document.getElementById("subjectError");
let textarea = document.getElementById("message");

form.addEventListener("submit", function (event) {
  let isWidthGreaterThan768 = window.innerWidth > 768;

  if (subjectInput.value.length < 5) {
    event.preventDefault();
    subjectError.classList.remove("hidden");
    if (!isWidthGreaterThan768) {
      textarea.style.marginTop = "-14px";
    }
  } else {
    subjectError.classList.add("hidden");
  }

  if (phoneInput.value.length != 13) {
    event.preventDefault();
    phoneError.classList.remove("hidden");
    if (!isWidthGreaterThan768) {
      subjectInput.style.marginTop = "-19px";
    }
  } else {
    phoneError.classList.add("hidden");
  }

  if (!phoneInput.value.startsWith("+995")) {
    event.preventDefault();
    phoneError2.classList.remove("hidden");
    if (!isWidthGreaterThan768) {
      subjectInput.style.marginTop = "-19px";
    }
  } else {
    phoneError2.classList.add("hidden");
  }

  if (isWidthGreaterThan768) {
    if (
      subjectInput.value.length < 5 ||
      phoneInput.value.length != 13 ||
      !phoneInput.value.startsWith("+995")
    ) {
      textarea.style.marginTop = "-14px";
    } else {
      textarea.style.marginTop = "";
    }
  }
});

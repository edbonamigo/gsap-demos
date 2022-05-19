gsap.registerPlugin(ScrollTrigger);

// helpers
const select = (element) => document.querySelector(element);
const selectAll = (element) => document.querySelectorAll(element);

function progressivelyLoadImgs() {
  // this function delays the loading of images until the js script is loaded
  let placeholder = document.querySelector(".load-progressively");
  if (placeholder) {
    placeholder.classList.remove("load-progressively");
    var image = new Image();
    image.src = placeholder.dataset.img;
    // no need to run onload, because we have a loader that waits content load
    // image.onload = () => progressivelyLoadImgs();
    progressivelyLoadImgs();
  }
}
progressivelyLoadImgs();

let bodyScrollBar;
const loader = select(".loader");
const loaderInner = select(".loader .inner");
const progressBar = select(".loader .progress");

function initLoading() {
  // twen for the loader progress bar
  const progressTween = gsap.to(progressBar, {
    paused: true,
    scaleX: 0,
    ease: "none",
    transformOrigin: "right",
  });

  // setup variables
  let loadedImageCount = 0;
  let imageCount;
  const container = select("#main");

  const imgLoad = imagesLoaded(container);
  imageCount = imgLoad.images.length;

  updateProgress(0);

  // triggered after each item is loaded
  imgLoad.on("progress", () => {
    loadedImageCount++;
    updateProgress(loadedImageCount);
  });

  // update the progress of our progressBar tween
  function updateProgress(value) {
    // tween progress bar tween to the right value
    gsap.to(progressTween, {
      progress: value / imageCount,
      duration: 0.3,
      ease: "power1.out",
    });
  }

  // do whatever you want when all images are loaded
  imgLoad.on("done", function (instance) {
    // we will simply init our loader animation onComplete
    gsap.set(progressBar, {
      autoAlpha: 0,
      onComplete: initContent,
    });
  });
}

initLoading();
// window.addEventListener("resize", initBasedOnPageSize);

function initContent() {
  initIntro();
  initSmoothScrollbar();
  initNavigation();
  initLinkScrollTo();
  initHero();
  initHideHeroOnScroll();
  initImageParallax();
  initPinNavParallax();
  initColumnAnimation();
  initHover();
}

function initIntro() {
  const tlLoaderIn = gsap.timeline({
    defaults: {
      // duration: 1.1,
      duration: 0.1,
      ease: "power2.out",
    },
    onComplete: () => select("body").classList.remove("is-loading"),
  });

  const image = select(".loader__image img");
  const mask = select(".loader__image--mask");
  const line1 = select(".loader__title--mask:nth-child(1) span");
  const line2 = select(".loader__title--mask:nth-child(2) span");
  const lines = selectAll(".loader__title--mask");

  const loaderContent = select(".loader__content");

  tlLoaderIn
    .set(loaderContent, { autoAlpha: 1 })
    .to(loaderInner, {
      scaleY: 1,
      transformOrigin: "bottom",
      ease: "power1.inOut",
    })
    .addLabel("revealImage")
    .from(mask, { yPercent: 100 }, "revealImage-=0.6")
    .from(image, { yPercent: -80 }, "revealImage-=0.6")
    .from(
      [line1, line2],
      { yPercent: 100, stagger: "0.1" },
      "revealImage-=0.4"
    );

  const tlLoaderOut = gsap.timeline({
    defaults: {
      // duration: 1.2,
      duration: 0.2,
      ease: "power2.inOut",
    },
    delay: 0.4,
  });

  tlLoaderOut
    .to(lines, { yPercent: -400, stagger: 0.1 }, 0)
    .to([loader, loaderContent], { yPercent: -100 }, 0.2)
    .from("#main", { y: 150 }, 0.2);

  const tlLoader = gsap.timeline();
  tlLoader.add(tlLoaderIn).add(tlLoaderOut);
}

function initSmoothScrollbar() {
  bodyScrollBar = Scrollbar.init(document.querySelector("#viewport"), {
    damping: 0.07,
  });

  bodyScrollBar.track.xAxis.element.remove();

  // Tell ScrollTrigger to use these proxy getter/setter methods for the "body" element:
  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      if (arguments.length) {
        bodyScrollBar.scrollTop = value; // setter
      }
      return bodyScrollBar.scrollTop; // getter
    },
  });

  // when the smooth scroller updates, tell ScrollTrigger to update() too:
  bodyScrollBar.addListener(ScrollTrigger.update);
}

function initLinkScrollTo() {
  const mainNav = gsap.utils.toArray(".main-nav__link");
  const logo = gsap.utils.toArray(".logo__img");
  const sideBarLinks = gsap.utils.toArray(".fixed-nav a");
  const links = mainNav.concat(logo, sideBarLinks);

  links.forEach((link) => {
    const target = link.getAttribute("href");

    link.addEventListener("click", (e) => {
      e.preventDefault();
      bodyScrollBar.scrollIntoView(document.querySelector(target), {
        damping: 0.07,
        offsetTop: 100,
      });
    });
  });
}

function initNavigation() {
  const mainNavLinks = gsap.utils.toArray(".main-nav a");
  const mainNavLinksReversed = gsap.utils.toArray(".main-nav a").reverse();
  mainNavLinks.forEach((link) => {
    link.addEventListener("mouseleave", (e) => {
      link.classList.add("animate-out");
      setTimeout(() => {
        link.classList.remove("animate-out");
      }, 300);
    });
  });

  function navAnimation(direction) {
    const scrollDown = direction === 1;
    const pointerEvent = scrollDown ? "none" : "auto";
    const links = scrollDown ? mainNavLinks : mainNavLinksReversed;
    scrollDown
      ? document.body.classList.add("has-scrolled")
      : document.body.classList.remove("has-scrolled");
    return gsap.to(links, {
      duration: 0.3,
      stagger: 0.05,
      autoAlpha: () => (scrollDown ? 0 : 1),
      y: () => (scrollDown ? 20 : 0),
      onComplete: () =>
        links.forEach(
          (link) =>
            (link.parentNode.parentNode.parentNode.style.pointerEvents =
              pointerEvent)
        ),
      ease: "power1.out",
    });
  }

  ScrollTrigger.create({
    start: 100,
    onEnter: ({ direction }) => navAnimation(direction),
    onLeaveBack: ({ direction }) => navAnimation(direction),
  });
}

function initHero() {
  select("header").addEventListener("mousemove", moveHeroImages);
}

function initHideHeroOnScroll() {
  const elements = gsap.utils.toArray(".js-hide-on-scroll");
  // const element = document.querySelector('.js-hide-on-scroll');

  elements.forEach((element) => {
    gsap.to(element, {
      skewY: "5deg",
      translateY: "-40px",
      autoAlpha: 0,
      ease: "power1.out",
      scrollTrigger: {
        trigger: element,
        start: "top top+=100",
        end: "bottom top+=100",
        scrub: true,
        // markers: true
      },
    });
  });
}

function moveHeroImages(e) {
  // Mouse position
  const { offsetX, offsetY, target } = e;
  const { clientWidth, clientHeight } = target;
  // Size to translate images
  const xPos = (offsetX / clientWidth - 0.5) * 16;
  const yPos = (offsetY / clientHeight - 0.5) * 20;
  // The images
  const leftImages = gsap.utils.toArray(".hg__left .hg__image");
  const rightImages = gsap.utils.toArray(".hg__right .hg__image");
  // Modifier for different images
  const modifierTopToLeft = (index) => index * 1.2 + 1;
  const modifierBottomToCenter = (index) => {
    const scale = 1.2;
    if (index == 0) {
      return 2 * scale;
    } else if (index == 1) {
      return 3 * scale;
    } else {
      return 1 * scale;
    }
  };

  leftImages.forEach((image, index) => {
    gsap.to(image, {
      duration: 1.2,
      x: xPos * modifierTopToLeft(index),
      y: yPos * modifierTopToLeft(index),
      rotationY: xPos * 2,
      rotationX: yPos * -1.5,
    });
  });
  rightImages.forEach((image, index) => {
    gsap.to(image, {
      duration: 1.2,
      x: xPos * modifierBottomToCenter(index),
      y: -yPos * modifierBottomToCenter(index),
      rotationY: xPos * 2,
      rotationX: yPos * -1.5,
    });
  });
  gsap.to(".decor__circle", {
    duration: 1.5,
    x: xPos * 4,
    y: yPos * 2,
    ease: "power1.out",
  });
}

function initColumnAnimation() {
  const columns = document.querySelectorAll(".rg__column");
  columns.forEach((column) => {
    (column.imgBlock = column.querySelector(".rg__image")),
      (column.imgMask = column.querySelector(".rg__image--mask"));
    column.textBlock = column.querySelector(".rg__text");
    column.textMask = column.querySelector(".rg__text--mask");
    column.text = column.querySelector(".rg__text--copy");

    gsap.set(column.imgBlock, { yPercent: -101 });
    gsap.set(column.imgMask, { yPercent: 100, scale: 1.3 });
    gsap.set(column.text, { yPercent: -100 });
    gsap.set(column.textMask, { yPercent: 101 });

    createColumnAnimation(column);

    column.addEventListener("mouseenter", setActionColumnAnimation);
    column.addEventListener("mouseleave", setActionColumnAnimation);
  });
}

function createColumnAnimation(column) {
  const { imgBlock, imgMask, textBlock, text, textMask } = column;
  column.tl = gsap.timeline({
    paused: true,
    duration: 0.1,
    ease: "power1.out",
  });

  column.tl
    .to(imgBlock, { yPercent: 0 }, 0)
    .to(imgMask, { yPercent: 0, scale: 1 }, 0)
    .to(textBlock, { y: () => -getElementHeight(text) / 2 }, 0)
    .to([textMask, text], { yPercent: 0 }, 0);
}

function getElementHeight(element) {
  return element.clientHeight;
}

function setActionColumnAnimation(e) {
  let tl = e.target.tl;
  if (e.type == "mouseenter") {
    tl.play();
  } else if (e.type == "mouseleave") {
    tl.reverse();
  }
}

const portfolioImage = document.querySelector(".image_inside");
const fillBackground = document.querySelector(".fill-background");
const allLinks = document.querySelectorAll(".portfolio__categories a");

function initHover() {
  allLinks.forEach((link) => {
    link.addEventListener("mouseenter", createHoverAnimation);
    link.addEventListener("mouseleave", createHoverAnimation);
  });
  let yPos;
  let portfolioHeight = document.querySelector(
    ".portfolio__categories"
  ).clientHeight;
  document
    .querySelector(".portfolio__categories")
    .addEventListener("mousemove", function (e) {
      yPos = (e.clientY - portfolioHeight) / 4 + 30;
      gsap.to(portfolioImage, {
        duration: 0.6,
        y: yPos,
      });
    });
}

function createHoverAnimation(e) {
  let { color, img } = e.target.dataset;
  if (e.type == "mouseenter") {
    portfolioImage.style.backgroundImage = `url(${img})`;

    gsap.to(portfolioImage, {
      duration: 0.6,
      visibility: "visible",
      autoAlpha: 1,
      ease: "power1.out",
    });

    fillBackground.style.backgroundColor = color;
  } else if (e.type == "mouseleave") {
    gsap.to(portfolioImage, {
      duration: 0.6,
      autoAlpha: 0,
      ease: "power1.out",
    });

    fillBackground.style.backgroundColor = "var(--bg-default)";
  }
}

function initImageParallax() {
  const sections = document.querySelectorAll(".with-parallax");

  sections.forEach((section) => {
    const imageWrapper = section.querySelector(".stage__image");
    const image = section.querySelector("img");
    gsap.to(image, {
      yPercent: 23,
      ease: "Poweer2.easeIn",
      scrollTrigger: {
        trigger: imageWrapper,
        start: "top bottom",
        scrub: true,
      },
    });
  });
}

function initPinNavParallax() {
  ScrollTrigger.create({
    trigger: ".fixed-nav",
    start: "top 40%",
    endTrigger: "#stage4",
    end: "center center",
    pin: true,
    pinReparent: true,
  });

  // get viewport height
  const getVh = () => {
    const vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );
    return vh;
  };

  const updateBodyColor = (color) => {
    fillBackground.style.backgroundColor = color;
  };

  const stages = gsap.utils.toArray(".stage");
  lastStage = stages.length - 1;

  stages.forEach((stage, index) => {
    const navLinks = gsap.utils.toArray(".fixed-nav li");

    ScrollTrigger.create({
      trigger: stage,
      start: "top 60%",
      end: () => `+=${stage.clientHeight + getVh() / 10}`,
      toggleClass: {
        targets: navLinks[index],
        className: "is-active",
      },
      onEnter: () => updateBodyColor(stage.dataset.color),
      onEnterBack: () => updateBodyColor(stage.dataset.color),
      onLeaveBack: () =>
        index == 0 ? updateBodyColor("var(--bg-default)") : null,
      onLeave: () =>
        index == lastStage ? updateBodyColor("var(--bg-default)") : null,
    });
  });
}

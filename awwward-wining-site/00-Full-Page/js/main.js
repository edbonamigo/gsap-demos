gsap.registerPlugin(ScrollTrigger);

function initNavigation() {
  const mainNavLinks = gsap.utils.toArray('.main-nav a');
  const mainNavLinksReversed = gsap.utils.toArray('.main-nav a').reverse();
  mainNavLinks.forEach( link => {
    link.addEventListener('mouseleave', e => {
      link.classList.add('animate-out');
      setTimeout(() => {
        link.classList.remove('animate-out');
      }, 300)
    });
  });

  function navAnimation(direction) {
    const scrollDown = direction === 1;
    const pointerEvent = scrollDown ? 'none' : 'auto';
    const links = scrollDown ? mainNavLinks : mainNavLinksReversed;
    return gsap.to( links, {
      duration: 0.3,
      stagger: 0.05,
      autoAlpha: () => scrollDown ? 0 : 1,
      y: () => scrollDown ? 20 : 0,
      onComplete: () => links.forEach (link => link.parentNode.parentNode.parentNode.style.pointerEvents = pointerEvent),
      ease: 'power1.out',
    });
  }

  ScrollTrigger.create({
    start: 100,
    end: 'bottom bottom-=20',
    toggleClass: {
      targets: 'body',
      className: 'has-scrolled'
    },
    onEnter: ({direction}) => navAnimation(direction),
    onLeaveBack: ({direction}) => navAnimation(direction)
  });
}

function initHeaderTilt() {
  document.querySelector('header').addEventListener('mousemove', moveImages);
}
function moveImages(e) {
  
  // Mouse position
  const { offsetX, offsetY, target } = e;
  const { clientWidth, clientHeight } = target;
  // console.log( offsetX, translateX, offsetY, translateY );  
  // Size to translate images
  const xPos = ((offsetX/clientWidth) - 0.5) * 15;
  const yPos = ((offsetY/clientHeight) - 0.5) * 20;
  // The images
  const leftImages = gsap.utils.toArray('.hg__left .hg__image');
  const rightImages = gsap.utils.toArray('.hg__right .hg__image'); 
  // Modifier for different images
  const modifierTopToLeft = (index) => index*1.2+1;
  const modifierBottomToCenter = (index) => {
    const scale = 1.2
    if (index == 0) {
      return 2*scale;
    } else if (index == 1) {
      return 3*scale;
    } else {
      return 1*scale;
    }
  }

  leftImages.forEach((image, index) => {
    gsap.to(image, {
      duration: 1,
      x: xPos * modifierTopToLeft(index),
      y: yPos * modifierTopToLeft(index),
      rotationY: xPos*2,
      rotationX: yPos*-1.5
    })
  });
  rightImages.forEach((image, index) => {
    gsap.to(image, {
      duration: 1,
      x: xPos * modifierBottomToCenter(index),
      y: - yPos * modifierBottomToCenter(index),
      rotationY: xPos*2,
      rotationX: yPos*-1.5
    })
  });
  gsap.to('.decor__circle', {
    duration: 1,
    x: xPos*3,
    y: yPos*2,
    ease: 'power1.out'
  });

}

function initHideOnScroll() {

  const elements = gsap.utils.toArray('.js-hide-on-scroll');
  // const element = document.querySelector('.js-hide-on-scroll');

  elements.forEach( element => {
    gsap.to(element, {
      skewY: '5deg',
      translateY: '-40px',
      autoAlpha: 0,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: element,
        start: 'top top+=100',
        end: 'bottom top+=100',
        scrub: true,
        // markers: true
      }
    });
  });
}

const columns  = document.querySelectorAll('.rg__column');
function initColumnAnimation() {
  columns.forEach( (column) => {
    column.imgBlock   = column.querySelector('.rg__image'),
    column.imgMask    = column.querySelector('.rg__image--mask');
    column.textBlock  = column.querySelector('.rg__text');
    column.textMask   = column.querySelector('.rg__text--mask');
    column.text       = column.querySelector('.rg__text--copy');

    gsap.set(column.imgBlock, {yPercent: -101});
    gsap.set(column.imgMask, {yPercent: 100, scale: 1.3});
    gsap.set(column.text, {yPercent: -100});
    gsap.set(column.textMask, {yPercent: 101});

    createColumnAnimation(column);

    column.addEventListener('mouseenter', setActionColumnAnimation);
    column.addEventListener('mouseleave', setActionColumnAnimation);
  });
}

function createColumnAnimation(column) {
  const { imgBlock, imgMask, textBlock, text, textMask } = column;
  column.tl = gsap.timeline({
    paused: true,
    duration: 0.1,
    ease: 'power1.out'
  });

  column.tl
    .to( imgBlock, {yPercent: 0}, 0)
    .to( imgMask, {yPercent: 0, scale: 1}, 0)
    .to( textBlock, {y: () => -getElementHeight(text)/2}, 0)
    .to( [textMask, text], {yPercent: 0}, 0);
}

function getElementHeight(element) {
  return element.clientHeight;
}

function setActionColumnAnimation(e) {
  let tl = e.target.tl;
  if (e.type == 'mouseenter') {
    tl.play();
  } else if (e.type == 'mouseleave') {
    tl.reverse();
  }
}

const portfolioImage = document.querySelector('.image_inside');
const fillBackground = document.querySelector('.fill-background');
const allLinks = document.querySelectorAll('.portfolio__categories a');

function initPortfolio() {
  allLinks.forEach(link => {
    link.addEventListener('mouseenter', createPortfolioAnimation);
    link.addEventListener('mouseleave', createPortfolioAnimation);
    
  });
  let yPos
  let portfolioHeight = document.querySelector('.portfolio__categories').clientHeight;
  document.querySelector('.portfolio__categories').addEventListener('mousemove', function(e) {
    yPos = (e.clientY - portfolioHeight)/4 + 30;
    gsap.to(portfolioImage, {
      duration: .6,
      y: yPos
    })
  });
}

function createPortfolioAnimation(e) {
  let { color, img } = e.target.dataset;
  if (e.type == 'mouseenter') {
    
    allLinks.forEach( link => {
      link.style.color = '#FFF'; 
      link !== e.target ? link.style.opacity = '0.3' : link.style.opacity = '1';
    });
    
    portfolioImage.style.backgroundImage = `url(${img})`;

    gsap.to(portfolioImage, {
      duration: .6,
      visibility: 'visible',
      autoAlpha: 1,
      ease: 'power1.out',
    })

    fillBackground.style.backgroundColor = color;

  } else if (e.type == 'mouseleave') {
    
    allLinks.forEach( link => {
      link.style.color = 'var(--text-dark-color)'; 
      link.style.opacity = '1';
    });

    gsap.to(portfolioImage, {
      duration: .6,
      autoAlpha: 0,
      ease: 'power1.out',
    })

    fillBackground.style.backgroundColor = '#F17455';
  }
}

function progressivelyLoadContent() {
	let placeholder = document.querySelector('.load-progressively');
	if (placeholder) {
		placeholder.classList.remove('load-progressively');
		var image = new Image();
		image.src = placeholder.dataset.img;
		image.onload = () => progressivelyLoadContent();
	}
}
 
const mediaQuery = window.matchMedia('(min-width: 1100px)');

window.addEventListener('load', function(){
  handleInitsBasedOnPageSize(mediaQuery);
});

mediaQuery.addListener(handleInitsBasedOnPageSize);


function resetCssProps(elements) {
  console.log(elements)
  gsap.killTweensOf('*');
  if (elements.length) {
    elements.forEach(el => {
      console.log(el);
      el && gsap.set(el, {clearProps: 'all'});
    });
  }
}

function handleInitsBasedOnPageSize(mediaQuery) {

  initNavigation();
  initHideOnScroll();
  progressivelyLoadContent();

  if ( mediaQuery.matches ) {
    console.log('Desktop');
    initHeaderTilt();
    initColumnAnimation();
    initPortfolio();
  } else {
    alert('Sorry, mobile still in development.');

    columns.forEach(column => {
      column.removeEventListener('mouseenter', setActionColumnAnimation);
      column.removeEventListener('mouseleave', setActionColumnAnimation);

      const { imgBlock, imgMask, textBlock, text, textMask } = column;
      resetCssProps([imgBlock, imgMask, textBlock, text, textMask]);
    });  

  }
}
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
    const links = scrollDown ? mainNavLinks : mainNavLinksReversed;
    return gsap.to( links, {
      duration: 0.3,
      stagger: 0.05,
      autoAlpha: () => scrollDown ? 0 : 1,
      y: () => scrollDown ? 20 : 0,
      ease: 'Power4.out',
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
    ease: 'Power4.out'
  });

}

function init(){
  const mediaQuery = window.matchMedia('(min-width: 1100px)');
    
  initNavigation();
  if(mediaQuery.matches) {
    initHeaderTilt();
  }
}

window.addEventListener('load', function(){
    init();
});
 
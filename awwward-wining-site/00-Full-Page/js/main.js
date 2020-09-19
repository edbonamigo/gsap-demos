gsap.registerPlugin(ScrollTrigger);

function init(){
    
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

window.addEventListener('load', function(){
    init();
});

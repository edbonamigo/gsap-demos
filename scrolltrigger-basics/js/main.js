
function init() {
  
  gsap.registerPlugin(ScrollTrigger);

  // Simple tween
  gsap.to('#intro img', {
    scrollTrigger: {
      trigger: '#intro',
      start: 'top top', // trigger marker
      end: 'bottom center',
      scrub: true,
      // markers: true
    },
    opacity: 0, 
  });

  // Toogle css class
  gsap.set('#project02', {
    scrollTrigger: {
      trigger: '#project02',
      start: 'top bottom-=10%', // trigger marker
      end: 'bottom center-=10%',
      toggleClass: 'active',
      // markers: true,
      reverse: true,
    }
  });

  // background parallax and text tween
  const parallaxTimeline = gsap.timeline({
    ease: 'none',
    scrollTrigger: {
      trigger: '.bcg-parallax',
      start: 'top bottom', // trigger marker
      scrub: true,
      markers: true
    }
  });

  parallaxTimeline
    .from('.content-wrapper', { duration: 0.4, autoAlpha: 0, }, 0.5)
    .from('.bcg', { duration: 2, y: '-30%'}, 0);

}

window.addEventListener('load', function() {
  init();
})
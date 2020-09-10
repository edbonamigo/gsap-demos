function init() {

  gsap.registerPlugin(ScrollTrigger);

  gsap.to('#intro img', {
    scrollTrigger: {
      trigger: '#intro',
      start: 'top top',
      end: 'bottom center',
      scrub: true,
      markers: true
    },
    opacity: 0, 
  });

}

window.addEventListener('load', function() {
  init();
})
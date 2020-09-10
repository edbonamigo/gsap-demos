function init() {

  gsap.registerPlugin(ScrollTrigger);

  // Simple tween
/*  gsap.to('#intro img', {
    scrollTrigger: {
      trigger: '#intro',
      start: 'top top',
      end: 'bottom center',
      scrub: true,
      // markers: true
    },
    opacity: 0, 
  });
*/

  // Toogle css class
  gsap.set('#project02', {
    scrollTrigger: {
      trigger: '#project02',
      start: 'top bottom+=10%',
      end: 'bottom center-=10%',
      toggleClass: 'active',
      markers: true,
      reverse: true,
    }
  });

}

window.addEventListener('load', function() {
  init();
})
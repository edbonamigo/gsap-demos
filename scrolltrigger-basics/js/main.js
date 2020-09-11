
function init() {
  
  gsap.registerPlugin(ScrollTrigger);

  /*
  
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
*/
  
  // Pining elements

  gsap.to( ['#intro h1', '#intro p'], {
    autoAlpha: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '#intro .content',
      start: 'top top+=5%',
      end: 'bottom top+=10%',
      pin: true,
      scrub: true,
      // markers: true
    }
  })
  
  // Background parallax and text tween

  const parallaxTimeline = gsap.timeline({
    ease: 'none',
    scrollTrigger: {
      trigger: '.bcg-parallax',
      start: 'top bottom', // trigger marker
      scrub: true,
      // markers: true
    }
  });

  parallaxTimeline
  .from('.content-wrapper', { duration: 0.4, autoAlpha: 0, }, 0.5)
  .from('.bcg', { duration: 2, y: '-30%'}, 0);
  

  // Toggle multiple sections

  const projects = document.querySelectorAll('.project');

  projects.forEach( project => {

    gsap.from( project, {
      opacity: 0,
      yPercent: 5,
      scrollTrigger: {
        trigger: project.querySelector('img'),
        start: 'top bottom-=300',
        end: 'top center',
        toggleActions: 'play none none reverse',
        markers: true,
      },
    });

  });

}

window.addEventListener('load', function() {
  init();
})
// gsap.from( 'ul li:not(:last-child)', {
//   duration: .4,
//    x: -10,
//    ease: 'power1.out',
//    opacity: 0,
//    stagger: .1,
//   //  repeat: 1,
//   //  repeatDelay: 1,
//   }
// );

// gsap.to( 'ul li:last-child', {
//   duration: .4,
//    x: 50,
//    ease: 'power2.out',
//    delay: .7,
//    yoyo: true,
//   }
// );

// gsap.fromTo('header', 
//   {x: -40}, 
//   {
//     x:40, 
//     duration: .5,
//     repeat: -1,
//     ease: 'power2.inOut',
//     yoyo: true,
//   }
// )

// gsap.set( 'ul',
//   { y: 40 }
// )

// Exercize:
let tl = gsap.timeline({
  duration: .4,
  ease: 'power1.out',
})

tl.fromTo( 'body', 
  { backgroundColor: '#fff' },
  {
    duration: .8,
    backgroundColor: '#76c897',
    ease: 'linear',
  }
).from( ['h1', 'p'],
  { 
    opacity: 0, 
    y: -20,
    stagger: .4,
  }
).from( 'img, h2',
  { 
    opacity: 0 
  }
).from( 'ul li',
  {
    zIndex: -1,
    opacity: 0,
    y: -20,
    stagger: .2,
  }
)
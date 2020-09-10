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

const runStart = () => {
  console.log('started!');
}
const runUpdate = () => {
  console.log('updated!');
}
const runComplete = () => {
  console.log('completed!');
}

let tl = gsap.timeline({
  paused: false,
  onStart: runStart,
  onUpdate: runUpdate,
  onComplete: runComplete
})

tl
  .from( 'body', 
    {
      duration: 1.7,
      backgroundColor: '#fff',
      ease: 'linear',
    }
  )
  .from( ['h1', 'p'],
    { 
      opacity: 0, 
      duration: .6,
      y: -20,
      ease: 'none',
      stagger: .2,
    },
    '-=1'
  )
  .from( 'img, h2',
    { 
      opacity: 0 
    }
  )
  .from( 'ul li',
  {
    zIndex: -1,
    opacity: 0,
    y: -20,
    stagger: .2,
  }
); 

const playButton = document.querySelector('#btnPlay');
const pauseButton = document.querySelector('#btnPause');
const resumeButton = document.querySelector('#btnResume');
const reverseButton = document.querySelector('#btnReverse');
const speedUpButton = document.querySelector('#btnSpeedUp');
const slowDownButton = document.querySelector('#btnSlowDown');
const seekButton = document.querySelector('#btnSeek');
const progressButton = document.querySelector('#btnProgress');
const restartButton = document.querySelector('#btnRestart');
const killButton = document.querySelector('#btnKill');

playButton.addEventListener('click', () => {
  tl.play();
});

pauseButton.addEventListener('click', () => {
  tl.pause();
});

resumeButton.addEventListener('click', () => {
  tl.resume();
});

reverseButton.addEventListener('click', () => {
  tl.reverse();
});

speedUpButton.addEventListener('click', () => {
  tl.timeScale(2);
});

slowDownButton.addEventListener('click', () => {
  tl.timeScale(.5);
});

console.log(tl.duration());
seekButton.addEventListener('click', () => {
  tl.seek(1);
});

progressButton.addEventListener('click', () => {
  tl.progress(.5);
});

restartButton.addEventListener('click', () => {
  tl.restart();
});

killButton.addEventListener('click', () => {
  tl.kill();
});



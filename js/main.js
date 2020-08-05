gsap.registerPlugin(MotionPathPlugin);

/* Logo */
$(window).scroll(function () {
  if ($(this).scrollTop() > 50) {
    $('#logo').addClass('small');
  } else {
    $('#logo').removeClass('small');
  }
});

// PAGE INITIALIZE START

// Virus Spin

const SPIN_TIME = 20;
const TRANSLATION_TIME = 2;
const TRAVEL_DISTANCE = 50;
const PARTICLE_RANDOM_PATH_TIME = 5;

const spinNormalTween = new TweenLite.to('.spin-normal', SPIN_TIME, {
  rotation: 360,
  ease: Linear.easeNone,
  repeat: -1,
});
const spinSlowTween = new TweenLite.to('.spin-slow', SPIN_TIME / 0.6, {
  rotation: 360,
  ease: Linear.easeNone,
  repeat: -1,
});

const spinSlowerTween = new TweenLite.to('.spin-slower', SPIN_TIME / 0.3, {
  rotation: 360,
  ease: Linear.easeNone,
  repeat: -1,
});

const virusPrimaryTranslateTween = Array.from(document.querySelectorAll('.section-01 .virus-primary')).map((v) =>
  TweenLite.to(v, TRANSLATION_TIME, {
    translateY: -TRAVEL_DISTANCE,
    ease: Power1.easeInOut,
    repeat: -1,
    yoyo: true,
  })
);

const virusSecondaryTranslateTween = Array.from(document.querySelectorAll('.section-01 .virus-secondary')).map((v) =>
  TweenLite.to(v, TRANSLATION_TIME, {
    translateY: -TRAVEL_DISTANCE * 0.8,
    ease: Power1.easeInOut,
    repeat: -1,
    yoyo: true,
  })
    .progress(Math.random())
    .play()
);

const virusTertiaryTranslateTween = Array.from(document.querySelectorAll('.section-01 .virus-tertiary')).forEach((v) =>
  TweenLite.to(v, TRANSLATION_TIME, {
    translateY: -TRAVEL_DISTANCE * 0.6,
    ease: Power1.easeInOut,
    repeat: -1,
    yoyo: true,
  })
    .progress(Math.random())
    .play()
);

const particlesRandomizeTween = Array.from(document.querySelectorAll('.section-01 .particles')).map((p) =>
  TweenLite.to(p, PARTICLE_RANDOM_PATH_TIME, {
    motionPath: {
      path: 'M-2.5,1.09C-20.55,7.55-23,15.02-23,26c0,38,36,24,44,34s11,27,27,36c23.47,13.2,45.2-6.09,43-27  c-2-19-10.88-36.8,3-45c22-13,26-42,7-54c-23.22-14.66-40.13-2.28-49,18C45,4,18.55-6.64,0,0',
      alignOrigin: [0.5, 0.5],
      autoRotate: true,
    },
    ease: Power1.easeInOut,
    repeat: -1,
  })
    .progress(Math.random())
    .play()
);

// PAGE INITIALIZE END

// SETUP

const controller = new ScrollMagic.Controller();

// SCENE 1 START

const tweenScene1 = new TimelineLite();

tweenScene1
  .to('.section-01 .virus-01', 1, {
    scale: 0.75,
    x: '-40%',
    delay: 1,
    ease: Power2.easeInOut,
  })
  .to('.section-01 .virus-01', 1, {
    autoAlpha: 0,
    ease: Power1.easeOut,
  })
  .to(
    '.section-01 .virus-cross-section',
    1,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    '<'
  )
  .to(
    ['.section-01 .corona-h-1', '.section-01 .text-1'],
    0.3,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    '<+0.5'
  )
  .to(
    ['.section-01 .corona-h-2', '.section-01 .text-2'],
    0.3,

    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    '<'
  )
  .to('.section-01 .virus-zoomed', 1, {
    autoAlpha: 1,
    ease: Power1.easeIn,
  })
  .to('.section-01 .virus-zoomed', 1, {
    scale: 1,
    x: '10%',
    y: '-10%',
    delay: 0.5,
    ease: Power2.easeInOut,
  })
  .to('.section-01 .virus-zoomed', 1, {
    autoAlpha: 0,
    ease: Power1.easeOut,
    delay: 0.5,
  })

  .to(['.section-01 .text-2', '.section-01 .background-particles'], 1, {
    autoAlpha: 0,
    ease: Power1.easeOut,
  })
  .to('.section-01 .virus-cross-section', 1, {
    autoAlpha: 0,
    ease: Power1.easeOut,
  })
  .to('.section-01 .virus-01', 1, {
    autoAlpha: 1,
    ease: Power1.easeIn,
  },"<")
  .to(
    ['.section-01 .corona-h-2'],
    0.3,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    '<+0.5'
  )
  .to(
    ['.section-01 .corona-h-3'],
    0.3,

    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    '<'
  )
  .to('.section-01 .virus-01', 1, {
    scale: 0.25,
    ease: Power1.easeIn,
    delay: 1,
  })
  .to(
    ['.section-01 .label-virus'],
    0.3,
    {
      autoAlpha: 0.5,
      ease: Power1.easeIn,
    },
    '<+0.8'
  )
  .fromTo(
    '.section-01 .host-cell',
    1,
    {
      x: 700,
    },
    {
      x: 0,
      autoAlpha: 1,
      ease: Power1.easeIn,
    }
  )
  .to(
    ['.section-01 .label-host-cell'],
    0.3,
    {
      autoAlpha: 0.5,
      ease: Power1.easeIn,
    },
    '<+0.8'
  );

const scene01 = new ScrollMagic.Scene({
  triggerElement: '.scene-02-trigger',
  duration: 3000,
})
  .on('progress', ({ progress }) => {
    if (progress > 0.05) {
      if (spinNormalTween.isActive()) {
        spinNormalTween
          .repeat(0)
          .reverse()
          .duration(SPIN_TIME / 4);
      }

      if (virusPrimaryTranslateTween[0].isActive()) {
        virusPrimaryTranslateTween.forEach((t) => t.pause());
        Array.from(document.querySelectorAll('.section-01 .virus-primary')).map((v) =>
          TweenLite.to(v, TRANSLATION_TIME / 4, {
            y: '5%',
            ease: Power1.easeInOut,
          })
        );
      }
    } else if (progress < 0.1) {
      !spinNormalTween.isActive() && spinNormalTween.repeat(-1).duration(SPIN_TIME).play();
      !virusPrimaryTranslateTween[0].isActive() && virusPrimaryTranslateTween.forEach((t) => t.restart());
    }
  })
  .setPin('.section-01')
  .setTween(tweenScene1)
  .addIndicators()
  .addTo(controller);

// SCENE 1 END

gsap.registerPlugin(MotionPathPlugin);

const animating = true;
const isMobile = window.matchMedia('(max-width: 600px)').matches;

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

TweenLite.set('.self_centered', { xPercent: -50, yPercent: -50 });

TweenLite.set(
  `.section-01 .host-cell-with-receptors,
.section-01 .host-cell-fusing,
.section-01 .host-cell-fused,
.section-01 .host-cell-fused-zoomed`,
  { scale: 0.53 }
);

TweenLite.set('.section-01 .virus-cross-section', { scale: 0.75 });
TweenLite.set('.section-01 .virus-zoomed', { scale: 0.4 });

if (animating) {
  var spinCogCW = new TweenLite.to('.spin-cog-cw', SPIN_TIME, {
    rotation: 360,
    ease: Linear.easeNone,
    transformOrigin: 'center center',
    repeat: -1,
  });
  var spinCogCCW = new TweenLite.to('.spin-cog-ccw', SPIN_TIME, {
    rotation: -360,
    ease: Linear.easeNone,
    transformOrigin: 'center center',
    repeat: -1,
  });
  var spinNormalTween = new TweenLite.to('.spin-normal', SPIN_TIME, {
    rotation: 360,
    ease: Linear.easeNone,
    transformOrigin: 'center center',
    repeat: -1,
  });
  var spinSlowTween = new TweenLite.to('.spin-slow', SPIN_TIME / 0.6, {
    rotation: 360,
    ease: Linear.easeNone,
    transformOrigin: 'center center',
    repeat: -1,
  });

  var spinSlowerTween = new TweenLite.to('.spin-slower', SPIN_TIME / 0.3, {
    rotation: 360,
    ease: Linear.easeNone,
    transformOrigin: 'center center',
    repeat: -1,
  });

  var virusPrimaryTranslateTween = Array.from(document.querySelectorAll('.section-01 .virus-primary')).map((v) =>
    TweenLite.to(v, TRANSLATION_TIME, {
      translateY: -TRAVEL_DISTANCE,
      ease: Power1.easeInOut,
      transformOrigin: 'center center',
      repeat: -1,
      yoyo: true,
    })
  );

  var virusSecondaryTranslateTween = Array.from(document.querySelectorAll('.section-01 .virus-secondary')).map((v) =>
    TweenLite.to(v, TRANSLATION_TIME, {
      translateY: -TRAVEL_DISTANCE * 0.8,
      ease: Power1.easeInOut,
      transformOrigin: 'center center',
      repeat: -1,
      yoyo: true,
    })
      .progress(Math.random())
      .play()
  );

  var virusTertiaryTranslateTween = Array.from(document.querySelectorAll('.section-01 .virus-tertiary')).forEach((v) =>
    TweenLite.to(v, TRANSLATION_TIME, {
      translateY: -TRAVEL_DISTANCE * 0.6,
      ease: Power1.easeInOut,
      transformOrigin: 'center center',
      repeat: -1,
      yoyo: true,
    })
      .progress(Math.random())
      .play()
  );

  var particlesRandomizeTween = Array.from(document.querySelectorAll('.section-01 .particles')).map((p) =>
    TweenLite.to(p, PARTICLE_RANDOM_PATH_TIME, {
      motionPath: {
        path:
          'M-2.5,1.09C-20.55,7.55-23,15.02-23,26c0,38,36,24,44,34s11,27,27,36c23.47,13.2,45.2-6.09,43-27  c-2-19-10.88-36.8,3-45c22-13,26-42,7-54c-23.22-14.66-40.13-2.28-49,18C45,4,18.55-6.64,0,0',
        autoRotate: true,
      },
      ease: Power1.easeInOut,
      transformOrigin: 'center center',
      repeat: -1,
    })
      .progress(Math.random())
      .play()
  );
}

// PAGE INITIALIZE END

// SETUP

const controller = new ScrollMagic.Controller();

const CROSS_FADE_IMAGE = 1;
const CROSS_FADE_TEXT = 0.3;
const TRANSFORM = 1;

// SCENE 1 START

const tweenScene1 = new TimelineLite();

tweenScene1
  .to('.section-01 .virus-01', TRANSFORM, {
    // 1/2 Start
    scale: 0.75,
    left: '41.25%',
    top: isMobile ? '41%' : '50%',
    delay: 0.5,
    ease: Power2.easeInOut,
  })
  .to('.section-01 .virus-01', CROSS_FADE_IMAGE, {
    autoAlpha: 0,
    ease: Power1.easeOut,
  })
  .to(
    '.section-01 .virus-cross-section',
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    '<'
  )
  .to(
    ['.section-01 .corona-h-1', '.section-01 .text-1'],
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    '<+0.5'
  )
  .to(
    ['.section-01 .corona-h-2', '.section-01 .text-2'],
    CROSS_FADE_TEXT,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    '<'
  )
  .to('.section-01 .virus-zoomed', CROSS_FADE_IMAGE, {
    autoAlpha: 1,
    ease: Power1.easeIn,
  })
  .to('.section-01 .virus-zoomed', TRANSFORM, {
    scale: 1,
    left: '56.5%',
    top: isMobile ? '38%' : '45%',
    delay: 0.5,
    ease: Power2.easeInOut,
  }) // 1/2 End
  .to('.section-01 .virus-zoomed', CROSS_FADE_IMAGE, {
    autoAlpha: 0,
    ease: Power1.easeOut,
    delay: 0.5,
  })
  .to(['.section-01 .text-2', '.section-01 .background-particles'], CROSS_FADE_TEXT, {
    autoAlpha: 0,
    ease: Power1.easeOut,
  })
  .to('.section-01 .virus-cross-section', CROSS_FADE_IMAGE, {
    autoAlpha: 0,
    ease: Power1.easeOut,
  })
  .to(
    '.section-01 .virus-01',
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    '<'
  )
  .to(
    '.section-01 .corona-h-2',
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    '<+0.5'
  )
  .to(
    '.section-01 .corona-h-3',
    CROSS_FADE_TEXT,

    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    '<'
  )
  .to('.section-01 .virus-01', TRANSFORM, {
    // 1/3 Start
    scale: 0.25,
    left: isMobile ? '25%' : '38%',
    top: '45%',
    ease: Power2.easeInOut,
    delay: 0.5,
  })
  .to(
    ['.section-01 .label-virus'],
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0.5,
      ease: Power1.easeIn,
    },
    '<+0.8'
  )
  .to('.section-01 .host-cell', TRANSFORM, {
    left: isMobile ? '88%' : '75%',
    autoAlpha: 1,
    ease: Power2.easeInOut,
  })
  .to(
    ['.section-01 .label-host-cell'],
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0.5,
      ease: Power1.easeIn,
    },
    '<+0.8'
  ) // 1/3 End
  .to('.section-01 .virus-01', TRANSFORM, {
    // 1/4 Start
    scale: 0.075,
    top: '40%',
    autoAlpha: 0,
    ease: Power2.easeInOut,
  })
  .to(
    '.section-01 .virus-tiny',
    TRANSFORM,
    {
      autoAlpha: 1,
      top: '40%',
      ease: Power2.easeInOut,
    },
    '<'
  )
  .to(
    '.section-01 .label-virus',
    TRANSFORM,
    {
      top: isMobile ? 'calc(43% - 40px)' : 'calc(44% - 75px)',
      ease: Power2.easeInOut,
    },
    '<'
  )
  .to(
    '.section-01 .host-cell',
    TRANSFORM,
    {
      scale: 0.53,
      left: isMobile ? '76%' : '61%',
      top: '40%',
      ease: Power2.easeInOut,
    },
    '<'
  )
  .to(
    '.section-01 .label-host-cell',
    TRANSFORM,
    {
      left: isMobile ? 'calc(76% - 10px )' : '61%',
      top: isMobile ? '+=20px' : '+=0%',
      ease: Power2.easeInOut,
    },
    '<'
  )
  .to('.section-01 .text-2', CROSS_FADE_TEXT, {
    autoAlpha: 0,
    ease: Power1.easeOut,
  })
  .to(
    '.section-01 .text-3',
    CROSS_FADE_TEXT,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    '<'
  )
  .to(['.section-01 .host-cell-with-receptors', '.section-01 .host-cell-with-receptor-label-arrow'], CROSS_FADE_IMAGE, {
    autoAlpha: 1,
    ease: Power1.easeIn,
    delay: 0.5,
  })
  .to(
    '.section-01 .label-host-cell-with-receptor',
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0.5,
      ease: Power1.easeIn,
    },
    '<'
  )
  .to(
    '.section-01 .host-cell',
    0.1,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    '-=0.1'
  ) // 1/4 End
  .to(
    '.section-01 .virus-tiny', // 1/5 Start
    TRANSFORM,
    {
      autoAlpha: 0.8,
      left: isMobile ? 'calc(76% - 104px)' : 'calc(61% - 210px)',
      top: isMobile ? '40.1%' : '40.4%',
      ease: Power2.easeInOut,
      delay: 1,
    },
    '<'
  )
  .to(
    '.section-01 .label-virus',
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    '<'
  )
  .to('.section-01 .virus-tiny', TRANSFORM, {
    left: isMobile ? '+=14px' : '+=30px',
    ease: Power2.easeInOut,
    delay: 1,
  })
  .to(
    '.section-01 .host-cell-fusing',
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    '<'
  )
  .to(
    ['.section-01 .label-host-cell-with-receptor', '.section-01 .host-cell-with-receptor-label-arrow', '.section-01 .label-host-cell', '.section-01 .text-3'],
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    '<'
  )
  .to(
    '.section-01 .text-4',
    CROSS_FADE_TEXT,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    '<'
  )
  .to(
    '.section-01 .label-virus-envelope-fuses',
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0.5,
      ease: Power1.easeIn,
    },
    '<'
  )
  .to(
    '.section-01 .host-cell-with-receptors',
    0.1,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    '-=0.1'
  )
  .to('.section-01 .virus-tiny', TRANSFORM, {
    left: isMobile ? '+=5px' : '+=12px',
    ease: Power2.easeInOut,
    delay: 0.5,
  })
  .to(
    '.section-01 .host-cell-fused',
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    '<'
  )
  .to(
    ['.section-01 .host-cell-fusing', '.section-01 .virus-tiny'],
    0.1,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    '-=0.1'
  ) // 1/5 End
  .to(
    '.section-01 .host-cell-fused', // 1/6 Start
    TRANSFORM,
    {
      scale: 1,
      left: isMobile ? '65%' : '50%',
      top: isMobile ? '40%' : '50%',
      autoAlpha: 0,
      ease: Power2.easeInOut,
      delay: 0.5,
    }
  )
  .to(
    ['.section-01 .label-virus-envelope-fuses', '.section-01 .text-4'],
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    '<'
  )
  .to(
    '.section-01 .host-cell-fused-zoomed',
    TRANSFORM,
    {
      scale: 1,
      left: isMobile ? '63%' : '50%',
      top: isMobile ? '40%' : '50%',
      autoAlpha: 1,
      ease: Power2.easeInOut,
    },
    '<'
  )
  .to('.section-01 .host-cell-fused-zoomed', CROSS_FADE_IMAGE, {
    autoAlpha: 0.2,
    ease: Power1.easeOut,
  })
  .to(
    '.section-01 .rna',
    CROSS_FADE_IMAGE,
    {
      clip: isMobile ? 'rect(0px 100px 30px 0px)' : 'rect(0px 200px 30px 0px)',
      ease: Power1.easeInOut,
    },
    '<'
  )
  .to(
    [
      '.section-01 .host-cell-machinery-base',
      '.section-01 .host-cell-machinery-lever',
      '.section-01 .host-cell-machinery-cog-1',
      '.section-01 .host-cell-machinery-cog-2',
      '.section-01 .host-cell-machinery-cog-3',
      '.section-01 .host-cell-machinery-cog-4',
      '.section-01 .host-cell-machinery-cog-5',
      '.section-01 .host-cell-machinery-cog-6',
      '.section-01 .host-cell-machinery-cog-7',
      '.section-01 .host-cell-machinery-cog-8',
      '.section-01 .host-cell-machinery-cog-9',
    ],
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    '<'
  )
  .to('.section-01 .virus-baby-1', TRANSFORM, {
    top: 'calc(57% + 200px)',
    left: 'calc(52% + 10px)',
    ease: Power2.easeInOut,
    autoAlpha: 1,
  })
  .to(
    '.section-01 .virus-baby-2',
    TRANSFORM,
    {
      top: 'calc(57% + 165px)',
      left: 'calc(52% + 80px)',
      autoAlpha: 1,
      ease: Power2.easeInOut,
    },
    '<+0.1'
  )
  .to(
    '.section-01 .virus-baby-3',
    TRANSFORM,
    {
      top: 'calc(57% + 145px)',
      left: 'calc(52% + 150px)',
      autoAlpha: 1,
      ease: Power2.easeInOut,
    },
    '<+0.1'
  )
  .to(
    '.section-01 .virus-baby-4',
    TRANSFORM,
    {
      top: 'calc(57% + 140px)',
      left: 'calc(52% + -45px)',
      autoAlpha: 1,
      ease: Power2.easeInOut,
    },
    '<+0.1'
  )
  .to(
    '.section-01 .virus-baby-5',
    TRANSFORM,
    {
      top: 'calc(57% + 120px)',
      left: 'calc(52% + 30px)',
      autoAlpha: 1,
      ease: Power2.easeInOut,
    },
    '<+0.1'
  )
  .to(
    '.section-01 .virus-baby-6',
    TRANSFORM,
    {
      top: 'calc(57% + 90px)',
      left: 'calc(52% + 140px)',
      autoAlpha: 1,
      ease: Power2.easeInOut,
    },
    '<+0.1'
  )
  .to(
    '.section-01 .virus-baby-7',
    TRANSFORM,
    {
      top: 'calc(57% + 80px)',
      left: 'calc(52% + 85px)',
      autoAlpha: 1,
      ease: Power2.easeInOut,
    },
    '<+0.1'
  )
  .to(
    '.section-01 .virus-baby-8',
    TRANSFORM,
    {
      top: 'calc(57% + 95px)',
      left: 'calc(52% + -15px)',
      autoAlpha: 1,
      ease: Power2.easeInOut,
    },
    '<+0.1'
  )
  .to(
    '.section-01 .virus-baby-9',
    TRANSFORM,
    {
      top: 'calc(57% + 55px)',
      left: 'calc(52% + -30px)',
      autoAlpha: 1,
      ease: Power2.easeInOut,
    },
    '<+0.1'
  )
  .to(
    '.section-01 .virus-baby-10',
    TRANSFORM,
    {
      top: 'calc(57% + 40px)',
      left: 'calc(52% + 30px)',
      autoAlpha: 1,
      ease: Power2.easeInOut,
    },
    '<+0.1'
  );

const scene01 = new ScrollMagic.Scene({
  triggerElement: '.scene-02-trigger',
  duration: 3000,
})
  .on('progress', ({ progress }) => {
    if (animating) {
      if (progress > 0.01) {
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
              y: 0,
              ease: Power1.easeInOut,
            })
          );
        }
      } else if (progress < 0.1) {
        !spinNormalTween.isActive() && spinNormalTween.repeat(-1).duration(SPIN_TIME).play();
        !virusPrimaryTranslateTween[0].isActive() && virusPrimaryTranslateTween.forEach((t) => t.restart());
      }
    }
  })
  .setPin('.section-01')
  .setTween(tweenScene1)
  .addIndicators()
  .addTo(controller);

// SCENE 1 END

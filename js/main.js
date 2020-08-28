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

const SCENE_1_LEN = 4000;
const SCENE_2_LEN = 2000;

TweenLite.set('.section-02', { top: SCENE_1_LEN });
TweenLite.set('.self_centered', { xPercent: -50, yPercent: -50 });

TweenLite.set(
  `.section-01 .host-cell-with-receptors,
  .section-01 .host-cell-with-receptors-copy,
.section-01 .host-cell-fusing,
.section-01 .host-cell-fused,
.section-01 .host-cell-fused-fully,
.section-01 .host-cell-fused-zoomed`,
  { scale: 0.53 }
);

TweenLite.set('.section-01 .virus-cross-section', { scale: 0.75 });
TweenLite.set('.section-01 .virus-zoomed', { scale: 0.4 });
!isMobile &&
  TweenLite.set(
    `.section-02 .skin,
.section-02 .phagocytosis,
.section-02 .mucous-membrane, .section-02 .b-cells,
.section-02 .t-cells`,
    { scale: 0.667 }
  );

// PAGE INITIALIZE START

// Virus Spin

const SPIN_TIME = 20;
const TRANSLATION_TIME = 2;
const TRAVEL_DISTANCE = 50;
const PARTICLE_RANDOM_PATH_TIME = 5;

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
    delay: 1,
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
    delay: 1,
    ease: Power2.easeInOut,
  }) // 1/2 End
  .to('.section-01 .virus-zoomed', CROSS_FADE_IMAGE, {
    autoAlpha: 0,
    ease: Power1.easeOut,
    delay: 1,
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
    delay: 1,
  })
  .to(
    '.section-01 .label-virus',
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0.5,
      ease: Power1.easeIn,
    },
    '<+0.8'
  )
  .to('.section-01 .host-cell', TRANSFORM, {
    left: isMobile ? 'calc(25% + 300px)' : 'calc(38% + 600px)',
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
    scale: 0.15,
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
      top: isMobile ? 'calc(40% - 40px)' : 'calc(40% - 50px)',
      ease: Power2.easeInOut,
    },
    '<'
  )
  .to(
    '.section-01 .host-cell',
    TRANSFORM,
    {
      scale: 0.53,
      left: isMobile ? 'calc(25% + 250px)' : 'calc(38% + 375px)',
      top: '40%',
      ease: Power2.easeInOut,
    },
    '<'
  )
  .to(
    '.section-01 .label-host-cell',
    TRANSFORM,
    {
      left: isMobile ? 'calc(25% + 250px)' : 'calc(38% + 375px)',
      top: isMobile ? '+=10px' : '+=0%',
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
    delay: 1,
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
      left: isMobile ? 'calc(25% + 250px - 104px)' : 'calc(38% + 375px - 210px)',
      scale: 0.5,
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
    left: isMobile ? '+=5px' : '+=11px',
    ease: Power2.easeInOut,
    delay: 1,
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
    ['.section-01 .host-cell-fusing'],
    0.1,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    '-=0.1'
  )
  .to('.section-01 .virus-tiny', TRANSFORM, {
    left: isMobile ? '+=15px' : '+=28px',
    ease: Power2.easeInOut,
    delay: 1,
  })
  .to(
    '.section-01 .host-cell-fused-fully',
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    '<'
  )
  .to(
    ['.section-01 .host-cell-fused', '.section-01 .virus-tiny'],
    0.1,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    '-=0.1'
  ) // 1/5 End
  .to(
    '.section-01 .host-cell-fused-fully', // 1/6 Start
    TRANSFORM,
    {
      scale: 1,
      left: isMobile ? '65%' : '50%',
      top: isMobile ? '30%' : '40%',
      autoAlpha: 0,
      ease: Power2.easeInOut,
      delay: 1,
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
      top: isMobile ? '30%' : '40%',
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
      clip: isMobile ? 'rect(0px 60px 30px 0px)' : 'rect(0px 120px 30px 0px)',
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
      '.section-01 .text-5',
    ],
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    '<'
  )
  .to('.section-01 .virus-baby-1', TRANSFORM, {
    top: isMobile ? 'calc(34% + 85px)' : 'calc(47% + 200px)',
    left: isMobile ? 'calc(68% + -10px)' : 'calc(52% + 10px)',
    ease: Power2.easeInOut,
    autoAlpha: 1,
  })
  .to(
    '.section-01 .virus-baby-2',
    TRANSFORM,
    {
      top: isMobile ? 'calc(34% + 80px)' : 'calc(47% + 165px)',
      left: isMobile ? 'calc(68% + 20px)' : 'calc(52% + 80px)',
      autoAlpha: 1,
      ease: Power2.easeInOut,
    },
    '<+0.1'
  )
  .to(
    '.section-01 .virus-baby-3',
    TRANSFORM,
    {
      top: isMobile ? 'calc(34% + 75px)' : 'calc(47% + 145px)',
      left: isMobile ? 'calc(68% + 50px)' : 'calc(52% + 150px)',
      autoAlpha: 1,
      ease: Power2.easeInOut,
    },
    '<+0.1'
  )
  .to(
    '.section-01 .virus-baby-4',
    TRANSFORM,
    {
      top: isMobile ? 'calc(34% + 70px)' : 'calc(47% + 140px)',
      left: isMobile ? 'calc(68% + -30px)' : 'calc(52% + -45px)',
      autoAlpha: 1,
      ease: Power2.easeInOut,
    },
    '<+0.1'
  )
  .to(
    '.section-01 .virus-baby-5',
    TRANSFORM,
    {
      top: isMobile ? 'calc(34% + 60px)' : 'calc(47% + 120px)',
      left: isMobile ? 'calc(68% + 0px)' : 'calc(52% + 30px)',
      autoAlpha: 1,
      ease: Power2.easeInOut,
    },
    '<+0.1'
  )
  .to(
    '.section-01 .virus-baby-6',
    TRANSFORM,
    {
      top: isMobile ? 'calc(34% + 50px)' : 'calc(47% + 90px)',
      left: isMobile ? 'calc(68% + 45px)' : 'calc(52% + 140px)',
      autoAlpha: 1,
      ease: Power2.easeInOut,
    },
    '<+0.1'
  )
  .to(
    '.section-01 .virus-baby-7',
    TRANSFORM,
    {
      top: isMobile ? 'calc(34% + 40px)' : 'calc(47% + 80px)',
      left: isMobile ? 'calc(68% + -15px)' : 'calc(52% + 85px)',
      autoAlpha: 1,
      ease: Power2.easeInOut,
    },
    '<+0.1'
  )
  .to(
    '.section-01 .virus-baby-8',
    TRANSFORM,
    {
      top: isMobile ? 'calc(34% + 45px)' : 'calc(47% + 95px)',
      left: isMobile ? 'calc(68% + 25px)' : 'calc(52% + -15px)',
      autoAlpha: 1,
      ease: Power2.easeInOut,
    },
    '<+0.1'
  )
  .to(
    '.section-01 .virus-baby-9',
    TRANSFORM,
    {
      top: isMobile ? 'calc(34% + 30px)' : 'calc(47% + 55px)',
      left: isMobile ? 'calc(68% + 10px)' : 'calc(52% + -30px)',
      autoAlpha: 1,
      ease: Power2.easeInOut,
    },
    '<+0.1'
  )
  .to(
    '.section-01 .virus-baby-10',
    TRANSFORM,
    {
      top: isMobile ? 'calc(34% + 10px)' : 'calc(47% + 40px)',
      left: isMobile ? 'calc(68% + 0px)' : 'calc(52% + 30px)',
      autoAlpha: 1,
      ease: Power2.easeInOut,
    },
    '<+0.1'
  )
  .to('.section-01 .host-cell-fused-fully', TRANSFORM, {
    scale: 0.53,
    left: isMobile ? '30%' : '38%',
    autoAlpha: 1,
    delay: 1,
    ease: Power2.easeInOut,
  })
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
      '.section-01 .host-cell-fused-zoomed',
      '.section-01 .rna',
      '.section-01 .baby-virus',
    ],
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 0,
      scale: 0.53,
      left: isMobile ? '30%' : '38%',
      ease: Power1.easeOut,
    },
    '<'
  )
  .to(
    '.section-01 .text-5',
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    '<'
  )
  .to('.section-01 .host-cell-with-receptors-copy', TRANSFORM, {
    left: isMobile ? 'calc(30% + 275px)' : 'calc(38% + 530px)',
    autoAlpha: 1,
    ease: Power2.easeInOut,
  })
  .to(
    '.section-01 .virus-tiny-1',
    TRANSFORM,
    {
      top: isMobile ? 'calc(30% + 25px)' : 'calc(40% + 40px)',
      left: isMobile ? 'calc(30% + 120px)' : 'calc(38% + 240px)',
      autoAlpha: 1,
      ease: Power2.easeInOut,
    },
    '<'
  )
  .to(
    '.section-01 .virus-tiny-2',
    TRANSFORM,
    {
      top: isMobile ? 'calc(30% + 60px)' : 'calc(40% + 100px)',
      left: isMobile ? 'calc(30% + 110px)' : 'calc(38% + 225px)',
      autoAlpha: 1,
      ease: Power2.easeInOut,
    },
    '<+0.1'
  )
  .to(
    '.section-01 .virus-tiny-3',
    TRANSFORM,
    {
      top: isMobile ? 'calc(30% + 50px)' : 'calc(40% + 90px)',
      left: isMobile ? 'calc(30% + 85px)' : 'calc(38% + 175px)',
      autoAlpha: 1,
      ease: Power2.easeInOut,
    },
    '<+0.1'
  )
  .to(
    '.section-01 .virus-tiny-4',
    TRANSFORM,
    {
      top: isMobile ? 'calc(30% + 80px)' : 'calc(40% + 135px)',
      left: isMobile ? 'calc(30% + 80px)' : 'calc(38% + 180px)',
      autoAlpha: 1,
      ease: Power2.easeInOut,
    },
    '<+0.1'
  )
  .to(
    '.section-01 .virus-tiny-5',
    TRANSFORM,
    {
      top: isMobile ? 'calc(30% + 90px)' : 'calc(40% + 150px)',
      left: isMobile ? 'calc(30% + 50px)' : 'calc(38% + 120px)',
      autoAlpha: 1,
      ease: Power2.easeInOut,
    },
    '<+0.1'
  )
  .to(
    '.section-01 .text-6',
    CROSS_FADE_TEXT,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    '<+0.1'
  )
  .to(
    '.section-01 .arrow-red',
    TRANSFORM,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    '<+0.1'
  )
  .to('.section-01', CROSS_FADE_IMAGE, {
    autoAlpha: 0,
    ease: Power2.easeIn,
    delay: 5,
  })
  .to('.section-02', CROSS_FADE_IMAGE, {
    autoAlpha: 1,
    ease: Power1.easeIn,
  });

const scene01 = new ScrollMagic.Scene({
  triggerElement: '.section-01',
  duration: SCENE_1_LEN,
  triggerHook: 0,
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

const tweenScene2 = new TimelineLite();

tweenScene2
  .to(['.section-02 .immune-h-1', '.section-02 .text-1'], CROSS_FADE_TEXT, {
    autoAlpha: 1,
    ease: Power1.easeIn,
    stagger: 0.1,
  })
  .to(['.section-02 .text-innate', '.section-02 .text-adaptive', '.section-02 .text-fast-resp', '.section-02 .text-slow-resp'], CROSS_FADE_TEXT, {
    autoAlpha: 1,
    ease: Power1.easeIn,
  })
  .to(['.section-02 .skin', '.section-02 .mucous-membrane', '.section-02 .phagocytosis', '.section-02 .b-cells', '.section-02 .t-cells'], CROSS_FADE_IMAGE, {
    autoAlpha: 1,
    ease: Power1.easeIn,
    stagger: 0.2,
  })
  .to(['.section-02 .adaptive', '.section-02 .text-1'], CROSS_FADE_IMAGE, {
    autoAlpha: 0,
    ease: Power1.easeOut,
    delay: 1,
  })
  .to(['.section-02 .text-innate', '.section-02 .text-fast-resp'], TRANSFORM, {
    top: '-=5%',
    ease: Power2.easeInOut,
  })
  .to(
    ['.section-02 .text-adaptive', '.section-02 .text-slow-resp'],
    TRANSFORM,
    {
      top: isMobile ? '-=29%' : '-=37%',
      ease: Power2.easeInOut,
    },
    '<'
  )
  .to(
    ['.section-02 .skin', '.section-02 .mucous-membrane', '.section-02 .phagocytosis', '.section-02 .b-cells', '.section-02 .t-cells'],
    TRANSFORM,
    {
      top: '50%',
      scale: 1,
      ease: Power2.easeInOut,
    },
    '<'
  )
  .to(
    '.section-02 .skin',
    TRANSFORM,
    {
      left: isMobile ? '+=0' : 'calc(50% - 300px)',
      ease: Power2.easeInOut,
    },
    '<'
  )
  .to(
    '.section-02 .phagocytosis',
    TRANSFORM,
    {
      left: isMobile ? '+=0' : 'calc(50% + 300px)',
      ease: Power2.easeInOut,
    },
    '<'
  )
  .to(
    '.section-02 .b-cells',
    TRANSFORM,
    {
      scale: isMobile ? 1.5 : 1,
      left: isMobile ? 'calc(50% - 75px)' : 'calc(50% - 150px)',
      ease: Power2.easeInOut,
    },
    '<'
  )
  .to(
    '.section-02 .t-cells',
    TRANSFORM,
    {
      scale: isMobile ? 1.5 : 1,
      left: isMobile ? 'calc(50% + 75px)' : 'calc(50% + 150px)',
      ease: Power2.easeInOut,
    },
    '<'
  )
  .to(
    '.section-02 .text-2',
    CROSS_FADE_TEXT,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    '<+0.5'
  )
  .to('.section-02 .skin', TRANSFORM, {
    left: isMobile ? '+=25' : '+=150',
    scale: isMobile ? 1.5 : 1,
    ease: Power2.easeInOut,
    delay: 1,
  })
  .to(
    '.section-02 .mucous-membrane',
    TRANSFORM,
    {
      left: isMobile ? '+=71.25' : '+=150',
      scale: isMobile ? 1.5 : 1,
      ease: Power2.easeInOut,
    },
    '<'
  )
  .to(
    '.section-02 .phagocytosis',
    TRANSFORM,
    {
      left: isMobile ? '+=125' : '+=150',
      scale: isMobile ? 1.5 : 1,
      autoAlpha: 0.2,
      ease: Power2.easeInOut,
    },
    '<'
  )
  .to(
    '.section-02 .text-2',
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    '<'
  )
  .to(
    '.section-02 .text-3',
    CROSS_FADE_TEXT,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    '<+0.5'
  )
  .to(['.section-02 .skin', '.section-02 .phagocytosis', '.section-02 .mucous-membrane'], TRANSFORM, {
    left: isMobile ? '-=220' : '-=450',
    ease: Power2.easeInOut,
    delay: 1,
  })
  .to(
    ['.section-02 .skin', '.section-02 .mucous-membrane'],
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 0.2,
      ease: Power1.easeOut,
    },
    '<'
  )
  .to(
    '.section-02 .phagocytosis',
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    '<'
  )
  .to(
    '.section-02 .text-3',
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    '<'
  )
  .to(
    '.section-02 .text-4',
    CROSS_FADE_TEXT,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    '<+0.5'
  )
  .to('.section-02 .innate', CROSS_FADE_IMAGE, {
    autoAlpha: 0,
    ease: Power1.easeOut,
    delay: 1,
  })
  .to(
    '.section-02 .adaptive',
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    '<'
  )
  .to(
    '.section-02 .text-4',
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    '<'
  )
  .to(
    '.section-02 .text-5',
    CROSS_FADE_TEXT,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    '<+0.5'
  )
  .to('.section-02 .text-5', CROSS_FADE_TEXT, {
    autoAlpha: 0,
    ease: Power1.easeOut,
    delay: 1,
  })
  .to(
    '.section-02 .text-6',
    CROSS_FADE_TEXT,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    '<+0.5'
  );

const scene02 = new ScrollMagic.Scene({
  duration: SCENE_2_LEN,
  triggerHook: 1,
  offset: SCENE_1_LEN,
})
  .setPin('.section-02')
  .setTween(tweenScene2)
  .addIndicators()
  .addTo(controller);

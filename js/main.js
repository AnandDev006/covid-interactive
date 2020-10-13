gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(ScrollToPlugin);

const isMobile = window.matchMedia("(max-width: 600px)").matches;

const lenthScale = 1.5;

const SCENE_1_LEN = lenthScale * 2000; // 23
const SCENE_2_LEN = lenthScale * 800;
const SCENE_3_LEN = lenthScale * 1500;
const SCENE_4_LEN = lenthScale * 700;
const SCENE_5_LEN = lenthScale * 600;
const SCENE_6_LEN = lenthScale * 500;
const SCENE_7_LEN = lenthScale * 300;

const totalLen =
  SCENE_1_LEN +
  SCENE_2_LEN +
  SCENE_3_LEN +
  SCENE_4_LEN +
  SCENE_5_LEN +
  SCENE_6_LEN +
  SCENE_7_LEN;

let delta = 0;

TweenLite.set(".section-02", { top: SCENE_1_LEN });
TweenLite.set(".section-03", { top: SCENE_1_LEN + SCENE_2_LEN });
TweenLite.set(".section-04", { top: SCENE_1_LEN + SCENE_2_LEN + SCENE_3_LEN });
TweenLite.set(".section-05", {
  top: SCENE_1_LEN + SCENE_2_LEN + SCENE_3_LEN + SCENE_4_LEN,
});
TweenLite.set(".section-06", {
  top: SCENE_1_LEN + SCENE_2_LEN + SCENE_3_LEN + SCENE_4_LEN + SCENE_5_LEN,
});
TweenLite.set(".section-07", {
  top:
    SCENE_1_LEN +
    SCENE_2_LEN +
    SCENE_3_LEN +
    SCENE_4_LEN +
    SCENE_5_LEN +
    SCENE_6_LEN,
});
TweenLite.set(".section-08", {
  top:
    SCENE_1_LEN +
    SCENE_2_LEN +
    SCENE_3_LEN +
    SCENE_4_LEN +
    SCENE_5_LEN +
    SCENE_6_LEN +
    SCENE_7_LEN,
});
TweenLite.set(".self_centered", { xPercent: -50, yPercent: -50 });
TweenLite.set(".x_self_centered", { xPercent: -50 });
// TweenLite.set('.y_self_centered', { yPercent: -50 });

TweenLite.set(
  [
    ".section-01 .host-cell-with-receptors",
    ".section-01 .host-cell-with-receptors-copy",
    ".section-01 .host-cell-fusing",
    ".section-01 .host-cell-fused",
    ".section-01 .host-cell-fused-fully",
    ".section-01 .host-cell-fused-zoomed",
  ],
  { scale: 0.53 }
);

TweenLite.set(".section-01 .virus-cross-section", { scale: 0.75 });
TweenLite.set(".section-01 .virus-zoomed", { scale: 0.4 });
!isMobile &&
  TweenLite.set(
    [
      ".section-02 .skin",
      ".section-02 .phagocytosis",
      ".section-02 .mucous-membrane",
      ".section-02 .b-cells",
      ".section-02 .t-cells",
    ],
    { scale: 0.667 }
  );

TweenLite.set([".section-04 .lottie-lungs"], { scale: 0.3 });
TweenLite.set([".section-05 .virus-primary"], { scale: 0.5 });

const lottieLungs = document.getElementById("lottieLungs");
const lottieLungsAnimation = lottie.loadAnimation({
  container: lottieLungs,
  renderer: "svg",
  loop: false,
  autoplay: false,
  animationData: lungsJSON,
});

const lottieHandWash = document.getElementById("lottieHandWash");

const lottieHandWashAnimation = lottie.loadAnimation({
  container: lottieHandWash,
  renderer: "svg",
  loop: false,
  autoplay: false,
  animationData: handwashJSON,
});

const lottieVirus = document.getElementById("lottieVirus");
const lottieVirusAnimation = lottie.loadAnimation({
  container: lottieVirus,
  renderer: "svg",
  loop: false,
  autoplay: false,
  animationData: virusDisintegrateJSON,
});

// PAGE INITIALIZE START

// Virus Spin

const SPIN_TIME = 20;
const TRANSLATION_TIME = 2;
const TRAVEL_DISTANCE = 50;
const PARTICLE_RANDOM_PATH_TIME = 5;

const spinCogCW = new TweenLite.to(".spin-cog-cw", SPIN_TIME, {
  rotation: 360,
  ease: Linear.easeNone,
  transformOrigin: "center center",
  repeat: -1,
  paused: true,
});
const spinCogCCW = new TweenLite.to(".spin-cog-ccw", SPIN_TIME, {
  rotation: -360,
  ease: Linear.easeNone,
  transformOrigin: "center center",
  repeat: -1,
  paused: true,
});
const spinNormalTween = new TweenLite.to(".spin-normal", SPIN_TIME, {
  rotation: 360,
  ease: Linear.easeNone,
  transformOrigin: "center center",
  repeat: -1,
});
const spinSlowTween = new TweenLite.to(".spin-slow", SPIN_TIME / 0.6, {
  rotation: 360,
  ease: Linear.easeNone,
  transformOrigin: "center center",
  repeat: -1,
});

const spinSlowerTween = new TweenLite.to(".spin-slower", SPIN_TIME / 0.3, {
  rotation: 360,
  ease: Linear.easeNone,
  transformOrigin: "center center",
  repeat: -1,
});

const virusPrimaryTranslateTween = Array.from(
  document.querySelectorAll(".section-01 .virus-primary")
).map((v) =>
  TweenLite.to(v, TRANSLATION_TIME, {
    translateY: -TRAVEL_DISTANCE,
    ease: Power1.easeInOut,
    transformOrigin: "center center",
    repeat: -1,
    yoyo: true,
  })
);

const virusSecondaryTranslateTween = Array.from(
  document.querySelectorAll(".section-01 .virus-secondary")
).map((v) =>
  TweenLite.to(v, TRANSLATION_TIME, {
    translateY: -TRAVEL_DISTANCE * 0.8,
    ease: Power1.easeInOut,
    transformOrigin: "center center",
    repeat: -1,
    yoyo: true,
  })
    .progress(Math.random())
    .play()
);

const virusTertiaryTranslateTween = Array.from(
  document.querySelectorAll(".section-01 .virus-tertiary")
).forEach((v) =>
  TweenLite.to(v, TRANSLATION_TIME, {
    translateY: -TRAVEL_DISTANCE * 0.6,
    ease: Power1.easeInOut,
    transformOrigin: "center center",
    repeat: -1,
    yoyo: true,
  })
    .progress(Math.random())
    .play()
);

const particlesRandomizeTween = Array.from(
  document.querySelectorAll(".section-01 .particles")
).map((p) =>
  TweenLite.to(p, PARTICLE_RANDOM_PATH_TIME, {
    motionPath: {
      path:
        "M-2.5,1.09C-20.55,7.55-23,15.02-23,26c0,38,36,24,44,34s11,27,27,36c23.47,13.2,45.2-6.09,43-27  c-2-19-10.88-36.8,3-45c22-13,26-42,7-54c-23.22-14.66-40.13-2.28-49,18C45,4,18.55-6.64,0,0",
      autoRotate: true,
    },
    ease: Power1.easeInOut,
    transformOrigin: "center center",
    repeat: -1,
  })
    .progress(Math.random())
    .play()
);

const scrolldownIndicator = new TimelineLite()
  .from(".scroll-down-line", {
    delay: 2,
    duration: 4,
    ease: Power2.easeInOut,
    opacity: 0,
    height: 0,
  })
  .from(
    ".scroll-down-text",
    { duration: 4, ease: Power2.easeInOut, opacity: 0 },
    "<"
  )
  .from(
    ".scroll-down-arrow",
    {
      duration: 4,
      ease: Power2.easeInOut,
      opacity: 0,
      top: isMobile ? "10%" : "15%",
    },
    "<"
  );

// PAGE INITIALIZE END

// SETUP

const controller = new ScrollMagic.Controller();

const CROSS_FADE_IMAGE = 1;
const CROSS_FADE_TEXT = 0.3;
const TRANSFORM = 1;

// SCENE 1 START

const tweenScene1 = new TimelineLite();

tweenScene1
  .to({}, 1, {
    onComplete: () => {
      const RESET_TIME = 1;

      if (spinNormalTween.isActive()) {
        spinNormalTween.pause();
        TweenLite.to(".spin-normal", RESET_TIME, {
          rotation: 0,
          ease: Power2.easeInOut,
        });
      }
      if (virusPrimaryTranslateTween[0].isActive()) {
        virusPrimaryTranslateTween.forEach((t) => t.pause());
        document.querySelectorAll(".section-01 .virus-primary").forEach((v) =>
          TweenLite.to(v, RESET_TIME, {
            y: 0,
            ease: Power2.easeInOut,
          })
        );
      }
    },
  })
  .to(".section-01 .virus-01", TRANSFORM, {
    onStart: transition,
    // 1/2 Start
    scale: 0.75,
    left: "41.25%",
    top: isMobile ? "41%" : "50%",
    ease: Power2.easeInOut,
    onReverseComplete: () => {
      !spinNormalTween.isActive() && spinNormalTween.restart();
      !virusPrimaryTranslateTween[0].isActive() &&
        virusPrimaryTranslateTween.forEach((t) => t.restart());
    },
  })
  .to({}, 1, {
    onReverseCompleteParams: [1, TRANSFORM],
    onReverseComplete: transitionReverse,
  })
  .to([".section-01 .virus-01", ".scroll-down"], CROSS_FADE_IMAGE, {
    onStart: transition,
    autoAlpha: 0,
    ease: Power1.easeOut,
    onComplete: () => scrolldownIndicator.kill(),
  })
  .to(
    ".section-01 .virus-cross-section",
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  )
  .to(
    [".section-01 .corona-h-1", ".section-01 .text-1"],
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    "<+0.5"
  )
  .to(
    [".section-01 .corona-h-2", ".section-01 .text-2"],
    CROSS_FADE_TEXT,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  )
  .to({}, 1, {
    onReverseCompleteParams: [1, CROSS_FADE_IMAGE],
    onReverseComplete: transitionReverse,
  })
  .to(".section-01 .virus-zoomed", CROSS_FADE_IMAGE, {
    onStart: transition,
    autoAlpha: 1,
    ease: Power1.easeIn,
  })
  .to({}, 1, {
    onReverseCompleteParams: [1, CROSS_FADE_IMAGE],
    onReverseComplete: transitionReverse,
  })
  .to(".section-01 .virus-zoomed", TRANSFORM, {
    onStart: transition,
    scale: 1,
    left: "56.5%",
    top: isMobile ? "38%" : "45%",
    ease: Power2.easeInOut,
  }) // 1/2 End
  .to({}, 2, {
    onReverseCompleteParams: [1, TRANSFORM],
    onReverseComplete: transitionReverse,
  })
  .to(
    [
      ".section-01 .text-2",
      ".section-01 .background-particles",
      ".section-01 .virus-zoomed",
    ],
    CROSS_FADE_IMAGE,
    {
      onStart: transition,
      autoAlpha: 0,
      ease: Power1.easeOut,
    }
  )
  .to({}, 1, {
    onReverseCompleteParams: [1, CROSS_FADE_IMAGE],
    onReverseComplete: transitionReverse,
  })
  .to(".section-01 .virus-cross-section", CROSS_FADE_IMAGE, {
    onStart: transition,
    autoAlpha: 0,
    ease: Power1.easeOut,
  })
  .to({}, 1, {
    onReverseCompleteParams: [1, CROSS_FADE_IMAGE],
    onReverseComplete: transitionReverse,
  })
  .to(
    ".section-01 .virus-01",
    CROSS_FADE_IMAGE,
    {
      onStart: transition,
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  )
  .to(
    ".section-01 .corona-h-2",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    "<+0.5"
  )
  .to(
    ".section-01 .corona-h-3",
    CROSS_FADE_TEXT,

    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  )
  .to({}, 1, {
    onReverseCompleteParams: [1, CROSS_FADE_IMAGE],
    onReverseComplete: transitionReverse,
  })
  .to(".section-01 .virus-01", TRANSFORM, {
    // 1/3 Start
    onStartParams: [1, TRANSFORM + 0.1],
    onStart: transition,
    scale: 0.25,
    left: isMobile ? "25%" : "38%",
    top: isMobile ? "50%" : "45%",
    ease: Power2.easeInOut,
  })
  .to(
    ".section-01 .label-virus",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0.5,
      ease: Power1.easeIn,
    },
    "<+0.8"
  )
  .to({}, 1, {
    onReverseCompleteParams: [1, TRANSFORM + 0.1],
    onReverseComplete: transitionReverse,
  })
  .to(".section-01 .host-cell", TRANSFORM, {
    onStartParams: [1, TRANSFORM + 0.1],
    onStart: transition,
    left: isMobile ? "calc(25% + 250px)" : "calc(38% + 600px)",
    autoAlpha: 1,
    ease: Power2.easeInOut,
  })
  .to(
    [".section-01 .label-host-cell"],
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0.5,
      ease: Power1.easeIn,
    },
    "<+0.8"
  ) // 1/3 End
  .to({}, 1, {
    onReverseCompleteParams: [1, TRANSFORM + 0.1],
    onReverseComplete: transitionReverse,
  })
  .to(".section-01 .virus-01", TRANSFORM, {
    // 1/4 Start
    onStart: transition,
    scale: 0.15,
    top: isMobile ? "45%" : "calc(40% + 50px)",
    autoAlpha: 0,
    ease: Power2.easeInOut,
  })
  .to(
    ".section-01 .virus-tiny",
    TRANSFORM,
    {
      autoAlpha: 1,
      top: isMobile ? "45%" : "calc(40% + 50px)",
      ease: Power2.easeInOut,
    },
    "<"
  )
  .to(
    ".section-01 .label-virus",
    TRANSFORM,
    {
      top: isMobile ? "calc(45% - 40px)" : "calc(40% - 50px + 50px)",
      ease: Power2.easeInOut,
    },
    "<"
  )
  .to(
    ".section-01 .host-cell",
    TRANSFORM,
    {
      scale: 0.53,
      left: isMobile ? "calc(25% + 190px)" : "calc(38% + 375px)",
      top: isMobile ? "45%" : "calc(40%  + 50px)",
      ease: Power2.easeInOut,
    },
    "<"
  )
  .to(
    ".section-01 .label-host-cell",
    TRANSFORM,
    {
      left: isMobile ? "calc(25% + 190px - 70px)" : "calc(38% + 375px - 130px)",
      top: isMobile ? "calc(45% - 100px)" : "calc(40% - 180px + 50px)",
      ease: Power2.easeInOut,
    },
    "<"
  )
  .to(
    ".section-01 .text-2",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    "<+0.5"
  )
  .to(
    ".section-01 .text-3",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  )
  .to({}, 1, {
    onReverseCompleteParams: [1, TRANSFORM],
    onReverseComplete: transitionReverse,
  })
  .to(
    [
      ".section-01 .host-cell-with-receptors",
      ".section-01 .host-cell-with-receptor-label-arrow",
    ],
    CROSS_FADE_IMAGE,
    {
      onStart: transition,
      autoAlpha: 1,
      ease: Power1.easeIn,
    }
  )
  .to(
    ".section-01 .label-host-cell-with-receptor",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0.5,
      ease: Power1.easeIn,
    },
    "<"
  )
  .to(
    ".section-01 .host-cell",
    0.1,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    "-=0.1"
  ) // 1/4 End
  .to({}, 1, {
    onReverseCompleteParams: [1, CROSS_FADE_IMAGE],
    onReverseComplete: transitionReverse,
  })
  .to(
    ".section-01 .virus-tiny", // 1/5 Start
    TRANSFORM,
    {
      autoAlpha: 0.8,
      left: isMobile
        ? "calc(25% + 190px - 104px)"
        : "calc(38% + 375px - 210px)",
      scale: 0.5,
      top: isMobile ? "calc(45% + 0.5px)" : "calc(40% + 50px + 2px)",
      ease: Power2.easeInOut,
    }
  )
  .to(
    ".section-01 .label-virus",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    "<"
  )
  .to({}, 1, {})
  .to(".section-01 .virus-tiny", TRANSFORM, {
    left: isMobile ? "+=14px" : "+=30px",
    ease: Power2.easeInOut,
  })
  .to(
    ".section-01 .host-cell-fusing",
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  )
  .to(
    [
      ".section-01 .label-host-cell-with-receptor",
      ".section-01 .host-cell-with-receptor-label-arrow",
      ".section-01 .label-host-cell",
      ".section-01 .text-3",
    ],
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    "<"
  )
  .to(
    ".section-01 .text-4",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  )
  .to(
    ".section-01 .label-virus-envelope-fuses",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0.5,
      ease: Power1.easeIn,
    },
    "<"
  )
  .to(
    ".section-01 .host-cell-with-receptors",
    0.1,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    "-=0.1"
  )
  .to({}, 1, {})
  .to(".section-01 .virus-tiny", TRANSFORM, {
    left: isMobile ? "+=5px" : "+=11px",
    ease: Power2.easeInOut,
  })
  .to(
    ".section-01 .host-cell-fused",
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  )
  .to(
    [".section-01 .host-cell-fusing"],
    0.1,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    "-=0.1"
  )
  .to({}, 1, {})
  .to(".section-01 .virus-tiny", TRANSFORM, {
    left: isMobile ? "+=15px" : "+=28px",
    ease: Power2.easeInOut,
  })
  .to(
    ".section-01 .host-cell-fused-fully",
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  )
  .to(
    [".section-01 .host-cell-fused", ".section-01 .virus-tiny"],
    0.1,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    "-=0.1"
  ) // 1/5 End
  .to({}, 2, {})
  .to(
    ".section-01 .host-cell-fused-fully", // 1/6 Start
    TRANSFORM,
    {
      onStart: transition,
      scale: 1,
      left: isMobile ? "65%" : "50%",
      top: "40%",
      autoAlpha: 0,
      ease: Power2.easeInOut,
    }
  )
  .to(
    [".section-01 .label-virus-envelope-fuses", ".section-01 .text-4"],
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    "<"
  )
  .to(
    ".section-01 .host-cell-fused-zoomed",
    TRANSFORM,
    {
      scale: 1,
      left: isMobile ? "63%" : "50%",
      top: "40%",
      autoAlpha: 1,
      ease: Power2.easeInOut,
      onStart: () => {
        spinCogCCW.play();
        spinCogCW.play();
      },
      onReverseComplete: () => {
        spinCogCCW.pause();
        spinCogCW.pause();
      },
    },
    "<"
  )
  .to({}, 1, {
    onReverseCompleteParams: [1, TRANSFORM],
    onReverseComplete: transitionReverse,
  })
  .to(".section-01 .rna", CROSS_FADE_IMAGE, {
    onStart: transition,
    clip: isMobile ? "rect(0px 60px 30px 0px)" : "rect(0px 120px 30px 0px)",
    ease: Power1.easeInOut,
  })
  .to(
    [
      ".section-01 .host-cell-machinery-base",
      ".section-01 .host-cell-machinery-lever",
      ".section-01 .host-cell-machinery-cog-1",
      ".section-01 .host-cell-machinery-cog-2",
      ".section-01 .host-cell-machinery-cog-3",
      ".section-01 .host-cell-machinery-cog-4",
      ".section-01 .host-cell-machinery-cog-5",
      ".section-01 .host-cell-machinery-cog-6",
      ".section-01 .host-cell-machinery-cog-7",
      ".section-01 .host-cell-machinery-cog-8",
      ".section-01 .host-cell-machinery-cog-9",
      ".section-01 .text-5",
    ],
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  )
  .to({}, 1, {
    onReverseCompleteParams: [1, CROSS_FADE_IMAGE],
    onReverseComplete: transitionReverse,
  })
  .to(".section-01 .virus-baby-1", TRANSFORM, {
    onStartParams: [3, TRANSFORM + 0.9],
    onStart: transition,
    top: isMobile ? "calc(44% + 85px)" : "calc(47% + 200px)",
    left: isMobile ? "calc(68% + -10px)" : "calc(52% + 10px)",
    ease: Power2.easeInOut,
    autoAlpha: 1,
  })
  .to(
    ".section-01 .virus-baby-2",
    TRANSFORM,
    {
      top: isMobile ? "calc(44% + 80px)" : "calc(47% + 165px)",
      left: isMobile ? "calc(68% + 20px)" : "calc(52% + 80px)",
      autoAlpha: 1,
      ease: Power2.easeInOut,
    },
    "<+0.1"
  )
  .to(
    ".section-01 .virus-baby-3",
    TRANSFORM,
    {
      top: isMobile ? "calc(44% + 75px)" : "calc(47% + 145px)",
      left: isMobile ? "calc(68% + 50px)" : "calc(52% + 150px)",
      autoAlpha: 1,
      ease: Power2.easeInOut,
    },
    "<+0.1"
  )
  .to(
    ".section-01 .virus-baby-4",
    TRANSFORM,
    {
      top: isMobile ? "calc(44% + 70px)" : "calc(47% + 140px)",
      left: isMobile ? "calc(68% + -30px)" : "calc(52% + -45px)",
      autoAlpha: 1,
      ease: Power2.easeInOut,
    },
    "<+0.1"
  )
  .to(
    ".section-01 .virus-baby-5",
    TRANSFORM,
    {
      top: isMobile ? "calc(44% + 60px)" : "calc(47% + 120px)",
      left: isMobile ? "calc(68% + 0px)" : "calc(52% + 30px)",
      autoAlpha: 1,
      ease: Power2.easeInOut,
    },
    "<+0.1"
  )
  .to(
    ".section-01 .virus-baby-6",
    TRANSFORM,
    {
      top: isMobile ? "calc(44% + 50px)" : "calc(47% + 90px)",
      left: isMobile ? "calc(68% + 45px)" : "calc(52% + 140px)",
      autoAlpha: 1,
      ease: Power2.easeInOut,
    },
    "<+0.1"
  )
  .to(
    ".section-01 .virus-baby-7",
    TRANSFORM,
    {
      top: isMobile ? "calc(44% + 40px)" : "calc(47% + 80px)",
      left: isMobile ? "calc(68% + -15px)" : "calc(52% + 85px)",
      autoAlpha: 1,
      ease: Power2.easeInOut,
    },
    "<+0.1"
  )
  .to(
    ".section-01 .virus-baby-8",
    TRANSFORM,
    {
      top: isMobile ? "calc(44% + 45px)" : "calc(47% + 95px)",
      left: isMobile ? "calc(68% + 25px)" : "calc(52% + -15px)",
      autoAlpha: 1,
      ease: Power2.easeInOut,
    },
    "<+0.1"
  )
  .to(
    ".section-01 .virus-baby-9",
    TRANSFORM,
    {
      top: isMobile ? "calc(44% + 30px)" : "calc(47% + 55px)",
      left: isMobile ? "calc(68% + 10px)" : "calc(52% + -30px)",
      autoAlpha: 1,
      ease: Power2.easeInOut,
    },
    "<+0.1"
  )
  .to(
    ".section-01 .virus-baby-10",
    TRANSFORM,
    {
      top: isMobile ? "calc(44% + 10px)" : "calc(47% + 40px)",
      left: isMobile ? "calc(68% + 0px)" : "calc(52% + 30px)",
      autoAlpha: 1,
      ease: Power2.easeInOut,
    },
    "<+0.1"
  )
  .to({}, 2, {
    onReverseCompleteParams: [2, TRANSFORM + 0.9],
    onReverseComplete: transitionReverse,
  })
  .to(
    [
      ".section-01 .host-cell-machinery-base",
      ".section-01 .host-cell-machinery-lever",
      ".section-01 .host-cell-machinery-cog-1",
      ".section-01 .host-cell-machinery-cog-2",
      ".section-01 .host-cell-machinery-cog-3",
      ".section-01 .host-cell-machinery-cog-4",
      ".section-01 .host-cell-machinery-cog-5",
      ".section-01 .host-cell-machinery-cog-6",
      ".section-01 .host-cell-machinery-cog-7",
      ".section-01 .host-cell-machinery-cog-8",
      ".section-01 .host-cell-machinery-cog-9",
      ".section-01 .rna",
      ".section-01 .baby-virus",
    ],
    CROSS_FADE_IMAGE,
    {
      onStart: transition,
      autoAlpha: 0,
      ease: Power1.easeOut,
    }
  )
  .to({}, 0, {
    onReverseCompleteParams: [1, CROSS_FADE_IMAGE],
    onReverseComplete: transitionReverse,
  })
  .to(".section-01 .host-cell-fused-fully", TRANSFORM, {
    onStart: transition,
    scale: 0.53,
    left: isMobile ? "calc(50% - 110px)" : "38%",
    top: "40%",
    autoAlpha: 1,
    ease: Power2.easeInOut,
  })
  .to(
    [".section-01 .host-cell-fused-zoomed"],
    TRANSFORM,
    {
      autoAlpha: 0,
      scale: 0.53,
      left: isMobile ? "calc(50% - 110px)" : "38%",
      top: "40%",
      ease: Power2.easeInOut,
    },
    "<"
  )
  .to(
    ".section-01 .text-5",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    "<"
  )
  .to({}, 1, {
    onReverseCompleteParams: [1, TRANSFORM],
    onReverseComplete: transitionReverse,
  })
  .to(".section-01 .host-cell-with-receptors-copy", TRANSFORM, {
    onReverseComplete: () => {
      spinCogCCW.play();
      spinCogCW.play();
    },
    onStart: () => {
      spinCogCCW.pause();
      spinCogCW.pause();
      transition(2, TRANSFORM + 0.6);
    },
    left: isMobile ? "calc(30% + 275px - 20px)" : "calc(38% + 530px)",
    autoAlpha: 1,
    ease: Power2.easeInOut,
  })
  .to(
    ".section-01 .virus-tiny-1",
    TRANSFORM,
    {
      top: isMobile ? "calc(40% + 25px)" : "calc(40% + 40px)",
      left: isMobile ? "calc(30% + 120px - 20px)" : "calc(38% + 240px)",
      autoAlpha: 1,
      ease: Power2.easeInOut,
    },
    "<"
  )
  .to(
    ".section-01 .virus-tiny-2",
    TRANSFORM,
    {
      top: isMobile ? "calc(40% + 60px)" : "calc(40% + 100px)",
      left: isMobile ? "calc(30% + 110px - 20px)" : "calc(38% + 225px)",
      autoAlpha: 1,
      ease: Power2.easeInOut,
    },
    "<+0.1"
  )
  .to(
    ".section-01 .virus-tiny-3",
    TRANSFORM,
    {
      top: isMobile ? "calc(40% + 50px)" : "calc(40% + 90px)",
      left: isMobile ? "calc(30% + 85px - 20px)" : "calc(38% + 175px)",
      autoAlpha: 1,
      ease: Power2.easeInOut,
    },
    "<+0.1"
  )
  .to(
    ".section-01 .virus-tiny-4",
    TRANSFORM,
    {
      top: isMobile ? "calc(40% + 80px)" : "calc(40% + 135px)",
      left: isMobile ? "calc(30% + 80px - 20px)" : "calc(38% + 180px)",
      autoAlpha: 1,
      ease: Power2.easeInOut,
    },
    "<+0.1"
  )
  .to(
    ".section-01 .virus-tiny-5",
    TRANSFORM,
    {
      top: isMobile ? "calc(40% + 90px)" : "calc(40% + 150px)",
      left: isMobile ? "calc(30% + 50px - 20px)" : "calc(38% + 120px)",
      autoAlpha: 1,
      ease: Power2.easeInOut,
    },
    "<+0.1"
  )
  .to(
    ".section-01 .text-6",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<+0.1"
  )
  .to(
    ".section-01 .arrow-red",
    TRANSFORM,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<+0.1"
  )
  .to({}, 2, {
    onReverseCompleteParams: [1, TRANSFORM + 0.6],
    onReverseComplete: transitionReverse,
  })
  .to(".section-01", CROSS_FADE_IMAGE, {
    onStart: transition,
    autoAlpha: 0,
    ease: Power1.easeOut,
  })
  .to(
    ".scrollbar-down-fg",
    CROSS_FADE_IMAGE,
    isMobile
      ? {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        }
      : {},
    "<"
  )
  .to(
    ".section-02",
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  );

const scene01 = new ScrollMagic.Scene({
  triggerElement: ".section-01",
  duration: SCENE_1_LEN,
  triggerHook: 0,
})
  .on("enter", () => (delta = scene01.duration() / tweenScene1.duration()))
  .setPin(".section-01")
  .setTween(tweenScene1)
  .addTo(controller);

// SCENE 1 END

const tweenScene2 = new TimelineLite();

tweenScene2
  .to({}, 0, {
    onReverseComplete: () => {
      delta = scene01.duration() / tweenScene1.duration();
      transitionReverse(1, CROSS_FADE_IMAGE);
    },
  })
  .to([".section-02 .title-1", ".section-02 .text-1"], CROSS_FADE_TEXT, {
    onStartParams: [1, CROSS_FADE_TEXT + 0.1],
    onStart: transition,
    autoAlpha: 1,
    ease: Power1.easeIn,
    stagger: 0.1,
  })
  .to({}, 0, {
    onReverseCompleteParams: [1, CROSS_FADE_TEXT + 0.1],
    onReverseComplete: transitionReverse,
  })
  .to(
    [
      ".section-02 .text-innate",
      ".section-02 .text-adaptive",
      ".section-02 .text-fast-resp",
      ".section-02 .text-slow-resp",
    ],
    CROSS_FADE_TEXT,
    {
      onStart: transition,
      autoAlpha: 1,
      ease: Power1.easeIn,
    }
  )
  .to({}, 0, {
    onReverseCompleteParams: [1, CROSS_FADE_TEXT],
    onReverseComplete: transitionReverse,
  })
  .to(
    [
      ".section-02 .skin",
      ".section-02 .mucous-membrane",
      ".section-02 .phagocytosis",
      ".section-02 .b-cells",
      ".section-02 .t-cells",
    ],
    CROSS_FADE_IMAGE,
    {
      onStartParams: [3, CROSS_FADE_IMAGE + 0.8],
      onStart: transition,
      autoAlpha: 1,
      ease: Power1.easeIn,
      stagger: 0.2,
    }
  )
  .to({}, 1, {
    onReverseCompleteParams: [1, CROSS_FADE_IMAGE + 0.8],
    onReverseComplete: transitionReverse,
  })
  .to([".section-02 .adaptive", ".section-02 .text-1"], CROSS_FADE_IMAGE, {
    onStart: transition,
    autoAlpha: 0,
    ease: Power1.easeOut,
  })
  .to({}, 0, {
    onReverseCompleteParams: [1, CROSS_FADE_IMAGE],
    onReverseComplete: transitionReverse,
  })
  .to([".section-02 .text-innate", ".section-02 .text-fast-resp"], TRANSFORM, {
    onStart: transition,
    top: isMobile ? "-=22%" : "-=0%",
    ease: Power2.easeInOut,
  })
  .to(
    [".section-02 .text-adaptive", ".section-02 .text-slow-resp"],
    TRANSFORM,
    {
      top: isMobile ? "-=50%" : "-=260px",
      ease: Power2.easeInOut,
    },
    "<"
  )
  .to(
    [
      ".section-02 .skin",
      ".section-02 .mucous-membrane",
      ".section-02 .phagocytosis",
      ".section-02 .b-cells",
      ".section-02 .t-cells",
    ],
    TRANSFORM,
    {
      top: isMobile ? "45%" : "50%",
      scale: 0.9,
      ease: Power2.easeInOut,
    },
    "<"
  )
  .to(
    ".section-02 .skin",
    TRANSFORM,
    {
      left: isMobile ? "+=0" : "calc(50% - 255px)",
      ease: Power2.easeInOut,
    },
    "<"
  )
  .to(
    ".section-02 .phagocytosis",
    TRANSFORM,
    {
      left: isMobile ? "+=0" : "calc(50% + 255px)",
      ease: Power2.easeInOut,
    },
    "<"
  )
  .to(
    ".section-02 .b-cells",
    TRANSFORM,
    {
      scale: isMobile ? 1.5 : 1,
      left: isMobile ? "calc(50% - 75px)" : "calc(50% - 150px)",
      ease: Power2.easeInOut,
    },
    "<"
  )
  .to(
    ".section-02 .t-cells",
    TRANSFORM,
    {
      scale: isMobile ? 1.5 : 1,
      left: isMobile ? "calc(50% + 75px)" : "calc(50% + 150px)",
      ease: Power2.easeInOut,
    },
    "<"
  )
  .to(
    ".section-02 .text-2",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<+0.5"
  )
  .to({}, 2, {
    onReverseCompleteParams: [1, TRANSFORM],
    onReverseComplete: transitionReverse,
  })
  .to(".section-02 .skin", TRANSFORM, {
    onStart: transition,
    left: isMobile ? "+=25" : "+=127.5",
    scale: isMobile ? 1.5 : 0.9,
    ease: Power2.easeInOut,
  })
  .to(
    ".section-02 .mucous-membrane",
    TRANSFORM,
    {
      left: isMobile ? "+=71.25" : "+=127.5",
      scale: isMobile ? 1.5 : 0.9,
      ease: Power2.easeInOut,
    },
    "<"
  )
  .to(
    ".section-02 .phagocytosis",
    TRANSFORM,
    {
      left: isMobile ? "+=125" : "+=127.5",
      scale: isMobile ? 1.5 : 0.9,
      autoAlpha: 0.2,
      ease: Power2.easeInOut,
    },
    "<"
  )
  .to(
    ".section-02 .text-2",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    "<"
  )
  .to(
    ".section-02 .text-3",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<+0.5"
  )
  .to({}, 2, {
    onReverseCompleteParams: [1, TRANSFORM],
    onReverseComplete: transitionReverse,
  })
  .to(
    [
      ".section-02 .skin",
      ".section-02 .phagocytosis",
      ".section-02 .mucous-membrane",
    ],
    TRANSFORM,
    {
      onStart: transition,
      left: isMobile ? "-=220" : "-=382.5",
      ease: Power2.easeInOut,
    }
  )
  .to(
    [".section-02 .skin", ".section-02 .mucous-membrane"],
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 0.2,
      ease: Power1.easeOut,
    },
    "<"
  )
  .to(
    ".section-02 .phagocytosis",
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  )
  .to(
    ".section-02 .text-3",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    "<"
  )
  .to(
    ".section-02 .text-4",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 1,
      zIndex: 2,
      ease: Power1.easeIn,
    },
    "<+0.5"
  )
  .to({}, 1, {
    onReverseCompleteParams: [1, TRANSFORM],
    onReverseComplete: transitionReverse,
  })
  .to(".section-02 .innate", CROSS_FADE_IMAGE, {
    onStart: transition,
    autoAlpha: 0,
    ease: Power1.easeOut,
  })
  .to(
    ".section-02 .adaptive",
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  )
  .to(
    ".section-02 .text-4",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0,
      zIndex: 1,
      ease: Power1.easeOut,
    },
    "<"
  )
  .to(
    ".section-02 .text-5",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 1,
      zIndex: 2,
      ease: Power1.easeIn,
    },
    "<+0.5"
  )
  .to({}, 1, {
    onReverseCompleteParams: [1, CROSS_FADE_IMAGE],
    onReverseComplete: transitionReverse,
  })
  .to(".section-02 .text-5", CROSS_FADE_TEXT, {
    onStart: transition,
    autoAlpha: 0,
    zIndex: 1,
    ease: Power1.easeOut,
  })
  .to(
    ".section-02 .text-6",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  )
  .to({}, 2, {
    onReverseCompleteParams: [1, CROSS_FADE_TEXT],
    onReverseComplete: transitionReverse,
  })
  .to(".section-02", CROSS_FADE_IMAGE, {
    onStart: transition,
    autoAlpha: 0,
    ease: Power1.easeOut,
  })
  .to(
    ".section-03",
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  );

const scene02 = new ScrollMagic.Scene({
  duration: SCENE_2_LEN,
  triggerHook: 1,
  offset: SCENE_1_LEN,
})
  .on("enter", () => (delta = scene02.duration() / tweenScene2.duration()))
  .setPin(".section-02")
  .setTween(tweenScene2)
  .addTo(controller);

// Scene 3

const tweenScene3 = new TimelineLite();

tweenScene3
  .to({}, 0, {
    onReverseComplete: () => {
      delta = scene02.duration() / tweenScene2.duration();
      transitionReverse(1, CROSS_FADE_IMAGE);
    },
  })
  .to(
    [".section-03 .bg-layer-3", ".symptom-images .default"],
    CROSS_FADE_IMAGE,
    {
      onStart: transition,
      autoAlpha: 1,
      ease: Power1.easeIn,
    }
  )
  .to(
    [".section-03 .title-1", ".section-03 .text-1", ".section-03 .subtext-1"],
    CROSS_FADE_TEXT,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<+0.3"
  )
  .to({}, 0, {
    onReverseCompleteParams: [1, CROSS_FADE_IMAGE],
    onReverseComplete: transitionReverse,
  })
  .to([".section-03 .scroll-list"], CROSS_FADE_TEXT, {
    onStart: transition,
    autoAlpha: 1,
    ease: Power1.easeIn,
  })
  .to({}, 1, {
    onReverseCompleteParams: [1, CROSS_FADE_TEXT],
    onReverseComplete: transitionReverse,
  })
  .to(".section-03 .symptom-image-1", CROSS_FADE_IMAGE, {
    onStart: transition,
    autoAlpha: 1,
    ease: Power1.easeIn,
  })
  .to(
    ".section-03 .scroll-list-1",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 1,
      fontWeight: "bold",
      ease: Power1.easeIn,
    },
    "<"
  )
  .to({}, 2, {
    onReverseCompleteParams: [1, CROSS_FADE_IMAGE],
    onReverseComplete: transitionReverse,
  })
  .to(".section-03 .scroll-list", TRANSFORM, {
    onStart: transition,
    top: "-=28",
    ease: Power2.easeInOut,
  })
  .to(
    ".section-03 .scroll-list-1",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0.5,
      fontWeight: "normal",
      ease: Power1.easeOut,
    },
    "<"
  )
  .to(
    ".section-03 .scroll-list-2",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 1,
      fontWeight: "bold",
      ease: Power1.easeIn,
    },
    "<"
  )
  .to(
    ".section-03 .symptom-image-1",
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    "<"
  )
  .to(
    ".section-03 .symptom-image-2",
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  )
  .to({}, 2, {
    onReverseCompleteParams: [1, TRANSFORM],
    onReverseComplete: transitionReverse,
  })
  .to(".section-03 .scroll-list", TRANSFORM, {
    onStart: transition,
    top: "-=28",
    ease: Power2.easeInOut,
  })
  .to(
    ".section-03 .scroll-list-2",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0.5,
      fontWeight: "normal",
      ease: Power1.easeOut,
    },
    "<"
  )
  .to(
    ".section-03 .scroll-list-3",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 1,
      fontWeight: "bold",
      ease: Power1.easeIn,
    },
    "<"
  )
  .to(
    ".section-03 .symptom-image-2",
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    "<"
  )
  .to(
    ".section-03 .symptom-image-3",
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  )
  .to({}, 2, {
    onReverseCompleteParams: [1, TRANSFORM],
    onReverseComplete: transitionReverse,
  })
  .to(".section-03 .scroll-list", TRANSFORM, {
    onStart: transition,
    top: "-=28",
    ease: Power2.easeInOut,
  })
  .to(
    ".section-03 .scroll-list-3",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0.5,
      fontWeight: "normal",
      ease: Power1.easeOut,
    },
    "<"
  )
  .to(
    ".section-03 .scroll-list-4",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 1,
      fontWeight: "bold",
      ease: Power1.easeIn,
    },
    "<"
  )
  .to(
    ".section-03 .symptom-image-3",
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    "<"
  )
  .to(
    ".section-03 .symptom-image-4",
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  )
  .to({}, 2, {
    onReverseCompleteParams: [1, TRANSFORM],
    onReverseComplete: transitionReverse,
  })
  .to(".section-03 .scroll-list", TRANSFORM, {
    onStart: transition,
    top: "-=28",
    ease: Power2.easeInOut,
  })
  .to(
    ".section-03 .scroll-list-4",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0.5,
      fontWeight: "normal",
      ease: Power1.easeOut,
    },
    "<"
  )
  .to(
    ".section-03 .scroll-list-5",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 1,
      fontWeight: "bold",
      ease: Power1.easeIn,
    },
    "<"
  )
  .to({}, 2, {
    onReverseCompleteParams: [1, TRANSFORM],
    onReverseComplete: transitionReverse,
  })
  .to(".section-03 .scroll-list", TRANSFORM, {
    onStart: transition,
    top: "-=28",
    ease: Power2.easeInOut,
  })
  .to(
    ".section-03 .scroll-list-5",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0.5,
      fontWeight: "normal",
      ease: Power1.easeOut,
    },
    "<"
  )
  .to(
    ".section-03 .scroll-list-6",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 1,
      fontWeight: "bold",
      ease: Power1.easeIn,
    },
    "<"
  )
  .to(
    ".section-03 .symptom-image-4",
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    "<"
  )
  .to(
    ".section-03 .symptom-image-5",
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  )
  .to({}, 2, {
    onReverseCompleteParams: [1, TRANSFORM],
    onReverseComplete: transitionReverse,
  })
  .to(".section-03 .scroll-list", TRANSFORM, {
    onStart: transition,
    top: "-=28",
    ease: Power2.easeInOut,
  })
  .to(
    ".section-03 .scroll-list-6",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0.5,
      fontWeight: "normal",
      ease: Power1.easeOut,
    },
    "<"
  )
  .to(
    ".section-03 .scroll-list-7",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 1,
      fontWeight: "bold",
      ease: Power1.easeIn,
    },
    "<"
  )
  .to(
    ".section-03 .symptom-image-5",
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    "<"
  )
  .to(
    ".section-03 .symptom-image-6",
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  )
  .to({}, 2, {
    onReverseCompleteParams: [1, TRANSFORM],
    onReverseComplete: transitionReverse,
  })
  .to(".section-03 .scroll-list", TRANSFORM, {
    onStart: transition,
    top: "-=28",
    ease: Power2.easeInOut,
  })
  .to(
    ".section-03 .scroll-list-7",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0.5,
      fontWeight: "normal",
      ease: Power1.easeOut,
    },
    "<"
  )
  .to(
    ".section-03 .scroll-list-8",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 1,
      fontWeight: "bold",
      ease: Power1.easeIn,
    },
    "<"
  )
  .to(
    ".section-03 .symptom-image-6",
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    "<"
  )
  .to(
    ".section-03 .symptom-image-7",
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  )
  .to({}, 2, {
    onReverseCompleteParams: [1, TRANSFORM],
    onReverseComplete: transitionReverse,
  })
  .to(".section-03 .scroll-list", TRANSFORM, {
    onStart: transition,
    top: "-=28",
    ease: Power2.easeInOut,
  })
  .to(
    ".section-03 .scroll-list-8",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0.5,
      fontWeight: "normal",
      ease: Power1.easeOut,
    },
    "<"
  )
  .to(
    ".section-03 .scroll-list-9",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 1,
      fontWeight: "bold",
      ease: Power1.easeIn,
    },
    "<"
  )
  .to(
    ".section-03 .symptom-image-7",
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    "<"
  )
  .to(
    ".section-03 .symptom-image-8",
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  )
  .to({}, 2, {
    onReverseCompleteParams: [1, TRANSFORM],
    onReverseComplete: transitionReverse,
  })
  .to(".section-03 .scroll-list", TRANSFORM, {
    onStart: transition,
    top: "-=28",
    ease: Power2.easeInOut,
  })
  .to(
    ".section-03 .scroll-list-9",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0.5,
      fontWeight: "normal",
      ease: Power1.easeOut,
    },
    "<"
  )
  .to(
    ".section-03 .scroll-list-10",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 1,
      fontWeight: "bold",
      ease: Power1.easeIn,
    },
    "<"
  )
  .to(
    ".section-03 .symptom-image-8",
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    "<"
  )
  .to(
    ".section-03 .symptom-image-9",
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  )
  .to({}, 2, {
    onReverseCompleteParams: [1, TRANSFORM],
    onReverseComplete: transitionReverse,
  })
  .to(".section-03 .scroll-list", TRANSFORM, {
    onStart: transition,
    top: "-=28",
    ease: Power2.easeInOut,
  })
  .to(
    ".section-03 .scroll-list-10",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0.5,
      fontWeight: "normal",
      ease: Power1.easeOut,
    },
    "<"
  )
  .to(
    ".section-03 .scroll-list-11",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 1,
      fontWeight: "bold",
      ease: Power1.easeIn,
    },
    "<"
  )
  .to(
    ".section-03 .symptom-image-9",
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    "<"
  )
  .to(
    ".section-03 .symptom-image-10",
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  )
  .to({}, 2, {
    onReverseCompleteParams: [1, TRANSFORM],
    onReverseComplete: transitionReverse,
  })
  .to(".section-03 .scroll-list", TRANSFORM, {
    onStart: transition,
    top: "-=28",
    ease: Power2.easeInOut,
  })
  .to(
    ".section-03 .scroll-list-11",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0.5,
      fontWeight: "normal",
      ease: Power1.easeOut,
    },
    "<"
  )
  .to(
    ".section-03 .scroll-list-12",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 1,
      fontWeight: "bold",
      ease: Power1.easeIn,
    },
    "<"
  )
  .to(
    ".section-03 .symptom-image-10",
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    "<"
  )
  .to(
    ".section-03 .symptom-image-5",
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  )
  .to({}, 2, {
    onReverseCompleteParams: [1, TRANSFORM],
    onReverseComplete: transitionReverse,
  })
  .to(".section-03 .scroll-list", TRANSFORM, {
    onStart: transition,
    top: "-=28",
    ease: Power2.easeInOut,
  })
  .to(
    ".section-03 .scroll-list-12",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0.5,
      fontWeight: "normal",
      ease: Power1.easeOut,
    },
    "<"
  )
  .to(
    ".section-03 .scroll-list-13",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 1,
      fontWeight: "bold",
      ease: Power1.easeIn,
    },
    "<"
  )
  .to(
    ".section-03 .symptom-image-5",
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    "<"
  )
  .to(
    ".section-03 .symptom-image-11",
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  )
  .to({}, 2, {
    onReverseCompleteParams: [1, TRANSFORM],
    onReverseComplete: transitionReverse,
  })
  .to(".section-03 .scroll-list", TRANSFORM, {
    onStart: transition,
    top: "-=28",
    ease: Power2.easeInOut,
  })
  .to(
    ".section-03 .scroll-list-13",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0.5,
      fontWeight: "normal",
      ease: Power1.easeOut,
    },
    "<"
  )
  .to(
    ".section-03 .scroll-list-14",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 1,
      fontWeight: "bold",
      ease: Power1.easeIn,
    },
    "<"
  )
  .to({}, 2, {
    onReverseCompleteParams: [1, TRANSFORM],
    onReverseComplete: transitionReverse,
  })
  .to(".section-03 .scroll-list", TRANSFORM, {
    onStart: transition,
    top: "-=28",
    ease: Power2.easeInOut,
  })
  .to(
    ".section-03 .scroll-list-14",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 0.5,
      fontWeight: "normal",
      ease: Power1.easeOut,
    },
    "<"
  )
  .to(
    ".section-03 .scroll-list-15",
    CROSS_FADE_TEXT,
    {
      autoAlpha: 1,
      fontWeight: "bold",
      ease: Power1.easeIn,
    },
    "<"
  )
  .to(
    ".section-03 .symptom-image-11",
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    "<"
  )
  .to(
    ".section-03 .symptom-image-5",
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  )
  .to({}, 2, {
    onReverseCompleteParams: [1, TRANSFORM],
    onReverseComplete: transitionReverse,
  })
  .to(".section-03", CROSS_FADE_IMAGE, {
    onStart: transition,
    autoAlpha: 0,
    ease: Power1.easeOut,
  })
  .to(
    ".section-04",
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  );

const scene03 = new ScrollMagic.Scene({
  duration: SCENE_3_LEN,
  triggerHook: 1,
  offset: SCENE_1_LEN + SCENE_2_LEN,
})
  .on("enter", () => (delta = scene03.duration() / tweenScene3.duration()))
  .setPin(".section-03")
  .setTween(tweenScene3)
  .addTo(controller);

const tweenScene4 = new TimelineLite();

tweenScene4
  .to({}, 0, {
    onReverseComplete: () => {
      delta = scene03.duration() / tweenScene3.duration();
      transitionReverse(1, CROSS_FADE_IMAGE);
    },
  })
  .to(
    [
      ".section-04 .bg-layer-4",
      ".section-04 .title-1",
      ".section-04 .text-1",
      ".section-04 .boy-1",
      ".section-04 .girl-1",
      ".section-04 .call-bubble-1",
      ".section-04 .call-bubble-2",
      ".section-04 .dist-line",
    ],
    CROSS_FADE_IMAGE,
    {
      onStart: transition,
      autoAlpha: 1,
      ease: Power1.easeIn,
    }
  )
  .to({}, 2, {
    onReverseCompleteParams: [1, CROSS_FADE_IMAGE],
    onReverseComplete: transitionReverse,
  })
  .to([".section-04 .girl-1", ".section-04 .call-bubble-1"], TRANSFORM, {
    onStart: transition,
    left: isMobile ? "+=65" : "+=75",
    ease: Power2.easeInOut,
  })
  .to(
    [".section-04 .boy-1", ".section-04 .call-bubble-2"],
    TRANSFORM,
    {
      left: isMobile ? "-=70" : "-=80",
      ease: Power2.easeInOut,
    },
    "<"
  )
  .to(
    [".section-04 .dist-line"],
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    "<"
  )
  .to({}, 1, {
    onReverseCompleteParams: [1, TRANSFORM],
    onReverseComplete: transitionReverse,
  })
  .to(
    [
      ".section-04 .boy-1",
      ".section-04 .call-bubble-1",
      ".section-04 .call-bubble-2",
    ],
    CROSS_FADE_IMAGE,
    {
      onStart: transition,
      autoAlpha: 0,
      ease: Power1.easeOut,
    }
  )
  .to(
    [".section-04 .boy-2"],
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  )
  .to({}, 2, {
    onReverseCompleteParams: [1, CROSS_FADE_IMAGE],
    onReverseComplete: transitionReverse,
  })
  .to([".section-04 .girl-1"], CROSS_FADE_IMAGE, {
    onStart: transition,
    autoAlpha: 0,
    ease: Power1.easeOut,
  })
  .to(
    [".section-04 .girl-2"],
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  )
  .to({}, 0, {
    onReverseCompleteParams: [1, CROSS_FADE_IMAGE],
    onReverseComplete: transitionReverse,
  })
  .to([".section-04 .bg-layer-4"], CROSS_FADE_IMAGE, {
    onStart: transition,
    autoAlpha: 0,
    ease: Power1.easeOut,
  })
  .to(
    [".section-04 .bg-layer-5"],
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  )
  .to({}, 2, {
    onReverseCompleteParams: [1, CROSS_FADE_IMAGE],
    onReverseComplete: transitionReverse,
  })
  .to([".section-04 .boy-2", ".section-04 .girl-2"], CROSS_FADE_IMAGE, {
    onStart: transition,
    autoAlpha: 0,
    ease: Power1.easeOut,
  })
  .to(
    [".section-04 .boy-1", ".section-04 .girl-1"],
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  )
  .to({}, 1, {
    onReverseCompleteParams: [1, CROSS_FADE_IMAGE],
    onReverseComplete: transitionReverse,
  })
  .to(".section-04 .lottie-lungs", TRANSFORM, {
    onStartParams: [1, TRANSFORM + 0.2],
    onStart: transition,
    autoAlpha: 1,
    scale: 1,
    top: "37%",
    left: "50%",
    ease: Power2.easeInOut,
  })
  .to(
    [".section-04 .shot-1", ".section-04 .bg-layer-5", ".section-04 .text-1"],
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    "<+0.2"
  )
  .to(
    [".section-04 .text-2"],
    CROSS_FADE_TEXT,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  )
  .to({}, 2, {
    onStart: () => {
      lottieLungsAnimation.play();
    },
    onReverseComplete: () => {
      lottieLungsAnimation.stop();
      transitionReverse(1, TRANSFORM + 0.2);
    },
  })
  .to(".section-04", CROSS_FADE_IMAGE, {
    onStart: () => {
      lottieLungsAnimation.stop();
      transition(1, CROSS_FADE_IMAGE);
    },
    autoAlpha: 0,
    ease: Power1.easeOut,
  })
  .to(
    ".section-05",
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  );

const scene04 = new ScrollMagic.Scene({
  duration: SCENE_4_LEN,
  triggerHook: 1,
  offset: SCENE_1_LEN + SCENE_2_LEN + SCENE_3_LEN,
})
  .on("enter", () => (delta = scene04.duration() / tweenScene4.duration()))
  .setPin(".section-04")
  .setTween(tweenScene4)
  .addTo(controller);

const tweenScene5 = new TimelineLite();

tweenScene5
  .to({}, 0, {
    onReverseComplete: () => {
      delta = scene04.duration() / tweenScene4.duration();
      transitionReverse(1, CROSS_FADE_IMAGE);
    },
  })
  .to([".section-05 .title-1"], CROSS_FADE_TEXT, {
    onStart: transition,
    autoAlpha: 1,
    ease: Power1.easeIn,
    onComplete: () => !spinNormalTween.isActive() && spinNormalTween.restart(),
    onReverseComplete: () =>
      spinNormalTween.isActive() && spinNormalTween.pause(),
  })
  .to({}, 0, {
    onReverseCompleteParams: [1, CROSS_FADE_TEXT],
    onReverseComplete: transitionReverse,
  })
  .to(
    [".section-05 .virus-primary", ".section-05 .prevent"],
    CROSS_FADE_IMAGE,
    {
      onStart: transition,
      autoAlpha: 1,
      ease: Power1.easeIn,
    }
  )
  .to(
    [".section-05 .text-1"],
    CROSS_FADE_TEXT,
    {
      autoAlpha: isMobile ? 0 : 1,
      ease: Power1.easeIn,
    },
    "<"
  )
  .to({}, 0, {
    onReverseCompleteParams: [1, CROSS_FADE_IMAGE],
    onReverseComplete: transitionReverse,
  })
  .to(
    [
      ".section-05 .image-carousel",
      ".section-05 .carousel-img-1",
      ".section-05 .label-1",
    ],
    CROSS_FADE_IMAGE,
    {
      onStart: transition,
      autoAlpha: 1,
      ease: Power1.easeIn,
    }
  )
  .to({}, isMobile ? 1 : 0, {
    onReverseCompleteParams: [1, CROSS_FADE_IMAGE],
    onReverseComplete: transitionReverse,
  })
  .to(
    [".section-05 .carousel-img-2", ".section-05 .label-2"],
    CROSS_FADE_IMAGE,
    {
      onStartParams: [1, TRANSFORM],
      onStart: transition,
      autoAlpha: 1,
      ease: Power1.easeIn,
    }
  )
  .to(
    [".section-05 .carousel-img-1", ".section-05 .label-1"],
    CROSS_FADE_IMAGE,
    {
      autoAlpha: isMobile ? 0 : 1,
      ease: Power1.easeOut,
    },
    "<"
  )
  .to(
    [
      ".section-05 .image-carousel > label",
      ".section-05 .image-carousel > img",
    ],
    TRANSFORM,
    {
      top: isMobile ? "-=250" : "-=0",
      ease: Power2.easeInOut,
    },
    "<"
  )
  .to({}, isMobile ? 1 : 0, {
    onReverseCompleteParams: [1, TRANSFORM],
    onReverseComplete: transitionReverse,
  })
  .to(
    [".section-05 .carousel-img-3", ".section-05 .label-3"],
    CROSS_FADE_IMAGE,
    {
      onStartParams: [1, TRANSFORM],
      onStart: transition,
      autoAlpha: 1,
      ease: Power1.easeIn,
    }
  )
  .to(
    [".section-05 .carousel-img-2", ".section-05 .label-2"],
    CROSS_FADE_IMAGE,
    {
      autoAlpha: isMobile ? 0 : 1,
      ease: Power1.easeOut,
    },
    "<"
  )
  .to(
    [
      ".section-05 .image-carousel > label",
      ".section-05 .image-carousel > img",
    ],
    TRANSFORM,
    {
      top: isMobile ? "-=250" : "-=0",
      ease: Power2.easeInOut,
    },
    "<"
  )
  .to({}, isMobile ? 1 : 0, {
    onReverseCompleteParams: [1, TRANSFORM],
    onReverseComplete: transitionReverse,
  })
  .to(
    [".section-05 .carousel-img-4", ".section-05 .label-4"],
    CROSS_FADE_IMAGE,
    {
      onStartParams: [1, TRANSFORM],
      onStart: transition,
      autoAlpha: 1,
      ease: Power1.easeIn,
    }
  )
  .to(
    [".section-05 .carousel-img-3", ".section-05 .label-3"],
    CROSS_FADE_IMAGE,
    {
      autoAlpha: isMobile ? 0 : 1,
      ease: Power1.easeOut,
    },
    "<"
  )
  .to(
    [
      ".section-05 .image-carousel > label",
      ".section-05 .image-carousel > img",
    ],
    TRANSFORM,
    {
      top: isMobile ? "-=250" : "-=0",
      ease: Power2.easeInOut,
    },
    "<"
  )
  .to({}, isMobile ? 1 : 0, {
    onReverseCompleteParams: [1, TRANSFORM],
    onReverseComplete: transitionReverse,
  })
  .to([".section-05 .text-1"], CROSS_FADE_IMAGE, {
    onStartParams: [1, TRANSFORM],
    onStart: transition,
    autoAlpha: 1,
    ease: Power1.easeIn,
  })
  .to(
    [".section-05 .carousel-img-4", ".section-05 .label-4"],
    CROSS_FADE_IMAGE,
    {
      autoAlpha: isMobile ? 0 : 1,
      ease: Power1.easeOut,
    },
    "<"
  )
  .to(
    [
      ".section-05 .image-carousel > label",
      ".section-05 .image-carousel > img",
    ],
    TRANSFORM,
    {
      top: isMobile ? "-=250" : "-=0",
      ease: Power2.easeInOut,
    },
    "<"
  )
  .to({}, 2, {
    onReverseCompleteParams: [1, TRANSFORM],
    onReverseComplete: transitionReverse,
  })
  .to(".section-05", CROSS_FADE_IMAGE, {
    onStart: transition,
    autoAlpha: 0,
    ease: Power1.easeOut,
  })
  .to(
    ".section-06",
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  );

const scene05 = new ScrollMagic.Scene({
  duration: SCENE_5_LEN,
  triggerHook: 1,
  offset: SCENE_1_LEN + SCENE_2_LEN + SCENE_3_LEN + SCENE_4_LEN,
})
  .on("enter", () => (delta = scene05.duration() / tweenScene5.duration()))
  .setPin(".section-05")
  .setTween(tweenScene5)
  .addTo(controller);

const tweenScene6 = new TimelineLite();

tweenScene6
  .to({}, 0, {
    onReverseComplete: () => {
      delta = scene05.duration() / tweenScene5.duration();
      transitionReverse(1, CROSS_FADE_IMAGE);
    },
  })
  .to([".section-06 .title-1", ".section-06 .text-1"], CROSS_FADE_TEXT, {
    onStart: transition,
    autoAlpha: 1,
    ease: Power1.easeIn,
  })
  .to({}, 0, {
    onReverseCompleteParams: [1, CROSS_FADE_TEXT],
    onReverseComplete: transitionReverse,
  })
  .to([".section-06 .soap-macro"], CROSS_FADE_IMAGE, {
    onStart: transition,
    autoAlpha: 1,
    ease: Power1.easeIn,
  })
  .to({}, 1, {
    onReverseCompleteParams: [1, CROSS_FADE_IMAGE],
    onReverseComplete: transitionReverse,
  })
  .to(".section-06 .soap-macro-copy", TRANSFORM, {
    onStartParams: [1, TRANSFORM + 0.2],
    onStart: transition,
    top: isMobile ? "+=200" : "+=150",
    ease: Power2.easeInOut,
  })
  .to(
    ".section-06 .arrow",
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  )
  .to(
    ".section-06 .soap-macro-copy",
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 0,
      ease: Power1.easeOut,
    },
    "<+0.2"
  )
  .to(
    ".section-06 .soap-micro",
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  )
  .to({}, 1, {
    onReverseCompleteParams: [1, TRANSFORM + 0.2],
    onReverseComplete: transitionReverse,
  })
  .to(
    [
      ".section-06 .blue-macro",
      ".section-06 .blue-micro",
      ".section-06 .label-1",
    ],
    CROSS_FADE_IMAGE,
    {
      onStart: transition,
      autoAlpha: 1,
      ease: Power1.easeIn,
    }
  )
  .to({}, 1, {
    onReverseCompleteParams: [1, CROSS_FADE_IMAGE],
    onReverseComplete: transitionReverse,
  })
  .to(
    [
      ".section-06 .red-macro",
      ".section-06 .red-micro",
      ".section-06 .label-2",
    ],
    CROSS_FADE_IMAGE,
    {
      onStart: transition,
      autoAlpha: 1,
      ease: Power1.easeIn,
    }
  )
  .to({}, 1, {
    onReverseCompleteParams: [1, CROSS_FADE_IMAGE],
    onReverseComplete: transitionReverse,
  })
  .to([".section-06 .shot-1", ".section-06 .text-1"], CROSS_FADE_IMAGE, {
    onStart: transition,
    autoAlpha: 0,
    ease: Power1.easeOut,
  })
  .to(
    [".section-06 .lottie-hand-wash", ".section-06 .text-2"],
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  )
  .to(
    [".section-06 .lottie-virus"],
    CROSS_FADE_IMAGE,
    {
      autoAlpha: isMobile ? 0 : 1,
      ease: Power1.easeIn,
    },
    "<"
  )
  .to({}, isMobile ? 1 : 0, {
    onReverseCompleteParams: [1, CROSS_FADE_IMAGE],
    onReverseComplete: transitionReverse,
  })
  .to([".section-06 .text-2"], isMobile ? CROSS_FADE_IMAGE : 0, {
    onStart: transition,
    autoAlpha: isMobile ? 0 : 1,
    ease: Power1.easeOut,
  })
  .to(
    [".section-06 .lottie-virus"],
    isMobile ? CROSS_FADE_IMAGE : 0,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  )
  .to(2, {
    onStart: () => {
      lottieHandWashAnimation.play();
      lottieVirusAnimation.play();
    },
    onReverseComplete: () => {
      lottieHandWashAnimation.stop();
      lottieVirusAnimation.stop();
      transitionReverse(1, isMobile ? CROSS_FADE_IMAGE : 0);
    },
  })
  .to(".section-06", CROSS_FADE_IMAGE, {
    onStart: () => {
      lottieHandWashAnimation.stop();
      lottieVirusAnimation.stop();
      transition(1, CROSS_FADE_IMAGE);
    },
    autoAlpha: 0,
    ease: Power1.easeOut,
  })
  .to(
    ".section-07",
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  );

const scene06 = new ScrollMagic.Scene({
  duration: SCENE_6_LEN,
  triggerHook: 1,
  offset: SCENE_1_LEN + SCENE_2_LEN + SCENE_3_LEN + SCENE_4_LEN + SCENE_5_LEN,
})
  .on("enter", () => (delta = scene06.duration() / tweenScene6.duration()))
  .setPin(".section-06")
  .setTween(tweenScene6)
  .addTo(controller);

const tweenScene7 = new TimelineLite();

tweenScene7
  .to({}, 0, {
    onReverseComplete: () => {
      delta = scene06.duration() / tweenScene6.duration();
      transitionReverse(1, CROSS_FADE_IMAGE);
    },
  })
  .to([".section-07 .vaccination"], CROSS_FADE_IMAGE, {
    onStart: transition,
    autoAlpha: 1,
    ease: Power1.easeIn,
  })
  .to(
    [".section-07 .title-1", ".section-07 .text-1"],
    CROSS_FADE_TEXT,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  )
  .to({}, 1, {
    onReverseCompleteParams: [1, CROSS_FADE_IMAGE],
    onReverseComplete: transitionReverse,
  })
  .to(".section-07 .text-1", CROSS_FADE_TEXT, {
    onStart: transition,
    autoAlpha: 0,
    ease: Power1.easeOut,
  })
  .to(".section-07 .text-2", CROSS_FADE_TEXT, {
    autoAlpha: 1,
    ease: Power1.easeOut,
  })
  .to({}, 2, {
    onReverseCompleteParams: [1, CROSS_FADE_TEXT],
    onReverseComplete: transitionReverse,
  })
  .to(".section-07", CROSS_FADE_IMAGE, {
    autoAlpha: 0,
    ease: Power1.easeOut,
  })
  .to(
    ".section-08",
    CROSS_FADE_IMAGE,
    {
      autoAlpha: 1,
      ease: Power1.easeIn,
    },
    "<"
  );

const scene07 = new ScrollMagic.Scene({
  duration: SCENE_7_LEN,
  triggerHook: 1,
  offset:
    SCENE_1_LEN +
    SCENE_2_LEN +
    SCENE_3_LEN +
    SCENE_4_LEN +
    SCENE_5_LEN +
    SCENE_6_LEN,
})
  .on("enter", () => (delta = scene07.duration() / tweenScene7.duration()))
  .setPin(".section-07")
  .setTween(tweenScene7)
  .addTo(controller);

let last_known_scroll_position = 0;
let cur_scroll_position = 0;
let ticking = false;
let activeScrollTween = null;
let skip = 200;

const gsapScroll = (duration, yPos, isRelative) => {
  activeScrollTween = gsap.to(window, {
    duration,
    scrollTo: `${isRelative ? "+=" : ""}${delta * yPos}`,
  });
};

$(window).scroll(function (e) {
  if ($(this).scrollTop() > 50) {
    $("#logo").addClass("small");
  } else {
    $("#logo").removeClass("small");
  }
  cur_scroll_position = window.scrollY;
  if (Math.abs(cur_scroll_position - last_known_scroll_position) > skip) {
    activeScrollTween && activeScrollTween.kill();
    handleSroll = () => null;
    setTimeout(() => (handleSroll = gsapScroll));
  }
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleProgress();
      ticking = false;
      last_known_scroll_position = cur_scroll_position;
    });
    ticking = true;
  }
});

function handleProgress() {
  if (isMobile) {
    gsap.set(".scrollbar-down-fg", {
      width: `${100 * (controller.scrollPos() / totalLen)}%`,
    });
  } else {
    gsap.set(".scrollbar-down-fg", {
      height: `${100 * (controller.scrollPos() / totalLen)}%`,
    });
    gsap.set(".scrollbar-arrow", {
      top: `${100 * (controller.scrollPos() / totalLen)}%`,
    });
  }
}

let handleSroll = () => null;
// to make sure the module is setup only after page loads and auto scroll is complete
function handleScrollSetup() {
  window.requestAnimationFrame(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    handleSroll = gsapScroll;
    skip = Number(urlParams.get("skip") ?? skip);
  });
  window.removeEventListener("scroll", handleScrollSetup);
}

function transition(duration = 1, yPos = this.duration(), isRelative = true) {
  const tween = this;
  handleSroll(duration, yPos, isRelative);
}

function transitionReverse(
  duration = 1,
  yPos = this.duration(),
  isRelative = true
) {
  const tween = this;
  handleSroll(duration, -yPos, isRelative);
}

window.addEventListener("scroll", handleScrollSetup);

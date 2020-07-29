/* Logo */
$(window).scroll(function () {
  if ($(this).scrollTop() > 50) {
    $('#logo').addClass('small');
  } else {
    $('#logo').removeClass('small');
  }
});

// Virus Spin

const SPIN_TIME = 20;

TweenLite.to('.spin-normal', SPIN_TIME, {
  rotation: 360,
  ease: Linear.easeNone,
  repeat: -1,
});
TweenLite.to('.spin-slow', SPIN_TIME / 0.6, {
  rotation: 360,
  ease: Linear.easeNone,
  repeat: -1,
});
TweenLite.to('.spin-slower', SPIN_TIME / 0.3, {
  rotation: 360,
  ease: Linear.easeNone,
  repeat: -1,
});

const TRANSLATION_TIME = 2;
const TRAVEL_DISTANCE = 50;

TweenLite.to('.virus-primary', TRANSLATION_TIME, {
  translateY: -TRAVEL_DISTANCE,
  ease: Linear.easeNone,
  repeat: -1,
  yoyo: true,
});
TweenLite.to('.virus-secondary', TRANSLATION_TIME, {
  translateY: -TRAVEL_DISTANCE * 0.8,
  ease: Linear.easeNone,
  repeat: -1,
  yoyo: true,
});
TweenLite.to('.virus-tertiary', translateNormalTime, {
  translateY: -TRAVEL_DISTANCE * 0.6,
  ease: Linear.easeNone,
  repeat: -1,
  yoyo: true,
});

const tween = new TimelineLite();
tween.add(
  TweenLite.to('.section-01-virus-01', 1, {
    scale: 1.67,
  })
);

const controller = new ScrollMagic.Controller();
const scene01 = new ScrollMagic.Scene({
  triggerElement: '.scene-02-trigger',
  duration: 500,
  triggerHook: 0.3,
})
  // .setTween(tween)
  .addIndicators()
  .addTo(controller);

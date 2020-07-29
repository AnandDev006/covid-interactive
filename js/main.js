/* Logo */
$(window).scroll(function() {
  if ($(this).scrollTop() > 50) {
    $("#logo").addClass("small");
  } else {
    $("#logo").removeClass("small");
  }
});

const tween = new TimelineLite();
tween.add(
  TweenLite.to(".section-01-virus-01", 1, {
    scale: 1.67
  })
);

const controller = new ScrollMagic.Controller();
const scene01 = new ScrollMagic.Scene({
  triggerElement: ".scene-02-trigger",
  duration: 500,
  triggerHook: 0.3
})
  .setTween(tween)
  .addIndicators()
  .addTo(controller);

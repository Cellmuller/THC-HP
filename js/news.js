//gsap
$(document).ready(function () {
  var controller = new ScrollMagic.Controller();

  gsap.set(".content", { autoAlpha: 0, y: 50 });

  var tl = gsap.timeline();

  tl.staggerTo(".content", 1, { autoAlpha: 1, y: 0 }, 0.5);

  new ScrollMagic.Scene({
    triggerElement: ".content",
    reverse: false,
  })
    .setTween(tl)
    .addTo(controller);
});

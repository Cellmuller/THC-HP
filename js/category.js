$(document).ready(function () {
  var controller = new ScrollMagic.Controller();

  gsap.set(".category-item", { autoAlpha: 0, y: 50 });

  var tl = gsap.timeline();

  tl.staggerTo(".category-item", 1, { autoAlpha: 1, y: 0 }, 0.5);

  new ScrollMagic.Scene({
    triggerElement: ".category-item",
    reverse: false,
  })
    .setTween(tl)
    .addTo(controller);
});

//gsap
$(document).ready(function () {
  var controller = new ScrollMagic.Controller();
  gsap.set(".category-item", { autoAlpha: 0, y: 50 });
  var tl = gsap.timeline();
  tl.staggerTo(
    ".category-item",
    1,
    { autoAlpha: 1, y: 0, ease: "power1.out" },
    0.5
  );
  new ScrollMagic.Scene({
    triggerElement: ".category-item",
    reverse: false,
  })
    .setTween(tl)
    .addTo(controller);
});

//カルーセル
$(document).ready(function () {
  $(".carousel-area").slick({
    autoplay: true,
    autoplaySpeed: 5000,
    dots: true,
    slidesToShow: 3,
    prevArrow: false, // 前への矢印を非表示にする
    nextArrow: false, // 次への矢印を非表示にする
    responsive: [{
      breakpoint: 959,
           settings: {
                slidesToShow: 1,
           }
      }
 ]
  });
});

// $(document).ready(function () {
//   $(".carousel-area2").slick({
//     autoplay: true,
//     autoplaySpeed: 5000,
//     dots: true,
//     slidesToShow: 2,
//     prevArrow: false, // 前への矢印を非表示にする
//     nextArrow: false, // 次への矢印を非表示にする
//     responsive: [{
//       breakpoint: 959,
//            settings: {
//                 slidesToShow: 1,
//            }
//       }
//  ]
//   });
// });
$(document).ready(function(){
  $('.carousel-area2').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 959,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
});

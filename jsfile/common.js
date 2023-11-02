// ヘッダーの関連処理を初期化する関数
function initHeaderScripts() {
  // ハンバーガーメニュー
  $(".nav_toggle").click(function () {
      $(".nav_toggle, header > nav").toggleClass("active");
      $("body").toggleClass("no-scroll");
  });

  // ヘッダーアニメーション
  var tl = gsap.timeline();
  tl.from(".header-nav-text,.header-logo", {
      duration: 1,
      x: -25,
      opacity: 0,
      stagger: 0.1,
  });

  tl.from("header > div > button", {
      duration: 0.1,
      y: -25,
      opacity: 0,
      stagger: 0.3,
  });

  // ヘッダーホバー
  $("header > nav > ul > li:nth-child(1)").hover(
      function () {
          $(".hover-content,header > nav > ul > li:nth-child(1)").fadeIn();
      },
      function () {
          $(".hover-content").fadeOut();
      }
  );

  $("#categoryToggle").click(function () {
      var $categoryMenu = $("#category-menu");
      var $categoryToggle = $(this);

      $categoryMenu.slideToggle("fast", function () {
          if ($categoryMenu.is(":visible")) {
              $categoryToggle.addClass("active");
              $categoryToggle.css("position", "relative");
              $categoryToggle.append('<span class="arrow"></span>');
              $(".arrow").animate({ top: "100%" }, "fast");
          } else {
              $categoryToggle.removeClass("active");
              $(".arrow").remove();
          }
      });
  });

  $("header > div > a").hover(
      function () {
          // マウスが要素に乗った時の処理
          $(this).find(".popup").fadeIn(200);
      },
      function () {
          // マウスが要素から離れた時の処理
          $(this).find(".popup").fadeOut(200);
      }
  );
}

// ヘッダーコンポーネントの読み込み
fetch('/components/header.html') 
.then(response => response.text())
.then(html => {
  document.querySelector('#header').innerHTML = html;
  initHeaderScripts();  // ヘッダーの読み込みが完了した後に関連するJavaScriptの処理を実行
});
// ヘッダーコンポーネントの読み込み
fetch('/components/footer.html') 
.then(response => response.text())
.then(html => {
  document.querySelector('#footer').innerHTML = html;
});
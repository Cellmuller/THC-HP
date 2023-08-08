$(function () {
  $(".ac-child").css("display", "none");
  $(".ac-parent").on("click", function () {
    // openクラスをつける
    $(this).toggleClass("open", 800);
    // クリックされたac-parentの次のac-childを開閉する
    $(this).next().slideToggle();
    // 他のac-parentのopenクラスとac-childを閉じる
    // $(".ac-parent").not($(this)).removeClass("open");
    // $(".ac-parent").not($(this)).next(".ac-child").slideUp();
  });
});

// 詳しくはこちらボタン
$(function () {
  $(".more").on("click", function () {
    $(this).toggleClass("on-click");
    $(".txt-hide").slideToggle(450);
  });
});

// 個数カウント
$(function () {
  var $input = $(".number"); // カウントする箇所
  var $plus = $(".plus"); // アップボタン
  var $minus = $(".minus"); // ダウンボタン
  var $cartButtons = $(".cartIn-button"); // カートに追加するボタン
  var $totalOutput = $("#totalOutput"); // 合計料金を表示する要素
  var totals = {}; // 各商品の合計値を保持するオブジェクト

  // ロード時
  $(window).on("load", function () {
    updateTotal();
    $input.each(function () {
      number = Number($(this).val());
      if (number == 0) {
        $(this).prev($minus).prop("disabled", true);
      }
    });
  });

  // ダウンボタンクリック時
  $minus.on("click", function () {
    number = Number($(this).next($input).val());
    if (number > 0) {
      $(this)
        .next($input)
        .val(number - 1);
      if (number - 1 == 0) {
        $(this).prop("disabled", true);
      }
      $(this).next().next($plus).prop("disabled", false);
    } else {
      $(this).prop("disabled", true);
    }
    updateTotal();
  });

  // アップボタンクリック時
  $plus.on("click", function () {
    number = Number($(this).prev($input).val());
    $(this)
      .prev($input)
      .val(number + 1);
    if (number + 1 == 0) {
      $(this).prop("disabled", true);
    }
    $(this).prev().prev($minus).prop("disabled", false);
    updateTotal();
  });
  var pNumber = Number($(this).val());
  // 合計値を計算する関数
  function getTotal(buttonValue, $productItem) {
    var total = 0;
    var $input = $productItem.find(".number");
    $input.each(function (index) {
      var number = Number($(this).val());
      var price = $productItem.data("price");
      if ($(this).data("value") === buttonValue) {
        total += number * price;
      }
    });
    return total;
  }

  // カートに追加するボタンクリック時
  $cartButtons.on("click", function () {
    var $productItem = $(this).closest(".product-item");
    var $input = $productItem.find(".number");
    var $totalOutput = $productItem.find(".total-output");
    var buttonValue = $(this).data("value");
    var total = getTotal(buttonValue, $productItem);

    // 合計値を更新
    if (totals[buttonValue]) {
      totals[buttonValue] += total;
    } else {
      totals[buttonValue] = total;
    }

    // 合計値を表示
    $totalOutput.text(totals[buttonValue]);
    // 全商品の合計値を計算
    var overallTotal = 0;
    for (var key in totals) {
      overallTotal += totals[key];
    }

    // 合計値を表示
    $totalOutput.text(overallTotal.toLocaleString());

    $("#price_total").val("TOTAL : " + overallTotal.toLocaleString() + "円");
    // URLにIDを追加
    var itemId = $(this).closest(".cartIn-button").data("id");

    pTotal = 0;
    $input.each(function (index) {
      var pNumber = Number($(this).val());
      pTotal += pNumber;
    });
    var itemNumber = pTotal;

    // 遷移先URLを取得
    var destinationURL = $("#addToCartButton").attr("href");

    // セット商品URLにパラメを追加
    var detailUrl = $("#detailButton").attr("href");
    var totalParam = "total=" + overallTotal;
    var paramSeparator = destinationURL.indexOf("?") !== -1 ? "&" : "?";

    // パラメを結合して新しいURLを作成
    detailUrl +=
      paramSeparator +
      totalParam +
      "&product_code[]=" +
      itemId +
      "&qty[]=" +
      itemNumber;

    if (destinationURL.indexOf("?") !== -1) {
      destinationURL = destinationURL.replace(/#.*$/, "");
      destinationURL += "&product_code[]=" + itemId + "&qty[]=" + itemNumber;
    } else {
      destinationURL = destinationURL.replace(/#.*$/, "");
      destinationURL +=
        "https://shop.tengahealthcare.com/cart?add=1&product_code[]=" +
        itemId +
        "&qty[]=" +
        itemNumber;
    }

    // 「ご購入手続きへ」ボタンのhref属性を変更
    $("#addToCartButton").attr("href", destinationURL);
    $("#confirmAgeButton").attr(
      "onclick",
      "location.href='" + destinationURL + "';"
    );

    // 「セット商品はこちら」ボタンのhref属性を変更
    $("#detailButton").attr("href", detailUrl);
  });

  // 合計値を更新する関数
  function updateTotal() {
    var overallTotal = 0;
    for (var key in totals) {
      overallTotal += totals[key];
    }
    $totalOutput.text(overallTotal);
  }
});

// tab切り替え
$(function () {
  $(".tab").on("click", function () {
    $(".tab, .panel").removeClass("active");

    $(this).addClass("active");

    var index = $(".tab").index(this);
    $(".panel").eq(index).addClass("active");
  });
});

// 年齢確認モーダル
// クッキーをチェックし、モーダルウィンドウを表示するかどうかを判断
function checkAgeConfirmation() {
  if (!getCookie("ageConfirmed")) {
    displayModal();
  } else {
    // クッキーがある場合、直接カートページに遷移
    window.location.href = "https://shop.tengahealthcare.com/cart";
  }
}

// クッキーをセット
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// クッキーの値を取得
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// モーダルウィンドウを表示
function displayModal() {
  var modal = document.getElementById("ageModal");
  modal.style.display = "block";
}

// モーダルウィンドウを非表示
function closeModal() {
  var modal = document.getElementById("ageModal");
  modal.style.display = "none";
}

// 年齢確認ボタンがクリックされた場合にクッキーをセットし、モーダルウィンドウを非表示
document
  .getElementById("confirmAgeButton")
  .addEventListener("click", function () {
    setCookie("ageConfirmed", true, 1); // 1日間有効なクッキーをセット
    closeModal();
    // 「ご購入手続きへ」ボタンにURLを付与
    document.getElementById("addToCartButton").href =
      "https://shop.tengahealthcare.com/cart";
  });

// カート追加ボタンがクリックされた場合に年齢確認モーダルを表示
document
  .getElementById("addToCartButton")
  .addEventListener("click", function () {
    var ageConfirmed = getCookie("ageConfirmed");
    var currentHref = $("#addToCartButton").attr("href");
  //   if (ageConfirmed) {
  //     // クッキーがある場合はそのままカートページに遷移
  //     window.location.href = "#";
  //   } else {
  //     // クッキーがない場合はモーダルウィンドウを表示
  //     displayModal();
  //     // 「ご購入手続きへ」ボタンのリンクを無効化
  //     document.getElementById("addToCartButton").href = "#";
  //   }
  // });
  if (ageConfirmed && currentHref.startsWith("https://")) {
    window.location.href = currentHref; // カートに移動
  } else if (ageConfirmed && currentHref === "#") {
    window.location.href = "#product-area"; // ページ内リンクに移動
  } else if(!ageConfirmed && currentHref.startsWith("https://")) {
    // e.preventDefault(); // ページ遷移をキャンセル
    displayModal(); // モーダル表示
    document.getElementById("addToCartButton").href = "#";
  }
});

// モーダル内のYESボタンにリンクを付与
document
  .getElementById("confirmAgeButton")
  .addEventListener("click", function () {
    // クッキーをセット
    setCookie("ageConfirmed", true, 1); // 1日間有効なクッキーをセット
    // モーダルウィンドウを非表示
    closeModal();
  });

// モーダルウィンドウ内のYESボタンがクリックされた際の処理
document
  .getElementById("confirmAgeButton")
  .addEventListener("click", function () {});

// CLOSEボタンをクリックしたときの処理
var closeButton = document.querySelector(".closeBtn");

closeButton.addEventListener("click", function () {
  var modal = document.getElementById("ageModal");
  modal.style.display = "none";
});

// 「CLOSE」リンクをクリックしたときの処理
var closeLink = document.getElementById("modal-close");

closeLink.addEventListener("click", function () {
  var modal = document.getElementById("ageModal");
  modal.style.display = "none";
});

//gsap
$(document).ready(function () {
  var controller = new ScrollMagic.Controller();

  gsap.set(".product-item", { autoAlpha: 0, y: 50 });

  var tl = gsap.timeline();

  tl.staggerTo(".product-item", 1, { autoAlpha: 1, y: 0 }, 0.5);

  new ScrollMagic.Scene({
    triggerElement: ".product-item",
    reverse: false,
  })
    .setTween(tl)
    .addTo(controller);
});
$(document).ready(function () {
  $(".slick-carousel").slick({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    adaptiveHeight: true,
  });
});

$(document).on('click', 'a[href^="#product-area"]', function(e) {
  // デフォルトのイベントを無効化
  e.preventDefault();

  // アンカーの値を取得
  var target = $(this.hash);
  if (target.length === 0) target = $('html');

  // スクロールアニメーション
  $('html, body').animate({
    scrollTop: target.offset().top
  }, 1000);
});

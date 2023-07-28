var areaLinks = {
  1: "./store.html#hokkaido",
  2: "https://www.pref.aomori.lg.jp/",
  3: "https://www.pref.iwate.lg.jp/",
  4: "https://www.pref.miyagi.lg.jp/",
};


var d = new jpmap.japanMap(document.getElementById("my-map"), {
  areas: [
    { code: 1, name: "北海道", color: "#106198", hoverColor: "#b3b2ee" },
    { code: 2, name: "青森", color: "#1578af", hoverColor: "#98b9ff" },
    { code: 3, name: "岩手", color: "#1578af", hoverColor: "#98b9ff" },
    { code: 4, name: "宮城", color: "#1578af", hoverColor: "#98b9ff" },
    { code: 5, name: "秋田", color: "#1578af", hoverColor: "#98b9ff" },
    { code: 6, name: "山形", color: "#1578af", hoverColor: "#98b9ff" },
    { code: 7, name: "福島", color: "#1578af", hoverColor: "#98b9ff" },
    { code: 8, name: "茨城", color: "#0b97cc", hoverColor: "#b7e5f4" },
    { code: 9, name: "栃木", color: "#0b97cc", hoverColor: "#b7e5f4" },
    { code: 10, name: "群馬", color: "#0b97cc", hoverColor: "#b7e5f4" },
    { code: 11, name: "埼玉", color: "#0b97cc", hoverColor: "#b7e5f4" },
    { code: 12, name: "千葉", color: "#0b97cc", hoverColor: "#b7e5f4" },
    { code: 13, name: "東京", color: "#0b97cc", hoverColor: "#b7e5f4" },
    { code: 14, name: "神奈川", color: "#0b97cc", hoverColor: "#b7e5f4" },
    { code: 15, name: "新潟", color: "#2ebcce", hoverColor: "#aceebb" },
    { code: 16, name: "富山", color: "#2ebcce", hoverColor: "#aceebb" },
    { code: 17, name: "石川", color: "#2ebcce", hoverColor: "#aceebb" },
    { code: 18, name: "福井", color: "#2ebcce", hoverColor: "#aceebb" },
    { code: 19, name: "山梨", color: "#2ebcce", hoverColor: "#aceebb" },
    { code: 20, name: "長野", color: "#2ebcce", hoverColor: "#aceebb" },
    { code: 21, name: "岐阜", color: "#2ebcce", hoverColor: "#aceebb" },
    { code: 22, name: "静岡", color: "#2ebcce", hoverColor: "#aceebb" },
    { code: 23, name: "愛知", color: "#2ebcce", hoverColor: "#aceebb" },
    { code: 24, name: "三重", color: "#63d5ce", hoverColor: "#fff19c" },
    { code: 25, name: "滋賀", color: "#63d5ce", hoverColor: "#fff19c" },
    { code: 26, name: "京都", color: "#63d5ce", hoverColor: "#fff19c" },
    { code: 27, name: "大阪", color: "#63d5ce", hoverColor: "#fff19c" },
    { code: 28, name: "兵庫", color: "#63d5ce", hoverColor: "#fff19c" },
    { code: 29, name: "奈良", color: "#63d5ce", hoverColor: "#fff19c" },
    { code: 30, name: "和歌山", color: "#63d5ce", hoverColor: "#fff19c" },
    { code: 31, name: "鳥取", color: "#62c3e4", hoverColor: "#ffe0a3" },
    { code: 32, name: "島根", color: "#62c3e4", hoverColor: "#ffe0a3" },
    { code: 33, name: "岡山", color: "#62c3e4", hoverColor: "#ffe0a3" },
    { code: 34, name: "広島", color: "#62c3e4", hoverColor: "#ffe0a3" },
    { code: 35, name: "山口", color: "#62c3e4", hoverColor: "#ffe0a3" },
    { code: 36, name: "徳島", color: "#88d0e9", hoverColor: "#ffbb9c" },
    { code: 37, name: "香川", color: "#88d0e9", hoverColor: "#ffbb9c" },
    { code: 38, name: "愛媛", color: "#88d0e9", hoverColor: "#ffbb9c" },
    { code: 39, name: "高知", color: "#88d0e9", hoverColor: "#ffbb9c" },
    { code: 40, name: "福岡", color: "#a4e0ea", hoverColor: "#ffbdbd" },
    { code: 41, name: "佐賀", color: "#a4e0ea", hoverColor: "#ffbdbd" },
    { code: 42, name: "長崎", color: "#a4e0ea", hoverColor: "#ffbdbd" },
    { code: 43, name: "熊本", color: "#a4e0ea", hoverColor: "#ffbdbd" },
    { code: 44, name: "大分", color: "#a4e0ea", hoverColor: "#ffbdbd" },
    { code: 45, name: "宮崎", color: "#a4e0ea", hoverColor: "#ffbdbd" },
    { code: 46, name: "鹿児島", color: "#a4e0ea", hoverColor: "#ffbdbd" },
    { code: 47, name: "沖縄", color: "#47a3b2", hoverColor: "#f5c9ff" },
  ],

  
  showsPrefectureName: true,
  width: 1000,
  movesIslands: true,
  borderLineColor: "#3c3c3c",
  lang: "ja",
  fontSize: 11,
  font: "serif",
  prefectureNameType: "short",
  onSelect: function (data) {
    location.href = areaLinks[data.area.code];
  },
});


document.addEventListener("DOMContentLoaded", function () {
  var $tab__link = $(".tab__link");
  var $tab_body_item = $(".tab-body__item");
  $tab__link.on("click", function (e) {
    var target = $(e.currentTarget);
    //タブの表示非表示
    $tab__link.removeClass("on");
    target.addClass("on");
    //タブの中身の表示非表示
    var num = target.data("tab-body");
    $tab_body_item.removeClass("on");
    $(".tab-body__item--" + num).addClass("on");
  });
});

// モーダル
$(function(){
  // 変数に要素を入れる
  var open = $('.modal-open'),
    close = $('.modal-close'),
    container = $('.modal-container');

  //開くボタンをクリックしたらモーダルを表示する
  open.on('click',function(){ 
    container.addClass('active');
    return false;
  });

  //閉じるボタンをクリックしたらモーダルを閉じる
  close.on('click',function(){  
    container.removeClass('active');
  });

  //モーダルの外側をクリックしたらモーダルを閉じる
  $(document).on('click',function(e) {
    if(!$(e.target).closest('.modal-body').length) {
      container.removeClass('active');
    }
  });
});
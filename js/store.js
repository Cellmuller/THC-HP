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
    $(".sub-tab-body__item").addClass("on");
  });

  // サブタブ用のクリックリスナー
  var $sub_tab__link = $(".sub-tab__link");
  var $sub_tab_body_item = $(".sub-tab-body__item");
  $sub_tab__link.on("click", function (e) {
    var target = $(e.currentTarget);
    //サブタブの表示非表示
    $sub_tab__link.removeClass("on");
    target.addClass("on");
    //サブタブの中身の表示非表示
    var num = target.data("sub-tab-body");
    $sub_tab_body_item.removeClass("on");
    $(".sub-tab-body__item--" + num).addClass("on");
  });
});

// モーダル
$(function(){
  for (let i = 1; i <= 7; i++) {
    (function(index) { // 即時実行関数でindexとしてiを受け取る
      $(document).on('click', `.modal-open-${index}`, function() { 
        $(`.modal-container-${index}`).addClass('active'); 
        return false;
      });
    })(i); // iを渡す
  }

  // 閉じるボタンをクリックしたらモーダルを閉じる
  $(document).on('click', '.modal-close', function(){  
    $('.modal-container').removeClass('active');
  });

  // モーダルの外側をクリックしたらモーダルを閉じる
  $(document).on('click', function(e) {
    if(!$(e.target).closest('.modal-body').length) {
      $('.modal-container').removeClass('active');
    }
  });
});




document.addEventListener("DOMContentLoaded", function() {
  fetch('sample.json')
    .then(response => response.json())
    .then(jsonData => {
      for (let index = 1; index <= 7; index++) { // 地方の数が8であると仮定
        const regionDiv = document.querySelector(`.tab-body__item--${index}`);
        if (!regionDiv) continue;

        const matchingRegionData = jsonData.find(region => region.id === index);


        if (!matchingRegionData) {
          const noDataDiv = document.createElement('div');
          noDataDiv.textContent = '0件';
          regionDiv.appendChild(noDataDiv);
          continue;
        }

        const subTabBody = document.createElement('div');
        subTabBody.className = 'sub-tab-body';
        regionDiv.appendChild(subTabBody);
        // 関東のタブをデフォルトで選択状態にする
        const kantoSubTabBodies = document.querySelectorAll('.tab-body__item--3 .sub-tab-body__item');
        kantoSubTabBodies.forEach(subTab => {
          subTab.classList.add('on');
        });

        matchingRegionData.prefectures.forEach(prefData => {
          const prefDiv = document.createElement('div');
          prefDiv.className = 'sub-tab-body__item';

          const h2 = document.createElement('h2');
          h2.textContent = prefData.prefecture;
          prefDiv.appendChild(h2);

          prefData.stores.forEach(store => {
            const ul = document.createElement('ul');
            ul.className = 'card';

            const liName = document.createElement('li');
            const aName = document.createElement('a');
            aName.href = store.url;
            const imgName = document.createElement('img');
            imgName.src = './image/clinic-icon.png';
            imgName.className = 'card-icon';
            aName.appendChild(imgName);
            aName.appendChild(document.createTextNode(store.name));
            liName.appendChild(aName);
            ul.appendChild(liName);

            const divTags = document.createElement('div');
            store.tags.forEach((tag, index) => {
              const button = document.createElement('button');
              button.className = `modal-open-${index + 1}`;
              button.textContent = tag;
              divTags.appendChild(button);
            });
            liName.appendChild(divTags);

            const liLocation = document.createElement('li');
            const aLocation = document.createElement('a');
            aLocation.href = store.map_url;
            const imgLocation = document.createElement('img');
            imgLocation.src = './image/location-icon.png';
            imgLocation.className = 'card-icon card-icon-center';
            aLocation.appendChild(imgLocation);
            aLocation.appendChild(document.createTextNode(store.location));
            liLocation.appendChild(aLocation);
            ul.appendChild(liLocation);

            prefDiv.appendChild(ul);
          });

          subTabBody.appendChild(prefDiv);
        });
      }
    })
    .catch(error => {
      console.error('Error loading JSON:', error);
    });
});

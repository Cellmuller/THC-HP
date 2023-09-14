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
  // 変数に要素を入れる
  var open1 = $('.modal-open-1'),
    open2 = $('.modal-open-2'),
    open3 = $('.modal-open-3'),
    open4 = $('.modal-open-4'),
    open5 = $('.modal-open-5'),
    open6 = $('.modal-open-6'),
    open7 = $('.modal-open-7'),
    close = $('.modal-close'),
    container1 = $('.modal-container-1'),
    container2 = $('.modal-container-2'),
    container3 = $('.modal-container-3'),
    container4 = $('.modal-container-4'),
    container5 = $('.modal-container-5'),
    container6 = $('.modal-container-6'),
    container7 = $('.modal-container-7');

  // ボタン1をクリックしたらモーダル1を表示する
  open1.on('click', function(){ 
    container1.addClass('active');
    return false;
  });

  // ボタン2をクリックしたらモーダル2を表示する
  open2.on('click', function(){ 
    container2.addClass('active');
    return false;
  });

  // ボタン3をクリックしたらモーダル3を表示する
  open3.on('click', function(){ 
    container3.addClass('active');
    return false;
  });

  // ボタン4をクリックしたらモーダル4を表示する
  open4.on('click', function(){ 
    container4.addClass('active');
    return false;
  });

  // ボタン5をクリックしたらモーダル5を表示する
  open5.on('click', function(){ 
    container5.addClass('active');
    return false;
  });

  // ボタン6をクリックしたらモーダル6を表示する
  open6.on('click', function(){ 
    container6.addClass('active');
    return false;
  });

  // ボタン7をクリックしたらモーダル7を表示する
  open7.on('click', function(){ 
    container7.addClass('active');
    return false;
  });

  // 閉じるボタンをクリックしたらモーダルを閉じる
  close.on('click', function(){  
    container1.removeClass('active');
    container2.removeClass('active');
    container3.removeClass('active');
    container4.removeClass('active');
    container5.removeClass('active');
    container6.removeClass('active');
    container7.removeClass('active');
  });

  // モーダルの外側をクリックしたらモーダルを閉じる
  $(document).on('click', function(e) {
    if(!$(e.target).closest('.modal-body').length) {
      container1.removeClass('active');
      container2.removeClass('active');
      container3.removeClass('active');
      container4.removeClass('active');
      container5.removeClass('active');
      container6.removeClass('active');
      container7.removeClass('active');
    }
  });
});

// document.addEventListener("DOMContentLoaded", function() {
//   fetch('sample.json')
//   .then(response => response.json())
//   .then(jsonData => {
    
//     jsonData.forEach((regionData, index) => {
      
//       // このindexはJSONデータの順序に依存するので注意
//       const tabBodyItem = document.querySelector(`.tab-body__item--${index + 1}`);
      
//       regionData.prefectures.forEach(prefData => {
        
//         // 都道府県のコンテナ
//         const prefDiv = document.createElement('div');
//         prefDiv.className = 'sub-tab-body__item';

//         // 都道府県のタイトル
//         const h2 = document.createElement('h2');
//         h2.textContent = prefData.prefecture;
//         prefDiv.appendChild(h2);

//         // 各店舗の情報
//         prefData.stores.forEach(store => {
          
//           const ul = document.createElement('ul');
//           ul.className = 'card';

//           const liName = document.createElement('li');
//           const aName = document.createElement('a');
//           aName.href = store.url;
//           const imgName = document.createElement('img');
//           imgName.src = './images/clinic-icon.png';
//           imgName.className = 'card-icon';
//           aName.appendChild(imgName);
//           aName.appendChild(document.createTextNode(store.name));
//           liName.appendChild(aName);
//           ul.appendChild(liName);

//           const divTags = document.createElement('div');
//           store.tags.forEach(tag => {
//             const button = document.createElement('button');
//             button.className = 'modal-open-7';
//             button.textContent = tag;
//             divTags.appendChild(button);
//           });
//           liName.appendChild(divTags);

//           const liLocation = document.createElement('li');
//           const aLocation = document.createElement('a');
//           aLocation.href = store.map_url;
//           const imgLocation = document.createElement('img');
//           imgLocation.src = './images/location-icon.png';
//           imgLocation.className = 'card-icon card-icon-center';
//           aLocation.appendChild(imgLocation);
//           aLocation.appendChild(document.createTextNode(store.location));
//           liLocation.appendChild(aLocation);
//           ul.appendChild(liLocation);

//           prefDiv.appendChild(ul);
//         });

//         tabBodyItem.appendChild(prefDiv);
//       });
      
//     });
    
//   })
//   .catch(error => {
//     console.error('Error loading JSON:', error);
//   });
// });


document.addEventListener("DOMContentLoaded", function() {
  fetch('sample.json')
    .then(response => response.json())
    .then(jsonData => {
      for (let index = 1; index <= 8; index++) { // 地方の数が8であると仮定
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
            imgName.src = './images/clinic-icon.png';
            imgName.className = 'card-icon';
            aName.appendChild(imgName);
            aName.appendChild(document.createTextNode(store.name));
            liName.appendChild(aName);
            ul.appendChild(liName);

            const divTags = document.createElement('div');
            store.tags.forEach(tag => {
              const button = document.createElement('button');
              button.className = 'modal-open-7';
              button.textContent = tag;
              divTags.appendChild(button);
            });
            liName.appendChild(divTags);

            const liLocation = document.createElement('li');
            const aLocation = document.createElement('a');
            aLocation.href = store.map_url;
            const imgLocation = document.createElement('img');
            imgLocation.src = './images/location-icon.png';
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

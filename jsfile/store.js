$(function(){
    var open = $('.modal-open'),
        container = $('.modal-container'),
        close = $('.modal-close'),
        search = $('.search-button');
    open.on('click', function(){
        container.addClass('active');
        return false;
    });
    close.on('click', function(){
        container.removeClass('active');
    });
    search.on('click', function(){
        container.removeClass('active');
    });
    $(document).on('click', function(e){
        if(!$(e.target).closest('.modal-body').length) {
            container.removeClass('active');
        }
    });
});



document.addEventListener("DOMContentLoaded", function () {
    var jsonData; // JSONデータを格納する変数
    var regionChoice = document.querySelectorAll(".modal-open");
    var selectPrefecture = document.querySelector(".modal-content select.prefecture-select");
    var selectCity = document.querySelector(".modal-content select.city-select");
    var searchButton = document.querySelector(".search-button");
    var resultsContainer = document.querySelector(".results-container");

    // JSONデータの取得
    fetch("sample.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            jsonData = data;
            initializePage();
        })
        .catch(function (error) {
            console.error("Fetch error:", error);
        });

        
    // ページの初期化
    function initializePage() {
        // 地域選択のイベントハンドラー
        regionChoice.forEach(function (region) {
            region.addEventListener("click", function () {
                var regionName = this.textContent;
                var regionData = jsonData.find(function (regionData) {
                    return regionData.name === regionName;
                });

                selectPrefecture.innerHTML = '<option>選択してください</option>';
                regionData.prefectures.forEach(function (prefectureData) {
                    var option = document.createElement("option");
                    option.value = prefectureData.prefecture;
                    option.textContent = prefectureData.prefecture;
                    selectPrefecture.appendChild(option);
                });

                updateCities(regionData.prefectures[0]);
            });
        });

        // 都道府県選択のイベントハンドラー
        selectPrefecture.addEventListener("change", function () {
            var selectedPrefecture = this.value;
            var prefectureData = jsonData.flatMap(region => region.prefectures).find(prefecture => prefecture.prefecture === selectedPrefecture);
            updateCities(prefectureData);
        });

        // 検索ボタンのイベントハンドラー
        searchButton.addEventListener("click", function () {
            var selectedCity = selectCity.value; // ユーザーが選択した市区町村
            var selectedPrefecture = selectPrefecture.value; // ユーザーが選択した都道府県
            var storesToDisplay = [];
        
            jsonData.forEach(function (region) {
                region.prefectures.forEach(function (prefecture) {
                    // 都道府県が選択されているか、または市区町村のみが選択されている場合にフィルタリング
                    if (prefecture.prefecture === selectedPrefecture || selectedPrefecture === '選択してください') {
                        prefecture.municipalities.forEach(function (municipality) {
                            if (municipality.municipality === selectedCity || selectedCity === '選択してください') {
                                storesToDisplay = storesToDisplay.concat(municipality.stores);
                            }
                        });
                    }
                });
            });
        
            // 結果の表示
            displayResults(storesToDisplay);
        });
        

        // SP版の初期化コード
        initializeSPVersion();
    }

    // 市区町村の更新関数
    function updateCities(prefectureData) {
        selectCity.innerHTML = '<option>選択してください</option>';
        prefectureData.municipalities.forEach(function (municipalityData) {
            var option = document.createElement("option");
            option.value = municipalityData.municipality;
            option.textContent = municipalityData.municipality;
            selectCity.appendChild(option);
        });
    }

    // 結果の表示関数
    function displayResults(stores) {
        resultsContainer.innerHTML = '';
        stores.forEach(function(store) {
            var cardElement = document.createElement("ul");
            cardElement.className = "card";
            // 店舗名とリンクを含むli要素を作成
            var nameLi = document.createElement("li");
            var nameLink = document.createElement("a");
            nameLink.setAttribute("href", store.url);
            nameLink.innerHTML = '<img src="./image/clinic-icon.png" class="card-icon">' + store.name;
            nameLi.appendChild(nameLink);
            cardElement.appendChild(nameLi);
            // ボタンを含むdiv要素を作成
            var buttonDiv = document.createElement("div");
            store.tags.forEach(function(tag) {
                var button = document.createElement("button");
                button.className = "modal-open"; 
                button.textContent = tag;
                buttonDiv.appendChild(button);
            });
            nameLi.appendChild(buttonDiv);
            // 位置情報とリンクを含むli要素を作成
            var locationLi = document.createElement("li");
            var locationLink = document.createElement("a");
            locationLink.setAttribute("href", store.map_url);
            locationLink.innerHTML = '<img src="./image/location-icon.png" class="card-icon card-icon-center">' + store.location;
            locationLi.appendChild(locationLink);
            cardElement.appendChild(locationLi);
            // 最終的にcardをresultsContainerに追加
            resultsContainer.appendChild(cardElement);
        });
        if (stores.length === 0) {
            resultsContainer.innerHTML = '該当する店舗が見つかりません。';
        }
    }

    // SP版の初期化関数
    function initializeSPVersion() {
        $(".ac-child").css("display", "none");
        $(".ac-parent").on("click", function() {
            $(".ac-parent").not(this).removeClass("open").next(".ac-child").slideUp();
            $(this).toggleClass("open");
            var regionName = $(this).data("region");
            var $childElem = $('#region-' + regionName + ' .ac-child');
            if (!$childElem.is(':visible')) {
                $childElem.slideToggle(300);
            }
            displayPrefectureList(regionName, $childElem);
        });

        $(document).on('click', '.ac-child li', function(e) {
            e.stopPropagation();
            var prefectureName = $(this).text();
            loadAndDisplayShops(prefectureName);
        });

        function displayPrefectureList(regionName, $childElem) {
            var regionData = jsonData.find(function(d) {
                return d.name === regionName;
            });
            if (regionData) {
                var $prefecturesList = $('<ul></ul>');
                regionData.prefectures.forEach(function(prefecture) {
                    $prefecturesList.append($('<li></li>').text(prefecture.prefecture));
                });
                $childElem.empty().append($prefecturesList);
            }
        }

        function loadAndDisplayShops(prefectureName) {
            var prefectureData = jsonData.flatMap(d => d.prefectures).find(p => p.prefecture === prefectureName);
            if (prefectureData) {
                $('#results').empty();
                prefectureData.municipalities.forEach(function(municipality) {
                    municipality.stores.forEach(function(store) {
                        // カードの構造を作成
                        var $card = $('<ul>').addClass('card');
        
                        // クリニック情報とタグボタンの生成
                        var $clinicItem = $('<li>').append(
                            $('<a>').attr('href', store.url).append(
                                $('<img>').attr('src', './image/clinic-icon.png').addClass('card-icon'),
                                store.name
                            )
                        );
        
                        var $tagsDiv = $('<div>');
                        $.each(store.tags, function(k, tag) {
                            var buttonClass = "modal-open-" + (k + 1);
                            $tagsDiv.append($('<button>').addClass(buttonClass).text(tag));
                        });
                        $clinicItem.append($tagsDiv);
                        $card.append($clinicItem);
        
                        // 位置情報
                        var $locationItem = $('<li>').append(
                            $('<a>').attr('href', store.map_url).append(
                                $('<img>').attr('src', './image/location-icon.png').addClass('card-icon card-icon-center'),
                                store.location
                            )
                        );
                        $card.append($locationItem);
        
                        // カードを結果エリアに追加
                        $('#results').append($card);
                    });
                });
            }
        }
        
    }
    $(document).ready(function() {
        $('.keyword-search-button').on('click', function() {
            var keyword = $('.search-area-sp input[type="text"]').val().toLowerCase();
    
            // JSON ファイルを読み込み
            $.getJSON('sample.json', function(data) {
                var filteredStores = [];
    
                // JSON データをフィルタリング
                $.each(data, function(i, region) {
                    $.each(region.prefectures, function(j, prefecture) {
                        $.each(prefecture.municipalities, function(k, municipality) {
                            $.each(municipality.stores, function(l, store) {
                                // キーワードが店舗名に含まれているかチェック
                                if (store.location.toLowerCase().indexOf(keyword) !== -1) {
                                    filteredStores.push(store);
                                }
                            });
                        });
                    });
                });
    
                // 結果を表示
                displayResults(filteredStores);
            });
             // ページ内リンクへのジャンプ
            location.href = '#results';
        });
    });
    
    
});

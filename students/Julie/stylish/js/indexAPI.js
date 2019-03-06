// eslint no-unused-vars: ["error",{"vars": "local"}]
// global catalog search campaigns

// 初始目前頁數，目前 End Point
let currPG = 0; let currEP = '';
// 輪播要用的變數
let slides = []; let dots = [];

// Connect Product List API 跟 Product Search API 
// 跟 Marketing Campaigns API 跟 Product Details API
function get(api, page) {
    // 設定一個 query string 參數叫 paging
    let params = new URLSearchParams();
    params.set('paging', `${page}`);
    // Fetch
    fetch(`https://${host}/api/1.0${api}` + params)
        .then( res => {
            return res.json();
        })
        .then( json => {
            console.log(api);
            console.log('json 結果 ' + json.data.length + ' 筆資料，' + 'json paging: ' + json.paging);
            // Loading 圖
            document.getElementById("loading").style.display = 'none';
            if (json.data.length <= 0) {
                // 如果資料小於等於 0 筆，跟客人說找不到
                document.getElementById("nothing").style.display = 'block';
            } else if (api === "/marketing/campaigns?") {
                // 如果 api 是 Marketing Campaigns API，就 render Key Visual
                renderKV(json);
                // 輪播功能
                slides = document.querySelectorAll(".slide");
                dots = document.querySelectorAll(".dot");

                dots.forEach( (dot) => {dot.addEventListener('click', currentSlide);});
            } else {
                // 不然就 render 產品出來，然後也把 paging 值存起來，換頁用。
                currEP = api;
                currPG = json.paging;
                renderPD(json);
                // 監測卷軸 & 下一頁加載（當目錄裡最後一個 Product 區塊完全進入了可視範圍，觸發加載下一頁）
                window.addEventListener('scroll', scrollEventHandler);
            }
        })
        .catch( err => {
            console.log(err);
        });
}

// 監測卷軸事件的 CallBack
const scrollEventHandler = function() {
    if (currEP === "/marketing/campaigns?") {
        // 如果是 Marketing Campaigns API，就什ㄇ都不做
    } else if(currPG !== undefined && currPG > 0 && isScrolledIntoView(document.querySelector('#row').lastChild)) {
        console.log('Request 網址: ' + currEP + 'paging=' + currPG);
        // 如果 paging 不是 undefined（代表有下一頁），
        // 而且下一頁非第 0 頁（初始畫面就是載入第 0 頁，要加載的是下一頁），
        // 而且目錄裡最後一個 Product 區塊完全進入了可視範圍，
        // 就加載下一頁
        get(currEP, currPG);
        // 然後，移除監聽（防止短短不到 0.X 秒就瘋狂觸發加載了兩～三次「同一個下一頁（例：第 2 頁加載三次、第 3 頁加載兩次）」之類的情形，下一頁只需要加載一次就好）
        unbindScrollEventHandler();
        // 不用擔心要怎麼把監聽事件加回去，重新觸發 get () 時就又會重新監聽了，
        // 因為監聽卷軸這件事就寫在 get() 裡面。
    } else {
        return;
    }
};

// 移除監聽用的函式
function unbindScrollEventHandler() {
	window.removeEventListener('scroll', scrollEventHandler);
}

// 檢查目錄裡最後一個 Product 區塊是否已完全進入可視範圍用的函式（回傳 true 或 false）
function isScrolledIntoView(el) {
    let elemTop = el.getBoundingClientRect().top;
    let elemBottom = el.getBoundingClientRect().bottom;

    let isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    return isVisible;
}

// get End Point 小精靈
function catalog(cata) {    // 分類目錄擔當
    const ep = `/products/${cata}?`;
    return get(ep, 0);
}
function search(keyword) {  // 搜尋擔當
    const ep = `/products/search?keyword=${keyword}&`;
    return get(ep, 0);
}
function campaigns() {  // Key Visual 擔當
    const ep = '/marketing/campaigns?';
    return get(ep, 0);
}
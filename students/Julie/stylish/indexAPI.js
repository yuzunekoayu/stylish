// 初始目前頁數，目前 End Point
let currPG = 0; let currEP = '';
// 伺服器名
let host = '18.214.165.31'; 
// 輪播要用的變數
let slides = []; let dots = [];

// Connect Product List API 跟 Product Search API 
// 跟 Marketing Campaigns API 跟 Product Details API
function get(api, page) {
    // 設定一個 query string 參數叫 paging
    let params = new URLSearchParams();
    params.set('paging', `${page}`);
    // Fetch
    fetch(`http://${host}/api/1.0${api}` + params)
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
                slides = document.querySelectorAll(".slide");
                dots = document.querySelectorAll(".dot");
            } else {
                // 不然就 render 產品出來，然後也把 paging 值存起來，換頁用。
                currEP = api;
                currPG = json.paging;
                renderPD(json);
            }
        })
        .catch( err => {
            console.log(err);
        })
}

// 監測卷軸位置
window.onscroll = function () {
    const docH = document.body.scrollHeight;
    const winH = window.innerHeight + window.scrollY;
    // 如果卷軸到了底部（winH 如果沒四捨五入，會有明明到底了但數值還是 < docH 的情況發生所以用了 Math.round）
    if (Math.ceil(winH) === docH) {
        if (currEP === "/marketing/campaigns?") {
            // 如果是 Marketing Campaigns API，就什ㄇ都不做
        } else if (currPG !== undefined && currPG > 0) { 
            // 如果目前的頁面在剛剛 Fetch 時，有 paging
            // 再 Fetch 一次，讓客人不用跳轉就可繼續讀取下一頁。
            console.log('Request 網址: ' + currEP + 'paging=' + currPG);
            get(currEP, currPG);
        }
    }
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
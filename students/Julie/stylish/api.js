// 初始目前頁數，目前 End Point
let currPG = 0; let currEP = '';
// 伺服器名
let host = '18.214.165.31';

// Connect Product List API 跟 Product Search API 跟 Marketing Campaigns API
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
    if (Math.round(winH) >= docH) {
        if (currEP === "/marketing/campaigns?") {
            // 如果是 Marketing Campaigns API，就什ㄇ都不做
        } else if (currPG !== undefined && currPG >= 0) { 
            // 如果目前的頁面在剛剛 Fetch 時，有 paging
            // 再 Fetch 一次，讓客人不用跳轉就可繼續讀取下一頁。
            console.log('Request 網址: ' + currEP + 'paging=' + currPG);
            get(currEP, currPG);
        }
    }
}

// 清空畫面
function clear() {
    const row = document.getElementById('row');
    while (row.firstChild) {
        row.removeChild(row.firstChild);
    }
    document.getElementById("loading").style.display = 'block';
    document.getElementById("nothing").style.display = 'none';
}

// 取得 End Point 小精靈
function catalog(cata) {
    const ep = `/products/${cata}?`;
    return get(ep);
}
function search(keyword) {
    const ep = `/products/search?keyword=${keyword}&`;
    return get(ep);
}
function campaigns() {
    const ep = '/marketing/campaigns?';
    return get(ep);
}
function mkhost() {
    const ep = '/marketing/hosts';
    return get(ep);
}

// render Key Visual
function renderKV(layout) {
    const carousel = document.getElementById("carousel");
    
    const fragment = document.createDocumentFragment();

    for(let i = 0; i < layout.data.length; i++) {
        const slide = document.createElement("div");
        const visual = 'http://' + `${host}` + `${layout.data[i].picture}`;
        slide.className = "slide";
        slide.style.backgroundImage = ('src', "url('" + visual + "')");

        // 根據 <br> 把故事文拆開變一行一行
        const line = `${layout.data[i].story}`.split('\r\n');

        // 創造裝故事的 div.story
        const story = document.createElement("div");
        story.className = "story"

        // 再用 <br> 把一行一行的故事文串起來，然後在最後一行加 span.subText 才能還原成設計稿畫的樣子。
        story.innerHTML = `${line[0] + '<br>' + line[1] + '<br>' + line[2] + '<br><span class="subText">' + line[3] + '</span>'}`;
        
        slide.appendChild(story);
        fragment.appendChild(slide);
    }

    const dotWrap = document.createElement("div");
    dotWrap.className = "dotWrap";
    fragment.appendChild(dotWrap);

    // 讓位在第一個的點點同時有 dot activeDot 的 class
    for(let d = 0; d < layout.data.length - (layout.data.length - 1); d++) {
        const dot = document.createElement("div");
        dot.className = "activeDot dot";
        dotWrap.appendChild(dot);
    }
    
    for(let d = 0; d < layout.data.length - 1; d++) {
        const dot = document.createElement("div");
        dot.className = "dot";
        dotWrap.appendChild(dot);
    }
    
    carousel.appendChild(fragment);
}

// render 產品畫面
function renderPD(layout) {

    const row = document.getElementById("row");

    const fragment = document.createDocumentFragment();

    for(let i = 0; i < layout.data.length; i++) {
        const product = document.createElement("div");
        product.className = "product";

        const palette = document.createElement("div");
        palette.className = "palette";

        for(let c = 0; c < layout.data[i].colors.length; c++) {
            const colors = document.createElement("div");
            colors.className = "colors";
            let code = layout.data[i].colors[c].code;
            colors.style.cssText = 'background:' + `#${code};`;
            palette.appendChild(colors);
        }

        const mainImg = document.createElement("img");
        mainImg.src = `${layout.data[i].main_image}`;

        const title = document.createElement("div");
        title.className = "title";
        title.innerText = `${layout.data[i].title}`;

        const price = document.createElement("div");
        price.className = "price";
        price.innerText = "TWD." + `${layout.data[i].price}`;

        product.appendChild(mainImg);
        product.appendChild(palette);
        product.appendChild(title);
        product.appendChild(price);
        fragment.appendChild(product);
    }
    
    row.appendChild(fragment);
}
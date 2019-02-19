let currPG = 0;
let currEP = '';

// Connect API 用 Fetch
function get(api) {
    // 把 ep 存起來，換頁時有用。
    currEP = api;
    fetch(`http://18.214.165.31/api/1.0${api}`)
        .then( res => {
            return res.json();
        })
        .then( json => {
            console.log('json 結果 ' + json.data.length + ' 筆資料');
            console.log('json paging: ' + json.paging);
            // Loading 圖
            document.getElementById("loading").style.display = 'none';
            if (json.data.length <= 0) {
                // 如果資料小於等於 0 筆，跟客人說找不到
                document.getElementById("nothing").style.display = 'block';
            } else {
                // 不然就 render 出來。 
                // 也把 paging 值存起來，換頁用。
                currPG = json.paging;
                render(json);
            }
        })
        .catch( err => {
            console.log(err);
        })
}

// 監測卷軸位置
window.onscroll = function () {
    const docH = document.body.scrollHeight;
    const winH = window.innerHeight;

    // 如果卷軸到了底部
    if (winH + window.scrollY >= docH) {
        // 如果目前的頁面，剛剛 Fetch 時 有 paging 且大於 0
        if (currPG > 0 && currPG !== undefined) {
            // 再 Fetch 一次，讓客人不用跳轉就可繼續讀取下一頁。
            get(currEP + 'paging=' + currPG);
        } else {
            return
        }
    } else {
        return
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

// 取得 EndPoint 小精靈
function catalog(cata) {
    const ep = `/products/${cata}?`;
    return get(ep);
}
function search(keyword, page) {
    const ep = `/products/search?keyword=${keyword}&`;
    return get(ep);
}
function campaigns() {
    const ep = '/marketing/campaogns';
    return get(ep);
}
function mkhost() {
    const ep = '/marketing/hosts';
    return get(ep);
}

// render 出畫面
function render(layout) {

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
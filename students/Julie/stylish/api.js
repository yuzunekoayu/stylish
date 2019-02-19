// Connect API 用 Fetch
function get(api, ep) {
    fetch(`http://18.214.165.31/api/1.0/${api}/${ep}`)
        .then( res => {
            return res.json();
        })
        .then( json => {
            console.log('結果 ' + json.data.length + ' 筆資料');
            console.log('頁數：' + json.paging);
            // Loading 圖
            document.getElementById("loading").style.display = 'none';
            if (json.data.length <= 0) {
                // 如果資料小於等於 0 筆，跟客人說找不到
                document.getElementById("nothing").style.display = 'block';
            } else if (json.paging !== undefined) {
                // 如果有好幾頁，就新增一項 query string parameter 然後無限卷軸
                render(json);
                window.onscroll = function () {
                    const contentHeight = window.innerHeight + window.scrollY;
                    const bodyHeight = document.body.scrollHeight;
                    if (contentHeight >= bodyHeight) {
                        let page = json.paging - 1;
                        let params = new URLSearchParams();
                        params.append('paging', page+=1);
                        console.log('下一頁：Ｄ');
                        render(json);
                    } else {
                        return
                    }
                }
            } else {
                // 不然就 render 出來。 
                render(json);
            }
        })
        .catch( err => {
            console.log(err);
        })
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

// 如果用 URLSearchParams()，參數會一直被轉成 unicode 碼，無法用中文搜尋，只好自己綁個 function
function search(keyword) {
    const api = 'products';
    const ep = `search?keyword=${keyword}`;
    return get(api, ep);
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
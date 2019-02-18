function get(api) {
    fetch(`http://18.214.165.31/api/1.0${api}`)
        .then( res => {
            return res.json();
        })
        .then( json => {
            document.getElementById("loading").style.display = 'none';
            if (json.data.length <= 0) {
                noProduct(json);
            } else {
                render(json);
            }
            console.log(json.data.length);
        })
        .catch( err => {
            console.log(err);
        })
}

function clear() {
    const row = document.getElementById('row');
    while (row.firstChild) {
        row.removeChild(row.firstChild);
    }
    document.getElementById("loading").style.display = 'block';
    document.getElementById("nothing").style.display = 'none';
}

function catalog(cata, page) {
    const ep = `/products/${cata}?paging=${page}`;
    return get(ep);
}

function search(keyword, page) {
    const ep = `/products/search?keyword=${keyword}&paging=${page}`;
    return get(ep);
}

function noProduct(layout) {
    const row = document.getElementById("row");
    if (layout.data.length <= 0) {
        document.getElementById("nothing").style.display = 'block';
    }
}

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
toggleNav(document.querySelectorAll('.item'));

document.addEventListener("DOMContentLoaded", () => {

    show('all', 0);

    const tabs = document.querySelectorAll('.item');
    for (let i = 0; i < tabs.length; i++) {
        let tab = tabs[i].id;

        function tabListen(e) {
            if (e.currentTarget.id === tab) {
                console.log(tab)
                clear();
                show(tab);
            } else {
                show('all', 0);
                console.log(e.currentTarget.id);
            }
        }
        
        tabs[i].addEventListener('click', tabListen);
    }

})

function get(catalog) {
    fetch(`http://18.214.165.31/api/1.0${catalog}`)
        .then( res => {
            return res.json();
        })
        .then( json => {
            render(json);
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
    const loading = "./img"
    row.innerText = "<i>"
}

function show(cata, page) {
    let endPoint = `/products/${cata}?paging=${page}`;
    console.log(cata, page);
    return get(endPoint);
}

function render(layout) {

    const row = document.getElementById("row");
    console.log(layout);

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

function toggleNav(elem) {
    for (var i = 0; i < elem.length; i++) {
      elem[i].addEventListener("click", function(e) {
        var curr = this;
        for (var i = 0; i < elem.length; i++) {
          if (curr != elem[i]) {
            elem[i].classList.remove('active');
          } else if (curr.classList.contains('active') === true) {
            curr.classList.remove('active');
          } else {
            curr.classList.add('active')
          }
        }
        e.preventDefault();
      });
    };
}
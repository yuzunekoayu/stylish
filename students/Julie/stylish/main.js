toggleNav(document.querySelectorAll('.item'));
toggleSubNav(document.querySelectorAll('.subItem'));

document.addEventListener("DOMContentLoaded", () => {
    show();
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

function show(cata = 'all', page = 0) {
    const endPoint = `/products/${cata}?paging=${page}`;
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

function toggleSubNav(elem) {
    for (var i = 0; i < elem.length; i++) {
        elem[i].addEventListener("click", function(e) {
        var curr = this;
        for (var i = 0; i < elem.length; i++) {
            if (curr != elem[i]) {
            elem[i].classList.remove('subActive');
            } else if (curr.classList.contains('subActive') === true) {
            curr.classList.remove('subActive');
            } else {
            curr.classList.add('subActive')
            }
        }
        e.preventDefault();
        });
    };
}
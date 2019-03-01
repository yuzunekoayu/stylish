// 伺服器名
let host = '18.214.165.31';

document.addEventListener("DOMContentLoaded", () => {
    
    toggleMutiple(document.querySelectorAll('.item'), "activeTab", "A");
    
    const cartList = document.querySelector('#cartList');
    initCart();
    
});

function initCart() {
    console.log("購物車頁面list", list);
    if (list.length === 0) {
        cartNothing();
    } else {
        renderCartList(list);
    }
}

async function record(id, color, size, qty, parent) {
    let res = await fetch(`http://${host}/api/1.0/products/details?id=${id}`);
    let json = await res.json();
    findMax(json.data.variants, color, size, qty, parent);
}

function findMax(v, color, size, qty, parent) {
    v.forEach((m) => {
        if (m.color_code === color && m.size === size) {
            max = m.stock;
        }
    })
    console.log(max);
    optionMaker(max, qty, parent);
}

function cartNothing() {
    const cartEmpty = document.createElement('div')
    cartEmpty.textContent = '您的購物車是空的喔～!';
    cartEmpty.className = 'cartEmpty'
    while (cartList.firstChild) {
        cartList.removeChild(cartList.firstChild);
    }
    cartList.appendChild(cartEmpty);
}

function optionMaker(max, qty, parent) {
    for (let i = 1; i <= max; i++) {
        const option = document.createElement('option');
        option.setAttribute('value', i);
        option.setAttribute('name', i);
        option.textContent = i;
        
        if (i === parseInt(qty)) {
        option.setAttribute('selected','selected');
        }
        
        parent.appendChild(option);
    } 
}
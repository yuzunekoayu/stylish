// 伺服器名
let host = '18.214.165.31';

document.addEventListener("DOMContentLoaded", () => {
    
    toggleMutiple(document.querySelectorAll('.item'), "activeTab", "A");
    
    const cartList = document.querySelector('#cartList');
    const sumTotal = document.querySelector('#sumTotal');
    const shippingFee = document.querySelector('#shippingFee');
    const payable = document.querySelector('#payable');
    initCart();
    
});

// 初始畫面，購物車沒東西就說空空，購物車有東西就 render 出來 + 執行一些功能
function initCart() {
    console.log("購物車頁面list", list);
    if (list.length === 0) {
        cartNothing();
    } else {
        renderCartList(list);
        calcTotal();
        deleteItem();
    }
}

// 為了抓取真正庫存的 Fetch
async function record(id, color, size, qty, parent) {
    let res = await fetch(`http://${host}/api/1.0/products/details?id=${id}`);
    let json = await res.json();
    findMax(json.data.variants, color, size, qty, parent);
}

// 為了找到對的庫存數量的功能
function findMax(v, color, size, qty, parent) {
    v.forEach((m) => {
        if (m.color_code === color && m.size === size) {
            max = m.stock;
        }
    })
    console.log(max);
    optionMaker(max, qty, parent);
}

// 空空畫面
function cartNothing() {
    const cartEmpty = document.createElement('div')
    cartEmpty.textContent = '您的購物車是空的喔～!';
    cartEmpty.className = 'cartEmpty'
    while (cartList.firstChild) {
        cartList.removeChild(cartList.firstChild);
    }
    cartList.appendChild(cartEmpty);
}

// 為了製造跟真正庫存數量相對應的下拉選單 option 的功能
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

// 計算價錢
let sumTotalNum = []; let shippingFeeNum = 30; let payableNum = 0;
function calcTotal() {
    if (list.length === 0 ) {
        return
    } else {
        sumTotalNum = list.map( (li) => {
            return li.price * parseInt(li.qty);
        });
        sumTotalNum = sumTotalNum.reduce((acc, curr) => {
            return acc + curr;
        });

        payableNum = sumTotalNum + shippingFeeNum;

        sumTotal.textContent = sumTotalNum;
        shippingFee.textContent = shippingFeeNum;
        payable.textContent = payableNum;
    }
}


// 移除功能
function deleteItem() {
    const trashCan = document.querySelectorAll('.cartDelete');
    
    trashCan.forEach( (tc) => {
        tc.addEventListener('click', deleteHelper);
    });

    function deleteHelper(e) {
        // 刪除 localStorage 資料，然後存回去
        list = list.filter( (li) => {
            return li.delete !== e.target.getAttribute("data-delete");
        });
        localStorage.setItem('list',JSON.stringify(list));

        if (list.length === 0) {
            cartNothing();
            sumTotal.textContent = 0;
            shippingFee.textContent = 0;
            payable.textContent = 0;
        } else {
            while (cartList.firstChild) {
                cartList.removeChild(cartList.firstChild);
            }
            // 重新 render 新的 lacalStorage 資料
            renderCartList(list);
        }
        // 重算價錢
        calcTotal();
        // nav bar 右上小車數字
        countGoods();
        // 不寫的話，重 render 後再按垃圾桶就沒反應
        deleteItem();
    }
}

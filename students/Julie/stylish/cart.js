// 伺服器名
let host = 'api.appworks-school.tw';
// 總計、運費、應付
let sumTotalNum = []; let shippingFeeNum = 30; let payableNum = 0;
// 檢查信用卡資料有沒有填好用
let creditReady = false;

document.addEventListener("DOMContentLoaded", () => {
    
    toggleMutiple(document.querySelectorAll('.item'), "activeTab", "A");
    
    const cartList = document.querySelector('#cartList'); // 購物車商品清單
    const cartTopTitle = document.querySelector('#cartTopTitle'); // Cart List 左上數字

    const sumTotal = document.querySelector('#sumTotal'); // 總計
    const shippingFee = document.querySelector('#shippingFee'); // 運費
    const payable = document.querySelector('#payable'); // 應付

    const selectDeliveryArea = document.querySelector('#selectDeliveryArea'); // 選擇配送國家
    const selectPayWay = document.querySelector('#selectPayWay'); // 選擇付款方式

    const orderInfo = document.querySelector('#orderInfo'); // 訂購資料表格

    const cartYesPay = document.querySelector('#cartYesPay'); // 確認付款按鈕

    cartTopTitle.textContent = "購物車(" + countGoods() + ")";
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
        changeQty();
        deleteItem();
    }
}

// 為了抓取真正庫存的 Fetch
async function record(id, color, size, qty, parent) {
    let res = await fetch(`https://${host}/api/1.0/products/details?id=${id}`);
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
    console.log("真正庫存", max);
    optionMaker(max, qty, parent);
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

// 換數量功能
function changeQty() {
    const select = document.querySelectorAll('.cartQty > select');

    select.forEach( (opt) => { 
        opt.addEventListener('change', (e) => {
            // 找到正確的要改數量的商品
            list.forEach((li) => {
                if (li.confirm === e.target.getAttribute("data-confirm")) {
                    // 更新 qty
                    li.qty = e.target.value;
                    // 更新小計
                    updateSubTotal(li);
                }
            });
            // 存回 local storage
            localStorage.setItem('list', JSON.stringify(list));
            console.log("換數量後", list);
            // 重算價錢
            calcTotal();
            // Nav 右上、cartList 左上數字
            countGoods();
            cartTopTitle.textContent = "購物車(" + countGoods() + ")";
        });
    });
}

// 更新小計功能
function updateSubTotal(li) {
    const cartSubTotal = document.querySelectorAll('#cartSubTotal');
    cartSubTotal.forEach((p) => {
        if (p.getAttribute("data-confirm") === li.confirm) {
            p.textContent = "NT." + `${li.price * parseInt(li.qty)}`;
        }
    })
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

// 計算價錢
function calcTotal() {
    if (list.length === 0 ) {
        // 如果購物車空空，沒事。
        return
    } else {
        // 購物車有東西，總計 = 單價 * 數量，再加總。
        sumTotalNum = list.map( (li) => {
            return li.price * parseInt(li.qty);
        });
        sumTotalNum = sumTotalNum.reduce((acc, curr) => {
            return acc + curr;
        });

        // 應付 = 運費 + 總計（目前全館運費一律 30 (ry）
        payableNum = sumTotalNum + shippingFeeNum;

        // 顯示數字在正確的 div 內。
        sumTotal.textContent = sumTotalNum;
        shippingFee.textContent = shippingFeeNum;
        payable.textContent = payableNum;
    }
}

// 移除功能
function deleteItem() {
    const trashCan = document.querySelectorAll('.cartDelete');
    const items = document.querySelectorAll('.cartItem');    
    
    // 垃圾桶被按
    trashCan.forEach( (tc) => {
        tc.addEventListener('click', deleteHelper);
    });

    function deleteHelper(e) {
        // 刪除 localStorage 資料，然後存回去
        list = list.filter( (li) => {
            return li.confirm !== e.target.getAttribute("data-confirm");
        });
        localStorage.setItem('list',JSON.stringify(list));
        console.log("購物車移除商品後", list);

        if (list.length === 0) {
            // 如果購物車變空的，顯示空空畫面，價格都歸零
            cartNothing();
            sumTotal.textContent = 0;
            shippingFee.textContent = 0;
            payable.textContent = 0;
        } else {
            // 購物車還有其他商品，比對刪除碼，移除那項符合的商品
            items.forEach( (item) => {
                if (item.getAttribute("data-confirm") === e.target.getAttribute("data-confirm")) {
                    item.parentNode.removeChild(item);
                }
            });
        }
        // 重算價錢
        calcTotal();
        // Nav 右上、cartList 左上數字
        countGoods();
        cartTopTitle.textContent = "購物車(" + countGoods() + ")";
    }
}
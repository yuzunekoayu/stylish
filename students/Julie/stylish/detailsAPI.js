// 伺服器名
let host = '18.214.165.31';
// 單一產品頁網址
let prodURL = new URL(window.location);

console.log(prodURL.search);

// Connect Product Details API（試著用 async 和 await + Fetch）
async function kwsk() {
    const res = await fetch(`http://${host}/api/1.0/products/details${prodURL.search}`);
    return res.json();
}
kwsk()
    .then(data => {
        renderDetails(data);

        // 點擊變顏色、變框框
        toggleMutiple(document.querySelectorAll('.sikaku'), 'colorSelect');
        toggleMutiple(document.querySelectorAll('.sml'), 'sizeSelect');

        let variants = data.data.variants;
        orderHelper(variants);
    })
    .catch(err => {
        console.log(err);
    })

// 選擇顏色尺寸，告訴顧客有無庫存
function orderHelper(variants) {
    console.log(variants)

    // 把客人選的顏色、尺寸、數量、庫存，存成一個物件（初始是 0 或 ""）
    let order = { iro: '', size: '', amount: 0, userStock: 0 };
    
    const iros = document.querySelectorAll('.iro');
    const sizes = document.querySelectorAll('.sml');
    const minus = document.querySelector("#minus");
    const count = document.querySelector("#count");
    const plus = document.querySelector("#plus");
    const addToCart = document.querySelector("#addToCart");

    // 監聽顏色被按
    iros.forEach( iro => {
        iro.addEventListener("click", memoOrderIro);
    });
    // 顏色被按的 CallBack
    function memoOrderIro(e) {
        order.iro = e.currentTarget.style.backgroundColor;
        variants.forEach( variant => {
            if (RGBtoHex(variant.color_code) === order.iro && variant.size === order.size) {
                order.userStock = variant.stock;
                tellIfSoldOut(order.userStock, addToCart);
                count.value = 0;
            }
        })
    }

    // 監聽尺寸被按
    sizes.forEach( size => {
        size.addEventListener("click", memoOrderSize);
    });
    // 尺寸被按的 CallBack
    function memoOrderSize(e) {
        order.size = e.currentTarget.innerText;
        variants.forEach( variant => {
            if (RGBtoHex(variant.color_code) === order.iro && variant.size === order.size) {
                order.userStock = variant.stock;
                tellIfSoldOut(order.userStock, addToCart);
                count.value = 0;
            }
        })
    }

    // 監聽減號被按
    minus.addEventListener("click", () => {
        if (count.value <= order.userStock && count.value > 0) {
            addToCart.textContent = "加入購物車";
            count.value --;
        }
    });
    
    // 監聽加號被按
    plus.addEventListener("click", () => {
        if (count.value === 0 || count.value < order.userStock) {
            count.value ++;
        } else if (count.value = order.userStock) {
            addToCart.textContent = "加入購物車（已達最大庫存）";
        }
    });

    // 監聽「加入購物車」按鈕被按
    addToCart.addEventListener("click", () => {
        if (order.iro === "" || order.size === "") {
            addToCart.disabled = true;
            addToCart.textContent = "請選擇顏色及尺寸";
        } else if  (order.iro !== "" && order.size !== "" && count.amount > 0) {
            addToCart.disabled = false;
            addToCart.textContent = "加入購物車";
        }
    });        
}

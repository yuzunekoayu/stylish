// 伺服器名
let host = '18.214.165.31';
// 單一產品頁網址
let prodURL = new URL(window.location);

// Connect Product Details API（試著用 async 和 await + Fetch）
async function kwsk() {
    const res = await fetch(`http://${host}/api/1.0/products/details${prodURL.search}`);
    return res.json();
}
kwsk()
    .then(json => {
        renderDetails(json);

        // 點擊變顏色、變框框
        toggleMutiple(document.querySelectorAll('.square'), 'colorSelect', 'DIV');
        toggleMutiple(document.querySelectorAll('.sml'), 'sizeSelect', 'DIV');

        // 顏色、尺寸、數量 UI
        orderHelper(json.data);
    })
    .catch(err => {
        console.log(err);
    })

// 選擇顏色尺寸，告訴顧客有無庫存
function orderHelper(data) {

    let variants = data.variants;

    // 把客人選的顏色、顏色名、尺寸、數量、庫存，存成一個物件（初始是 0 或 ""）
    let order = { iro: '', iroName:'', size: '', amount: 0, userStock: 0 };
    
    const squares = document.querySelectorAll('.square');
    const sizes = document.querySelectorAll('.sml');
    const minus = document.querySelector("#minus");
    const count = document.querySelector("#count");
    const plus = document.querySelector("#plus");
    const restStock = document.querySelector('#restStock');
    const addToCart = document.querySelector("#addToCart");

    // 監聽顏色被按
    squares.forEach( square => {
        square.addEventListener("click", memoOrderIro);
    });
    // 顏色被按的 CallBack
    function memoOrderIro(e) {
        order.iroName = e.currentTarget.title;
        order.iro = e.currentTarget.getAttribute("data-color_code");
        variants.forEach( variant => {
            if (variant.color_code === order.iro && variant.size === order.size) {
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
            if (variant.color_code === order.iro && variant.size === order.size) {
                order.userStock = variant.stock;
                order.amount = count.value;
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
            addToCart.textContent = "加入購物車";
            count.value ++;
        }
    });

    // 監聽「加入購物車」按鈕被按
    addToCart.addEventListener("click", () => {
        order.amount = count.value;

        if (order.iro === "" || order.size === "" || order.amount <= 0) {
            addToCart.disabled = true;
            addToCart.textContent = "請選擇款式及數量";
        
        } else if  (order.iro !== "" && order.size !== "" && order.amount > 0) {
            
            console.log(order.amount);
            
            addToCart.disabled = false;
            addToCart.textContent = "加入購物車";

            setOrder();

            function setOrder() {
                let newOrder = {
                    id: data.id,
                    name: data.title, 
                    price: data.price,
                    color: {
                        name: order.iroName,
                        code: order.iro
                    },
                    size: order.size,
                    qty: order.amount
                };
                list.push(newOrder);
                localStorage.setItem("list", JSON.stringify(list));
            }
        
        }
    });
        
    
}

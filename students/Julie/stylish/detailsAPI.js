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
    console.log(variants);
    
    let order = { iro: '', size: '', amount: 0, userStock: 0 };

    const iros = document.querySelectorAll('.iro');
    iros.forEach( iro => {
        iro.addEventListener("click", memoOrderIro);
    });
    function memoOrderIro(e) {
        order.iro = e.currentTarget.style.backgroundColor;
        variants.forEach( variant => {
            if (RGBtoHex(variant.color_code) === order.iro && variant.size === order.size) {
                order.userStock = variant.stock;
                console.log('目前庫存Color', order.userStock);
            }
        })
    }
    const sizes = document.querySelectorAll('.sml');
    sizes.forEach( size => {
        size.addEventListener("click", memoOrderSize);
    });
    function memoOrderSize(e) {
        order.size = e.currentTarget.innerText;
        variants.forEach( variant => {
            if (RGBtoHex(variant.color_code) === order.iro && variant.size === order.size) {
                order.userStock = variant.stock;
                console.log('目前庫存Size', order.userStock);
            }
        })
    }



    order.amount = document.querySelector("#count").value;
    let addToCart = document.querySelector("#addToCart");
    
    
        
}

// 購物車沒東西
let list = [];
// 購物車有東西
if (localStorage.getItem("list")) {
    list = JSON.parse(localStorage.getItem('list'));
}

// NavBar 購物車小圖數字，購物車頁面左上 Title 數字
const badges = document.querySelectorAll(".badge");
countGoods();

function countGoods() {
    let cartCount = 0;
    list.forEach(goods => {
        cartCount = parseInt(cartCount) + parseInt(goods.qty);
    });
    badges.forEach(badge => {
        badge.textContent = cartCount;
    });
    return cartCount;
}

console.log("初始list", list);
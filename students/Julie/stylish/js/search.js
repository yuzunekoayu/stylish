// 所有 Page 共用搜尋功能
const searchForm = document.querySelector('#searchBar');
const productPage = window.location.href.indexOf("product");
const cartPage = window.location.href.indexOf("cart");
const profilePage = window.location.href.indexOf("profile");

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const keyword = new FormData(searchForm).get('keyword');
  if (keyword === "") {
    return;
  } else if (productPage > -1 || cartPage > -1 || profilePage > -1) {  
    window.location.href = `index.html?tag=${keyword}`
  } else {
    clear(document.querySelector('#row'));
    search(keyword)
  }
  searchForm.reset();
})

// 手機版 Search Bar 樣式
const mobileSubmit = document.querySelector("#mobileSubmit");
const feature = document.querySelector("#feature");
const searchBar = document.querySelector("#searchBar");

function magnify() {
  if (mobileSubmit.style.background === 'url("../img/close.png")') {
    mobileSubmit.style.background = 'url("../img/search.png")';
    feature.classList.remove('featureGrow');
    searchBar.classList.remove('searchBarGrow');
  } else {
    mobileSubmit.style.background = 'url("../img/close.png")';
    feature.classList.add('featureGrow');
    searchBar.classList.add('searchBarGrow');
  }
}
mobileSubmit.addEventListener('pointerdown', magnify); 
// 手機版 Search Bar
const mobileSubmit = document.getElementById("mobileSubmit");
const feature = document.getElementById("feature");
const searchBar = document.getElementById("searchBar");

function magnify() {
  if (mobileSubmit.style.background === 'url("./img/close.png")') {
    mobileSubmit.style.background = 'url("./img/search.png")';
    feature.classList.remove('featureGrow');
    searchBar.classList.remove('searchBarGrow');
  } else {
    mobileSubmit.style.background = 'url("./img/close.png")';
    feature.classList.add('featureGrow');
    searchBar.classList.add('searchBarGrow');
  }
}
mobileSubmit.addEventListener('pointerdown', magnify);
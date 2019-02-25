/* 好用ㄉ功能
  clear() === 清空畫面（首頁換分類、顯示搜尋結果用）
  toggleSingle() === 選擇單一元素，反覆點擊他，add remove class
  toogleMutiple() === 選擇多個元素，點到的那個 add class，沒點到的 remove class（Nav Bar、單一產品頁選顏色尺寸、預計輪播也要用）
  magnify() === 手機版 Search Bar 樣式變化用。
*/

// 清空畫面
function clear(area) {
  while (area.firstChild) {
      area.removeChild(area.firstChild);
  }
  document.getElementById("loading").style.display = 'block';
  document.getElementById("nothing").style.display = 'none';
}

// 單一元素點擊 toogle class
function toggleSingle(elem, active) {
  const want = document.querySelector(elem);
  want.addEventListener('click', () => {
    want.classList.toggle(active);
  });
}

// 多個元素點擊 toogle class
function toggleMutiple(elem, active) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].onclick = function() {
        let el = elem[0];
        while(el) { 
          if(el.tagName === "DIV"){
            el.classList.remove(`${active}`);
          }
          el = el.nextSibling;
        }
        this.classList.add(`${active}`);  
        };
    }
}

// #xxxxxx → rgb(xx, xxx, xx) 轉換色碼格式
function RGBtoHex(hex){
  r = parseInt(hex.substring(0,2), 16);
  g = parseInt(hex.substring(2,4), 16);
  b = parseInt(hex.substring(4,6), 16);
  result = 'rgb('+r+', '+g+', '+b+')';
  return result;
}

// 手機版 Search Bar 樣式
const mobileSubmit = document.querySelector("#mobileSubmit");
const feature = document.querySelector("#feature");
const searchBar = document.querySelector("#searchBar");
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
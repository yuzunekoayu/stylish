// 清空畫面
function clear(area) {
  while (area.firstChild) {
      area.removeChild(area.firstChild);
  }
  document.getElementById("loading").style.display = 'block';
  document.getElementById("nothing").style.display = 'none';
}

// 點了然後改變 CSS 的功能。
function toggleClass(elem, active) {
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

// 手機版 Search Bar 樣式
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
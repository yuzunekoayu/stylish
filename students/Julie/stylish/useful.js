/* 好用ㄉ功能
  clear() === 清空畫面（首頁換分類、顯示搜尋結果用）
  toogleClass() === 點了變顏色功能（Nav Bar、單一產品頁選顏色尺寸用、預計輪播也要用）
  classObserver() === 檢查還不存在的動態 DOM 生出來了沒，用 classNmae 當標準，
                      單一產品頁選顏色尺寸用、預計輪播也要用
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

// 點了變顏色功能。
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

// 檢查還不存在的動態 DOM 生出來了沒，用 className 當標準
const classObserver = function(target, wanted) {
  const option = { childList: true, subtree: true };
  const observer = new MutationObserver(mutation => {
    mutation.forEach(function(m) {
      let nodes = m.addedNodes;
      for(i = 0; i < nodes.length; i++) {
        if (nodes[i].classList.contains(`${wanted}`)) {
          if (wanted === "sikaku") { // 單一產品頁，選顏色變出框框
            toggleClass(document.querySelectorAll('.sikaku'), 'colorSelect');
          } else if (wanted === "sml") { // 單一產品頁，選尺寸變亮暗
            console.log("YOO");
            toggleClass(document.querySelectorAll('.sml'), 'sizeSelect');
          }
        }
      }
    })
  });
  observer.observe(target, option);
  return observer;
};

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
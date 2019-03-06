/* 好用ㄉ功能
  clear() === 清空畫面（首頁換分類、顯示搜尋結果用）
  toogleMutiple() === 選擇多個元素，點到的那個 add class，沒點到的 remove class（Nav Bar、單一產品頁選顏色尺寸）
*/

// global clear toggleMutiple

// 清空畫面
function clear(area) {
  while (area.firstChild) {
      area.removeChild(area.firstChild);
  }
  document.getElementById("loading").style.display = 'block';
  document.getElementById("nothing").style.display = 'none';
}

// 多個元素點擊 toogle class
function toggleMutiple(elem, active, wantedTag) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].onclick = function() {
        let el = elem[0];
        while(el) { 
          if(el.tagName === wantedTag){
            el.classList.remove(`${active}`);
          }
          el = el.nextSibling;
        }
        this.classList.add(`${active}`);  
        };
    }
}
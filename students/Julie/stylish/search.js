// 當客人按下搜尋，將客人輸入的關鍵字當作參數，傳給 Fetch。
const btnSubmit = document.getElementById('btnSubmit');
btnSubmit.addEventListener('click', () => {
      let inputWord = document.getElementById("input").value;
      if (inputWord.length > 0) {
            clear(document.getElementById('row'));
            search(inputWord);
            inputField.value = "";
        }
    console.log(inputWord);
});

// 讓滑鼠 click 跟鍵盤 enter 都可以 submit 搜尋關鍵字
let inputField = document.getElementById("input");
inputField.addEventListener("keypress", (e) => {
    if (e.keyCode === 13) {
    btnSubmit.click();
    inputField.value = "";
    }
}); 

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
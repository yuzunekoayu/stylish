
let index;

// 等 HTML DOM 長好了才開始跑
document.addEventListener("DOMContentLoaded", () => {
  
  // 初始畫面
  campaigns();
  catalog('all');

  // 按 tab 變字體顏色
  toggleNav(document.querySelectorAll('.item'));

  index = 0; // 要知道當前誰被選擇，0就是第一張（陣列

  // 把 tab id 當作網址的 End Point 傳給 Fetch，按到哪個 tab 就傳那個 tab 的 id 
  const tabs = document.querySelectorAll('.item');
  for (let i = 0; i < tabs.length; i++) {
      let tab = tabs[i].id;

      function tabListen(e) {
        if (e.currentTarget.id === tab) {
              clear();
              catalog(tab);
          } else {
              console.log(e.currentTarget.id);
              console.log(tab);
          }
      }
      
      tabs[i].addEventListener('click', tabListen);
  }

  // 當客人按下搜尋，將客人輸入的關鍵字當作參數，傳給 Fetch。
  const btnSubmit = document.getElementById('btnSubmit');
  btnSubmit.addEventListener('click', () => {
        let inputWord = document.getElementById("input").value;
        if (inputWord.length > 0) {
            clear();
            inputField.value = "";
            search(inputWord);
        } else {
            return
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

  
});

// 按 tab 變字體顏色的功能。
function toggleNav(elem) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener("click", function(e) {
        const curr = this;
        for (let i = 0; i < elem.length; i++) {
          if (curr != elem[i]) {
            elem[i].classList.remove('active');
          } else if (curr.classList.contains('active') === true) {
            curr.classList.remove('active');
          } else {
            curr.classList.add('active')
          }
        }
        e.preventDefault();
      });
    };
}

function next() {
  let slides = document.querySelectorAll(".slide");

  slides[index].classList.remove("in");
  slides[index].classList.add("out");

  index = (index+1) % slides.length;

  slides[index].classList.remove("out");
  slides[index].classList.add("in");
}
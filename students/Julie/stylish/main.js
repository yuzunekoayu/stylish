let index = 0; let dotIndex = 0;

// 等靜態 HTML DOM 長好了才開始跑
document.addEventListener("DOMContentLoaded", () => {
  
  // 初始畫面
  campaigns();
  catalog('all');
  setInterval(next, 10000);

  // 按 tab 變字體顏色
  toggleMutiple(document.querySelectorAll('.item'), "activeTab");

  // 把 tab id 當作網址的 End Point 傳給 Fetch，按到哪個 tab 就傳那個 tab 的 id 
  const tabs = document.querySelectorAll('.item');
  for (let i = 0; i < tabs.length; i++) {
      let tab = tabs[i].id;

      function tabListen(e) {
        if (e.currentTarget.id === tab) {
              clear(document.getElementById('row'));
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
            clear(document.getElementById('row'));
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
});

// 自動輪播功能
function next() {
  slides[index].classList.remove("in");
  slides[index].classList.add("out");
  dots[dotIndex].classList.remove("activeDot");
  dots[dotIndex].classList.add("dot");

  index = (index+1) % slides.length;
  dotIndex = (dotIndex+1) % dots.length;

  slides[index].classList.remove("out");
  slides[index].classList.add("in");
  dots[dotIndex].classList.add("activeDot");
  dots[dotIndex].classList.remove("dot");
}
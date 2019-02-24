document.addEventListener("DOMContentLoaded", () => {
  
  toggleClass(document.querySelectorAll('.item'), "activeTab");
  
  let prodURL = new URL(window.location);
  kwsk(prodURL.search);

  // classObserver(document.querySelector('#prodColors'), "sikaku");
  // classObserver(document.querySelector('#prodSizes'), "sml");


  // 顯示目前庫存要用的變數
  



  let countNum = 0;
  const minus = document.querySelector("#minus");
  const count = document.querySelector("#count");
  const plus = document.querySelector("#plus");

  minus.addEventListener("click", () => {
    if (countNum > 0) {
      countNum--;
      count.value = countNum;
    }
  });

  plus.addEventListener("click", () => {
    countNum++;
    count.value = countNum;
  });


  
});
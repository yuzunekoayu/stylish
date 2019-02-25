document.addEventListener("DOMContentLoaded", () => {
  
  toggleMutiple(document.querySelectorAll('.item'), "activeTab");

  const minus = document.querySelector("#minus");
  const count = document.querySelector("#count");
  const plus = document.querySelector("#plus");

  minus.addEventListener("click", () => {
    if (count.value > 0) {
      count.value--;
    }
  });

  plus.addEventListener("click", () => {
    count.value++;
  });

});
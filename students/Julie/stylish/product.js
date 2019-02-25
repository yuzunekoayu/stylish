document.addEventListener("DOMContentLoaded", () => {
  
  toggleMutiple(document.querySelectorAll('.item'), "activeTab");

});

const tellIfSoldOut = (num, btn) => {
  if (num === 0) {
    btn.disabled = true;
    btn.innerText = "缺貨中";
    btn.classList.add("failToCart");
  } else {
    btn.disabled = false;
    btn.innerText = "加入購物車";
    btn.classList.remove("failToCart");
  }
}


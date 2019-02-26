document.addEventListener("DOMContentLoaded", () => {

  toggleMutiple(document.querySelectorAll('.item'), "activeTab", "A");

});

const tellIfSoldOut = (num, btn) => {
  if (num === 0) {
    btn.disabled = true;
    btn.innerText = "缺貨中";
    btn.classList.add("failToCart");
    restStock.textContent = "庫存 " + num + " 件";
    restStock.style.opacity = "1";
  } else {
    btn.disabled = false;
    btn.innerText = "加入購物車";
    btn.classList.remove("failToCart");
    restStock.textContent = "庫存 " + num + " 件";
    restStock.style.opacity = "1";
  }
}


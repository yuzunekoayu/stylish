document.addEventListener("DOMContentLoaded", () => {
  
  toggleClass(document.querySelectorAll('.item'), "activeTab");
  
  let prodURL = new URL(window.location);
  kwsk(prodURL.search);

  classObserver(document.querySelector('#prodColors'), "sikaku");
  classObserver(document.querySelector('#prodSizes'), "sml");

});
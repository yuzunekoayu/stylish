document.addEventListener("DOMContentLoaded", () => {
    toggleNav(document.querySelectorAll('.item'));

    catalog('all', 0);

    const tabs = document.querySelectorAll('.item');
    for (let i = 0; i < tabs.length; i++) {
        let tab = tabs[i].id;

        function tabListen(e) {
            if (e.currentTarget.id === tab) {
                clear();
                catalog(tab);
            } else {
                console.log(e.currentTarget.id);
            }
        }
        
        tabs[i].addEventListener('click', tabListen);
    }

    const btnSubmit = document.getElementById('btnSubmit');
    btnSubmit.addEventListener('click', () => {
        let inputWord = document.getElementById("input").value;
        if (inputWord.length > 0) {
            clear();
            search(inputWord, 0);
        } else {
            return
        }
        console.log(inputWord);
    });

    let inputField = document.getElementById("input");
    inputField.addEventListener("keypress", (e) => {
        if (e.keyCode === 13) {
        btnSubmit.click();
        inputField.value = "";
        }
    });


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
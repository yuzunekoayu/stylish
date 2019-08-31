// eslint no-unused-vars: ["error",{"vars": "local"}]
// global startCycle pauseCycle plusSlides currentSlide slides dots

let slideIndex = 1;
// let dotIndex = 0;

// 等靜態 HTML DOM 長好了才開始跑
document.addEventListener("DOMContentLoaded", () => {
  
    // 初始畫面
    campaigns();
    // 判斷網址是否有 category 或 tag 參數，有的話就要跑出正確畫面（方便各 Page 共用 NavBar）
    let url = new URL(location.href);
    let catas = url.searchParams.get('category');
    let tag = url.searchParams.get('tag');
    if (catas === 'women') {
        document.querySelectorAll(".item")[0].classList.add("activeTab");
        catalog("women");
    } else if (catas === 'men') {
        document.querySelectorAll(".item")[1].classList.add("activeTab");
        catalog("men");
    } else if (catas === 'accessories') {
        document.querySelectorAll(".item")[2].classList.add("activeTab");
        catalog("accessories");
    } else if (tag !== null ) {
        search(tag);
    } else {
        catalog("all");
    }

    // 按 tab 變字體顏色
    toggleMutiple(document.querySelectorAll('.item'), "activeTab", "A");

    // 把 tab id 當作網址的 End Point 傳給 Fetch，按到哪個 tab 就傳那個 tab 的 id 
    const tabs = document.querySelectorAll('.item');
    for (let i = 0; i < tabs.length; i++) {   
        tabs[i].addEventListener('click', function (e) {
            if (e.currentTarget.id === tabs[i].id) {
                clear(document.getElementById('row'));
                catalog(tabs[i].id);
            } else {
                console.log(e.currentTarget.id);
                console.log(tabs[i].id);
            }
        });
    }
});

// 輪播 CallBcak
let pause = null;

function startCycle() {
    if (pause === null) {
        pause = setInterval(plusSlides, 10000);
    }
}

function pauseCycle () { 
    clearInterval(pause);
    pause = null;
}

function plusSlides() {
    showSlides(slideIndex += 1);
}

function currentSlide(e) {
    let nav = parseInt(e.target.getAttribute('data-navdot'));
    showSlides(slideIndex = nav);
    startCycle();
}

function showSlides(n) {
    if (n > slides.length) {
        slideIndex = n % slides.length;
    }
    if (n < 1) {
        slideIndex = (n + 1) % slides.length;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList = "slide out";
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace("dot activeDot", "dot");
    }
    slides[slideIndex - 1].classList = "slide in";
    dots[slideIndex - 1].className += " activeDot";
}
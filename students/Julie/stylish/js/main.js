let slideIndex = 1;
// let dotIndex = 0;

// 等靜態 HTML DOM 長好了才開始跑
document.addEventListener("DOMContentLoaded", () => {
  
    // 初始畫面
    campaigns();
    // 判斷網址是否有 category 或 tag 參數，有的話就要跑出正確畫面（方便各 Page 共用 NavBar）
    let url = new URL(location.href)
    let catas = url.searchParams.get('category');
    let tag = url.searchParams.get('tag');
    if (catas === 'women') {
        console.log(catas);
        catalog("women");
    } else if (catas === 'men') {
        console.log(catas);
        catalog("men");
    } else if (catas === 'accessories') {
        console.log(catas);
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

});

// 輪播 CallBcak
function plusSlides() {
    showSlides(slideIndex += 1);
}

function currentSlide(e) {
    showSlides(slideIndex = e.target.getAttribute('data-navdot'));
}

function showSlides(n) {
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList = "slide out";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace("dot activeDot", "dot");
    }
    slides[slideIndex - 1].classList = "slide in";
    dots[slideIndex - 1].className += " activeDot";
}
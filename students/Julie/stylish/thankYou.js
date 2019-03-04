document.addEventListener("DOMContentLoaded", () => {
    
    toggleMutiple(document.querySelectorAll('.item'), "activeTab", "A");
    
    // 將網址裡的訂單編號取下來
    let url = new URL(location.href);
    let orderNum = url.searchParams.get('orderNum');
    
    // 顯示訂單編號
    const tellOrederNum = document.querySelector('#tellOrederNum');
    tellOrederNum.textContent = orderNum;

    // 返回首頁按鈕
    const backToIndex = document.querySelector('#backToIndex');
    backToIndex.addEventListener('click', () => {
        window.location.href = "index.html";
    })

});
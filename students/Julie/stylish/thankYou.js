document.addEventListener("DOMContentLoaded", () => {
    
    toggleMutiple(document.querySelectorAll('.item'), "activeTab", "A");
    
    let url = new URL(location.href);
    let orderNum = url.searchParams.get('orderNum');
    
});
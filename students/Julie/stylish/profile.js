// 各 Page Nav Bar 會員小 icon（PC & mobile版）
const memberIcon = document.querySelector('.member');
const mobileMemberIcon = document.querySelector('.smIcon');

// Profile Page 登入按鈕、會員資料畫面
const profileNotIn = document.querySelector('#profileNotIn');
const profileCard = document.querySelector('#profileCard');

// Profile Page 使用者大頭貼、姓名、email 欄
const userIcon = document.querySelector('#profileIcon');
const userName = document.querySelector('#profileName');
const userEmail = document.querySelector('#profileEmail');

// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

// 初始化 FB SDK 套件
window.fbAsyncInit = function() {
    FB.init({
        appId      : '541771016312048',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.2'
    });

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
        console.log("權杖", statusChangeCallback(response));
    });
};

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {

    if (response.status === 'connected') {
        let access_token = response.authResponse.accessToken;
        // 如果使用者已登入
        if ( window.location.href.indexOf("profile") > -1) {
            // 顯示 Profile 給使用者看
            profileNotIn.style.display = "none";
            profileCard.style.display = "flex";
        }
        testAPI();
        return access_token;
    } else {
        // 沒登入，或情況不明，給使用者看登入按鈕
        profileNotIn.style.display = "flex";
    }
}

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api("/me?fields=id, name, email", function(response) {
        // 如果我在 Profile Page 的話。
        if ( window.location.href.indexOf("profile") > -1) {
            // 先變 NavBar 小 icon
            memberIcon.style.background = `url(https://graph.facebook.com/${response.id}/picture?type=small) no-repeat`;
            mobileMemberIcon.style.background = `url(https://graph.facebook.com/${response.id}/picture?type=small) no-repeat`;
        
            // 大頭貼圖片網址（有 id 就可取得的方法）
            let userIconImg = `https://graph.facebook.com/${response.id}/picture?type=large`;
            
            // 將相對應的 div 變成正確內容。
            userIcon.style.background = `url(${userIconImg}) no-repeat`;
            userIcon.style.backgrooundSize = "100%";
            userName.textContent = response.name;
            userEmail.textContent = response.email;
        } else {
            // 變 NavBar 小 icon 就好
            memberIcon.style.background = `url(https://graph.facebook.com/${response.id}/picture?type=small) no-repeat`;
            mobileMemberIcon.style.background = `url(https://graph.facebook.com/${response.id}/picture?type=small) no-repeat`;
        }
    });
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
    FB.login(function(response) {
        statusChangeCallback(response);
    }, {scope:"email"});
}

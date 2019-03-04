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
        console.log(response);
    });
};

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {

    const profileNotIn = document.querySelector('#profileNotIn');
    const profileCard = document.querySelector('#profileCard');
    let accessToken = response.authResponse.accessToken;
    
    console.log('statusChangeCallback');
    
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        profileNotIn.style.display = "none";
        profileCard.style.display = "flex";
        console.log("YOOO");
        testAPI();
    } else {
        // The person is not logged into your app or we are unable to tell.
        profileNotIn.style.display = "flex";
        // profileCard.style.display = "none";
        console.log("NOT IN")
    }
}

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api("/me?fields=id, name, email", function(response) {
        console.log(response);
        const userIcon = document.querySelector('#profileIcon');
        let userIconImg = `https://graph.facebook.com/${response.id}/picture?type=large`;
        const userName = document.querySelector('#profileName');
        const userEmail = document.querySelector('#profileEmail');

        userIcon.style.backgroundImage = `url(${userIconImg})`;
        userName.textContent = response.name;
        userEmail.textContent = response.email;

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

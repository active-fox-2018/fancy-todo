window.fbAsyncInit = function() {
    FB.init({
      appId      : '2018306348223813',
      cookie     : true,
      xfbml      : true,
      version    : 'v3.2'
    });
      
    FB.AppEvents.logPageView();   
};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2&appId=566497860491041&autoLogAppEvents=1';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'))

function statusChangeCallback(response) {
    if (response.status === 'connected') {
        testAPI()
    } else {
        console.log('register')
    }
}

function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
        console.log(response)
        console.log('Successful login for: ' + response.name);
        $.ajax({
            url: "http://localhost:3000/users/authentication/facebook",
            method: 'POST',
            data: response
        })
        .done(function(ress) {
            console.log('========')
            localStorage.setItem('userId', res)
            localStorage.setItem('token', res.token)
        })
        .fail(function(err) {
            console.log(err)
        })

    });
}

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    })
}

function logout() {
    FB.logout(function(response) {
        // Person is now logged out
        localStorage.removeItem('userId')
    });
}

function flip(event){
	var element = event.currentTarget;
	if (element.className === "card") {
    if(element.style.transform == "rotateY(180deg)") {
      element.style.transform = "rotateY(0deg)";
    }
    else {
      element.style.transform = "rotateY(180deg)";
    }
  }
};

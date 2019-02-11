const url = 'http://localhost:3000'
alertify.set('notifier','position', 'top-right')

$(document).ready(
    isLogin()
)

function isLogin() {
    if(localStorage.token) {
        weatherForecast()
    }
}

function weatherForecast() {
    $.ajax({
        url: `${url}/weathers`,
        method: 'post',
        data: {
            city: $('#city').val()
        },
        headers: {
            token: localStorage.token
        }
    })
    .then((result) => {
        $('#city').val()
        $('#weatherInfo').html('')
        result.forEach(element => {
            $('#weatherInfo').append(`
            <div class="card mb-2">
                <div class="card-body">
                    <p>date: ${element.dt_txt}</p>
                    <p>weather: ${element.weather[0].main}</p>
                    <p>condition: ${element.weather[0].description}</p>
                </div>
            </div>
            `)  
        });
    }).catch((err) => {
        console.log(err)
    });
}

// function isLogin() {
//     if(localStorage.token) {
//         $('.form').hide()
//         $('#home').show()
//         getAllTask()
//         getAllGroup()
//         notifInvitation()
//     } else {
//         $('.form').show()
//         $('#home').hide()
//     }
// }

function onSuccess(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/gauth',
        data: {
            token: id_token
        }
    })
    .done(result => {
        localStorage.setItem('token', result.token)
        localStorage.setItem('id', result.id)
        getAllTask() 
        getAllGroup()
        $('.form').hide()
        $('#home').show()  
    })
    .fail(err => {
        console.log(err)
    })
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
}

function onFailure(error) {
    Swal.fire({
        type: 'danger',
        title: 'Login Failed',
        showConfirmButton: false,
        timer: 1500
        })
    console.log(error);
}
function renderButton() {
    gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });
}

$('#loginForm').submit(function(e) {
    e.preventDefault()
    $.ajax({
        url: `${url}/login`,
        method: 'post',
        data: {
            email: $('#emailLogin').val(),
            password: $('#passLogin').val(),
        }
    })
    .done((result) => {
        Swal.fire({
            type: 'success',
            title: 'Login Success',
            showConfirmButton: false,
            timer: 1500
          })
        localStorage.setItem('token', result.token)
        localStorage.setItem('id', result.id)
        getAllTask() 
        getAllGroup()
        setTimeout(() => {
            $('.form').hide()
            $('#home').show()  
        }, 1000)
    })
    .fail((err) => {
        
        $('#infoLogin').html(`
        <div class="alert alert-dismissible alert-danger">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            ${err.responseJSON.msg}
        </div>
        `)
    });
})

$('#regisForm').submit(function(e) {
    e.preventDefault()
    $.ajax({
        url: `${url}/users`,
        method: 'post',
        data: {
            name: $('#nameRegis').val(),
            email: $('#emailRegis').val(),
            password: $('#passRegis').val()
        }
    })
    .done(result => {
        Swal.fire({
            type: 'success',
            title: 'Register Success',
            showConfirmButton: false,
            timer: 1500
          })
        $('#nameRegis').val(''),
        $('#emailRegis').val(''),
        $('#passRegis').val('')
    })
    .fail(err => {
        if(err.responseJSON.email) {
            $('#infoRegis').html(`
            <div class="alert alert-dismissible alert-danger">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                ${err.responseJSON.email.message.slice(5)}
            </div>
            `)
        }
        if(err.responseJSON.password) {
            $('#infoRegis').html(`
            <div class="alert alert-dismissible alert-danger">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                ${err.responseJSON.password.message.slice(5)}
            </div>
            `)
        }
        if(err.responseJSON.email && err.responseJSON.password) {
            $('#infoRegis').html(`
            <div class="alert alert-dismissible alert-danger">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                ${err.responseJSON.password.message.slice(5)}
            </div>
            <div class="alert alert-dismissible alert-danger">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                ${err.responseJSON.email.message.slice(5)}
            </div>
            `)
        }
    })
})

function logOut () {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      localStorage.clear()
      $('.form').show()
      $('#home').hide()
    });
}
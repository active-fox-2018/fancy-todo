let personalData = {}

// check()

function check() {
    console.log('masuk check');
    
    if (localStorage.getItem('token') != null) {
        $.post('http://localhost:3000/verify', { token: localStorage.getItem('token') })
            .done(response => {
                personalData = response.data
                // console.log(response);
                return $.get(`http://localhost:3000/fancytodo/${personalData.email}`)
                    .done(response => {
                        console.log(response[0].todoList, "====================");

                        $("nav").show()
                        $('#login-form').hide()
                        response[0].todoList.forEach(list => {
                            console.log(list);
                            $('.main-page').append(`
                            <div class="card w-50">
                            <div class="card-body">
                            <p>${list.name}</p>
                            <p>${list.description}</p>
                            <p>${list.dueDate}</p>
                            <p>${list.status}</p>                          
                            <a href="#" class="btn btn-primary" onClick ="updateTodo('${list._id}')">complete</a>
                            <a href="#" class="btn btn-primary" onClick ="deleteTodo('${list._id}')">delete</a>
                          </div>
                        </div>`)

                        })

                    })


            })
            .fail(err => {
                // console.log(err,"=================");

                swal("you don't have access")
                $("nav").hide()
                $('#login-form').show()
                $('.main-page').hide()
            })

    } else {
        $("nav").hide()
        $('#login-form').show()
        $('.main-page').hide()
    }
}


$('#login-form').submit(function (event) {
    event.preventDefault()
    personalData.email = $('#loginEmail').val(),
        personalData.password = $('#loginPassword').val()
    // return $.post(`http://localhost:3000/fancytodo`, {user : user})
    $.post('http://localhost:3000/signin', {
        email: $('#loginEmail').val(),
        password: $('#loginPassword').val()

    })
        .done(response => {
            localStorage.setItem('token', response.token)
            // console.log(response, "===============");
            check()
            // $("nav").show()
            // 
            // $('.main-page').show(`<div id="row">masuuuuuuuuuuuuuuuuuuuuuuukkkkkkkkkkkkkkkkkkk</div>`)

        })
        .fail(err => {
            swal('wrong password')
            // console.log(err);

        })
})

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.post(`http://localhost:3000/google`, { id_token })
        .done(response => {
            console.log(response);

            localStorage.setItem('token', response.token)
            check()
            // $("nav").show()
            // $('#login-form').hide()
            // $('.main-page').show(`<div id="row">masuuuuuuuuuuuuuuuuuuuuuuukkkkkkkkkkkkkkkkkkk</div>`)

        })
        .fail(err => {
            swal('opps, our server is busy, please try again')
            // console.log(err);

        })

}



function signOut() {
    console.log('masuk sini');

    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        localStorage.removeItem('token')
        check()

    });
}

function signup() {
    // $('#login-form').hide()
    $('#signup-form').append(` <form id="signup-form">
    <div class="form-group">
        <label>First Name:</label>
        <input type="text" class="form-control" id="first_name">
      </div>
      <div class="form-group">
        <label>Last Name:</label>
        <input type="text" class="form-control" id="last_name">
      </div>
      <div class="form-group">
        <label for="email">Email address:</label>
        <input type="email" class="form-control" id="email">
      </div>
      <div class="form-group">
        <label for="pwd">Password:</label>
        <input type="password" class="form-control" id="pwd">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form> `)
}

$("#signup-form").submit(function (event) {
    event.preventDefault
    $.post(`http://localhost:3000/fancytodo`, {
        first_name: $('#first_name').val(),
        last_name: $('#last_name').val(),
        email: $('#email').val(),
        password: $('#pwd').val()
    })
        .done(response => {
            $("#signup-form").hide()
        })
        .fail(response => {
            swal('opps field cannot be blank')
        })
})

function todoform() {
    console.log('masukkkkkkkkkkk');

    $('#todo-form').append(`<form id="todo-form">
      <div class="form-group">
        <label>name:</label>
        <input type="text" class="form-control" id="name">
      </div>
        <div class="form-group">
        <label>description:</label>
        <input type="text" class="form-control" id="description">
    </div>
      <div class="form-group">
        <label>Due Date:</label>
        <input type="date" class="form-control" id="dueDate">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>`)
}

$("#todo-form").submit(function (event) {
    event.preventDefault
    $.ajax({
        url: `http://localhost:3000/fancytodo/${personalData.email}`,
        headers: {
            "token": localStorage.getItem('token')
        },
        data: {
            name: $('#name').val(),
            description : $('#description').val(),
            dueDate: $('#dueDate').val()
        },
        method: 'POST'
    })
        .done(Response => {
            console.log('masuk sini');
            
            check()
        })
        .fail(err => {
            swal('opps field cannot be blank')
            console.log(err)
        })
})

function updateTodo(id) {
    $.ajax({
        method: 'PATCH',
        url: `http://localhost:3000/fancytodo/${id}`,
        headers: {
            "token": localStorage.getItem('token')
        },
        data: {
            status: 'complete'
        }
    })
    .done(response => {
        check()
    })
    .fail(response => {
        swal('internal server error')
    })
}

function deleteTodo(id) {
    $.ajax({
        method: 'DELETE',
        url: `http://localhost:3000/fancytodo/${id}`,
        headers: {
            "token": localStorage.getItem('token')
        }
    })
    .done(response => {
        swal('todo deleted')
        check()
    })
    .fail(response => {
        swal('internal server error')
    })
}


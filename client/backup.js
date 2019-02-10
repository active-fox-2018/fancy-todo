

let personalData = {}

check()


function clean() {
    $('#project-form').empty()
    $('#todo-form').empty()
    $('#todo-project-form').empty()
    $('#manual-signup').hide()
    $("#todo-form").empty()
    $("#signup-form").empty()
    $("nav").show()
    $('#login-form').hide()
    $('#project-page').empty()
    $('.main-page').empty()
    $('#todo-header').empty()
    $('#todo-project-header').empty()
    $('#project-todo-list').empty()
    $('#project-page').empty()
    $('#add-member').empty()
}

function check() {
    console.log('masuk check');

    if (localStorage.getItem('token') != null) {
        $.post('http://localhost:3000/verify', { token: localStorage.getItem('token') })
            .done(response => {
                personalData = response.data
                // console.log(response);
                return $.get(`http://localhost:3000/fancytodo/${personalData.email}`)
                    .done(response => {
                        clean()
                        $('#todo-header').append(`<h3>your todo lists</h3>`)
                        response[0].todoList.forEach(list => {
                            if (list.status == 'complete') {
                                $('.main-page').append(` 
                            <div class="card w-50">
                            <div class="card-body">
                            <p>${list.name}</p>
                            <p>${list.description}</p>
                            <p>${list.dueDate}</p>
                            <p>${list.status}</p>                          
                            <a href="#" class="btn btn-primary" onClick ="deleteTodo('${list._id}')">delete</a>
                          </div>
                        </div>`)
                            } else {
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
                            }
                        })
                    })
            })
            .fail(err => {
                clean()
                $("nav").hide()
                $('#login-form').show()
                $('#manual-signup').show()
            })

    } else {
        console.log('masuk sini');
        
        clean()
        $("nav").hide()
        $('#login-form').append(`  <form id="login-form"></form>
        <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="loginEmail" aria-describedby="emailHelp"
                placeholder="Enter email" name="email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="loginPassword" placeholder="Password" autocomplete="off">
        </div>

        <button type="submit" class="btn btn-primary">login</button>
        <div class="g-signin2" data-onsuccess="onSignIn"></div>
        </form>`)
        $('#manual-signup').show()
    }
}


$('#login-form').submit(function (event) {
    console.log('masuk login form');
    
    event.preventDefault()
    $.post('http://localhost:3000/signin', {
        email: $('#loginEmail').val(),
        password: $('#loginPassword').val()

    })
        .done(response => {
            console.log('masuk');
            
            localStorage.setItem('token', response.token)
            check()
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
            localStorage.setItem('token', response.token)
            check()
        })
        .fail(err => {
            swal('opps, our server is busy, please try again')
        })

}



function signOut() {

    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        localStorage.removeItem('token')
        check()

    });
}

function signup() {
    $('#login-form').hide()
    $('#manual-signup').hide()
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
            $('#signup-form').empty()
            check()
        })
        .fail(response => {
            swal('opps field cannot be blank')
        })
})

function todoform() {
    clean()

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
        url: `http://localhost:3000/fancytodo/todo`,
        headers: {
            "token": localStorage.getItem('token')
        },
        data: {
            name: $('#name').val(),
            description: $('#description').val(),
            dueDate: $('#dueDate').val(),
            email: personalData.email,
            owner: 'user'
        },
        method: 'POST'
    })
        .done(Response => {
            $('#todo-form').empty()
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


function projectForm() {

    $('.main-page').hide()
    $('#project-form').append(`
    <form id="project-form">
      <div class="form-group">
        <label>project name:</label>
        <input type="text" class="form-control" id="name">
      </div>
        <div class="form-group">
        <label>project description:</label>
        <input type="text" class="form-control" id="description">
    </div>
      <div class="form-group">
        <label>Due Date:</label>
        <input type="date" class="form-control" id="dueDate">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>`)
}


$('#project-form').submit(function (event) {
    event.preventDefault
    $.ajax({
        method: 'POST',
        url: `http://localhost:3000/projectTodo`,
        data: {
            name: $('#name').val(),
            description: $('#description').val(),
            dueDate: $('#dueDate').val(),
            admin: personalData._id
        },
        headers: {
            "token": localStorage.getItem('token')
        }
    })
        .done(response => {
            getProject()

        })
        .fail(response => {
            swal('internal server error')
        })
})

function getProject() {
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/projectTodo/${personalData.email}`,
        headers: {
            "token": localStorage.getItem('token')
        }

    })
        .done(response => {
            clean()
            $('#todo-project-header').append(`<h3>your project list</h3>`)
            $('#project-page').append(`<a href ="#" onClick="projectForm()">add new project<a>`)
            response.data[0].projects.forEach(project => {
                console.log(project, "=========================");

                $('#project-page').append(`
                <div class="card w-50">
                <div class="card-body">
                <p>${project.name}</p>
                <p>${project.description}</p>
                <p>${project.dueDate}</p>                          
                <a href="#" class="btn btn-primary" onClick ="updateProject('${project._id}')">add member</a>
                <a href="#" class="btn btn-primary" onClick ="getTodoProject('${project._id}')">see project todo list</a>
                </div>
                </div>`)
            })

        })
        .fail(response => {
            swal('internal server error')
        })
}

function getTodoProject(id) {
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/projectTodoList/${id}`,
        headers: {
            'token': localStorage.getItem('token')
        }
    })
        .done(response => {

            if (response.data.todoList.length == 0) {
                clean()
                $('#project-todo-list').append(`<p>your project has no active todo list</p>
            <p><a href="#" onClick ="todoFormProject('${response.data._id}')">add new todolist</a>`)
            } else {
                clean()
                response.data.todoList.forEach(todo => {
                    console.log(todo);

                    $('#project-todo-list').append(`
                <div class="card w-50">
                <div class="card-body">
                <p>${todo.name}</p>
                <p>${todo.description}</p>
                <p>${todo.dueDate}</p>                          
                <a href="#" class="btn btn-primary" onClick ="updateProject('${todo._id}')">delete</a>
                <a href="#" class="btn btn-primary" onClick ="getTodoProject('${todo._id}')">complete</a>
                </div>
                </div>`)
                })
            }

        })
        .fail(response => {
            console.log(response);

        })
}

function todoFormProject(input) {

    clean()

    $('#todo-project-form').append(`<form id="todo-form">
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
      <input class="form-control" id="project_id" value="${input}">
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>`)

}

$("#todo-project-form").submit(function (event) {
    event.preventDefault
    $.ajax({
        url: `http://localhost:3000/fancytodo/todo`,
        headers: {
            "token": localStorage.getItem('token')
        },
        data: {
            name: $('#name').val(),
            description: $('#description').val(),
            dueDate: $('#dueDate').val(),
            id: $('#project_id').val(),
            owner: 'project'

        },
        method: 'POST'
    })
        .done(Response => {
            // $('#todo-form').empty()
            getProject()
        })
        .fail(err => {
            swal('opps field cannot be blank')
            console.log(err)
        })
})




function updateProject(project) {
    console.log(project, "===============");

    $('#add-member').append(`
    <form id="add-member">
    <div class="form-group">
      <label>your team email:</label>
      <input value="${project}" id="id" type="hidden">
      <input type="text" class="form-control" id="email-member">
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>`)
}

$('#add-member').submit(function (event) {
    event.preventDefault
    let email = $('#email-member').val()
    let id = $(`#id`).val()
    console.log(id, email);

    $.ajax({
        method: 'PATCH',
        url: `http://localhost:3000/projectTodo/${id}`,
        data: {
            email: email
        },
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done(data => {
            getProject()

        })
        .fail(err => {
            swal("opps, make sure you input right email")
        })
})
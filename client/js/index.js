const url = "http://localhost:3000"

function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token
    $.post(`${url}/googleLogin`, {token: id_token})
        .done(response => {
            localStorage.setItem('token', response.token)
            checkLogin()
        })
        .fail(err => {
            console.log(err);
        })
}

//<a href="#" onclick="signOut();">Sign out</a>
//<script>
//  function signOut() {
//    var auth2 = gapi.auth2.getAuthInstance();
//    auth2.signOut().then(function () {
//      console.log('User signed out.');
//    });
//  }
//</script>

$("#signup").click(function() {
    $("#first").fadeOut("fast", function() {
        $("#second").fadeIn("fast");
    });
});

$("#signin").click(function() {
    $("#second").fadeOut("fast", function() {
        $("#first").fadeIn("fast");
    });
});

$("form[name='login']").submit(function(e) {
    e.preventDefault();
}).validate({
    rules: {
        email: {
            required: true,
            email: true
        },
        password: {
            required: true,
        }
    },
    messages: {
        email: "Please enter a valid email address",
        password: {
            required: "Please enter password",
        }
    },
    submitHandler: function(form) {
        // console.log(form);
        let data = {
            email: $("#emailLogin").val(),
            password: $("#passwordLogin").val()
        }
        $.ajax({
            type: "post",
            url: `${url}/login`,
            data: data
        })
            .then(response => {
                console.log(response);

            })
            .catch(err => {
                console.log(err);

            })
    }
});

$("form[name='registration']").submit(function(e) {
    e.preventDefault();
}).validate({
    rules: {
        fullname: "required",
        email: {
            required: true,
            email: true
        },
        password: {
            required: true,
        }
    },
    messages: {
        fullname: "Please enter your fullname",
        password: {
            required: "Please provide a password",
        },
        email: "Please enter a valid email address"
    },
    submitHandler: function(form) {
        let data = {
            name: $("#fullname").val(),
            email: $("#emailRegister").val(),
            password: $("#passwordRegister").val()
        }
        $.ajax({
            type: "post",
            url: `${url}/register`,
            data: data
        })
            .then(response => {
                console.log(response);
                $("#second").fadeOut("fast", function() {
                    $("#first").fadeIn("fast");
                });
            })
            .catch(err => {
                console.log(err);
            })
    }
});

checkLogin()

function checkLogin() {
    if (localStorage.getItem('token')) {
        getMyTodos()
        getMyProjects()
        $('#loginRegister').hide()
        $('#myProjectDetail').hide()
        $('#mainPage').show()
        $('#myTodoDetail').show()
    } else {
        $('#loginRegister').show()
        $('#mainPage').hide()
    }
}

function getMyTodos() {
    $.ajax({
        url: `${url}/todos`,
        headers: {token: localStorage.getItem('token')}
    })
        .then(todos => {
            $("#myTodos").empty()
            todos.forEach(e => {
                $("#myTodos").append(`
                <div class="card mx-3 my-3">
                  <div class="card-header" style="font-family: 'Kaushan Script', cursive;">${e.name}</div>
                  <div class="card-body">
                    <p class="card-text">${e.description}</p>
                    <p class="card-text"><b>Status:</b> ${e.status}</p>
                    <p class="card-text"><b>Due date:</b> ${e.due_date}</p>
                    <div class=" text-right">
                        <button type="button" onclick="updateTodo('${e._id}')" class="btn btn-primary btn-sm mx-1" data-toggle="modal" data-target="#todoForm">edit</button>
                        <button type="button" onclick="deleteTodo('${e._id}')" class="btn btn-danger btn-sm mx-1">delete</button>
                    </div>
                  </div>
                </div>`)
            });
        })
        .catch(err => {
            console.log(err);
        })
}

function createTodo() {
    clearForm()
    $("form[name='todoForm']").submit(function(e) {
        e.preventDefault()
    }).validate({
        rules: {
            todoName: "required",
            todoDescription: "required",
            todoDueDate: "required",
        },
        messages: {
            todoName: "Please enter your todo name",
            todoDescription: "Please enter your todo description",
            todoDueDate: "Please enter your todo due date",
        },
        submitHandler: function(form) {
            let data = {
                name: $("#todoName").val(),
                description: $("#todoDescription").val(),
                due_date: new Date($("#todoDueDate").val()),
                status: $('#status input:radio:checked').val()
            }
            // console.log(data);
            $.ajax({
                type: "post",
                url: `${url}/todos`,
                data: data,
                headers: {token: localStorage.getItem('token')}
            })
                .then(response => {
                    // console.log(response);
                    getMyTodos()
                    $('#todoForm').modal('hide')
                    clearForm()
                })
                .catch(err => {
                    console.log(err);
                })
        }
    })
}

function updateTodo(todoId) {
    $.ajax({
        url: `${url}/todos/${todoId}`,
        headers: {token: localStorage.getItem('token')}
    })
    .then(todo => {
        $("#todoName").val(todo.name)
        $("#todoDescription").val(todo.description)
    })
    .catch(err => {
        console.log(err);
    })
    $("form[name='todoForm']").submit(function(e) {
        e.preventDefault()
        console.log($('#statusy input:radio:checked').val());

        let data = {
            name: $("#todoName").val(),
            description: $("#todoDescription").val(),
            due_date: new Date($("#todoDueDate").val()),
            status: $('#status input:radio:checked').val()
        }
        $.ajax({
            type: "put",
            url: `${url}/todos/${todoId}`,
            data: data,
            headers: {token: localStorage.getItem('token')}
        })
            .then(response => {
                // console.log(response);
                getMyTodos()
                $('#todoForm').modal('hide')
                clearForm()
            })
            .catch(err => {
                console.log(err);
            })
    })
}

function deleteTodo(todoId) {
    $.ajax({
        type: "delete",
        url: `${url}/todos/${todoId}`,
        headers: {token: localStorage.getItem('token')}
    })
        .then(response => {
            // console.log(response);
            getMyTodos()
        })
        .catch(err => {
            console.log(err);
        })
}

function getMyProjects() {
    $.ajax({
        url: `${url}/projects`,
        headers: {token: localStorage.getItem('token')}
    })
        .then(response => {
            // console.log(response);
            $("#myProjects").empty()
            response.forEach(e => {
                $("#myProjects").append(`<li><a href="#" onclick="projectDetail('${e._id}')">${e.name}</a></li>`)
            });
        })
        .catch(err => {
            console.log(err);
        })
}

function createProject() {
    $("form[name='projectForm']").submit(function(e) {
        e.preventDefault()
        let data = {
            name: $('#projectName').val()
        }
        $.ajax({
            type: 'post',
            url: `${url}/projects`,
            headers: {token: localStorage.getItem('token')},
            data: data
        })
            .then(reponse => {
                // console.log(reponse);
                getMyProjects()
                $('#projectForm').modal('hide')
            })
            .catch(err => {
                console.log(err);
            })
    })
}

function projectDetail(projectId) {
    $.ajax({
        url: `${url}/projects/${projectId}`,
        headers: {token: localStorage.getItem('token')}
    })
        .then(response => {
            // console.log(response);
            $("#projectTodos").empty()
            $("#projectMembers").empty()
            $("#projectTodos").append(`
            <button type="button" class="btn btn-primary btn-sm mx-3 mt-3" onclick="createProjectTodo('${projectId}')" data-toggle="modal" data-target="#todoForm">+ Create new todo</button>`)
            response.todos.forEach(todo => {
                $("#projectTodos").append(`
                <div class="card mx-3 my-3">
                  <div class="card-header" style="font-family: 'Kaushan Script', cursive;">${todo.name}</div>
                  <div class="card-body">
                    <p class="card-text">${todo.description}</p>
                    <div class=" text-right">
                      <button type="button" onclick="updateProjectTodo('${projectId}', '${todo._id}')" class="btn btn-primary btn-sm mx-1" data-toggle="modal" data-target="#todoForm">edit</button>
                      <button type="button" onclick="deleteProjectTodo('${projectId}', '${todo._id}')" class="btn btn-danger btn-sm mx-1">delete</button>
                    </div>
                  </div>
                </div>`)
            });
            $("#projectMembers").append(`
              <ul id="members">
              </ul>
            <button type="button" class="btn btn-primary mx-1" onclick="inviteMember('${projectId}')" data-toggle="modal" data-target="#inviteForm">Invite new member</button>`)
            response.members.forEach(member => {
                $("#members").append(`
                <li>${member.name}</li>`)
            });
            $('#myTodoDetail').hide()
            $('#myProjectDetail').show()
        })
        .catch(err => {
            console.log(err);
        })
}

function createProjectTodo(projectId) {
    clearForm()
    $("form[name='todoForm']").submit(function(e) {
        e.preventDefault()
    }).validate({
        rules: {
            todoName: "required",
            todoDescription: "required",
            todoDueDate: "required",
        },
        messages: {
            todoName: "Please enter your todo name",
            todoDescription: "Please enter your todo description",
            todoDueDate: "Please enter your todo due date",
        },
        submitHandler: function(form) {
            let data = {
                name: $("#todoName").val(),
                description: $("#todoDescription").val(),
                due_date: new Date($("#todoDueDate").val()),
                status: $('#status input:radio:checked').val()
            }
            // console.log(data);
            $.ajax({
                type: "post",
                url: `${url}/projects/${projectId}`,
                data: data,
                headers: {token: localStorage.getItem('token')}
            })
                .then(response => {
                    // console.log(response);
                    projectDetail(projectId)
                    $('#todoForm').modal('hide')
                    clearForm()
                })
                .catch(err => {
                    console.log(err);
                })
        }
    })
}

function updateProjectTodo(projectId, todoId) {
    $.ajax({
        url: `${url}/todos/${todoId}`,
        headers: {token: localStorage.getItem('token')}
    })
    .then(todo => {
        $("#todoName").val(todo.name)
        $("#todoDescription").val(todo.description)
    })
    .catch(err => {
        console.log(err);
    })
    $("form[name='todoForm']").submit(function(e) {
        e.preventDefault()
        let data = {
            name: $("#todoName").val(),
            description: $("#todoDescription").val(),
            due_date: new Date($("#todoDueDate").val()),
            status: $('#status input:radio:checked').val()
        }
        $.ajax({
            type: "put",
            url: `${url}/projects/${projectId}/${todoId}`,
            data: data,
            headers: {token: localStorage.getItem('token')}
        })
            .then(response => {
                console.log(response);
                projectDetail(projectId)
                $('#todoForm').modal('hide')
                clearForm()
            })
            .catch(err => {
                console.log(err);
            })
    })
}

function deleteProjectTodo(projectId, todoId) {
    $.ajax({
        type: "delete",
        url: `${url}/projects/${projectId}/${todoId}`,
        headers: {token: localStorage.getItem('token')}
    })
        .then(response => {
            console.log(response);
            projectDetail(projectId)
        })
        .catch(err => {
            console.log(err);
        })
}

function clearForm() {
    $("#todoName").val("")
    $("#todoDescription").val("")
    $("#todoDueDate").val("")
    $("#status").find('input').val("")
}

function inviteMember(projectId) {
    $("form[name='inviteForm']").submit(function(e) {
        e.preventDefault()
        let data = {
            email: $('#emailInvite').val()
        }
        $.ajax({
            type: "post",
            url: `${url}/projects/invite/${projectId}`,
            data: data,
            headers: {token: localStorage.getItem('token')}
        })
            .then(response => {
                // console.log(response);
                $("#emailInvite").val('')
                $('#inviteForm').modal('hide')
                // projectDetail(projectId)
            })
            .catch(err => {
                console.log(err);

            })
    })
}
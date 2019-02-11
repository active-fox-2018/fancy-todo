let url = `http://localhost:3000`

$(document).ready(() => {
    if(!localStorage.getItem('token')){
        getAuth()
    }   else{
        getHome()
    }
})

function getAuth(){
    $('#home').hide()
    $('#auth').show()
}

function getHome(){
    $('#home').show()
    $('#auth').hide()
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;
    
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    $.post(`http://${url}/users/googleAuth`, { id_token })
        .done(Response => {
            console.log('sign in success')
            localStorage.setItem('token', Response.token)
            getHome()
        })
    .fail(err => {
        console.log('err!')
            console.log(err)
        })

}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        localStorage.removeItem('token')
        getAuth()
    });
}

function createUser(){
    $('#formSignUp').submit(function (event) {
        event.preventDefault()
        // post request untuk menyimpan data repo baru
        $.post(`${url}/users/`, {
            name: $('#signUpName').val(),
            email: $('#signUpEmail').val(),
            password: $('#signUpPassword').val()
        })
            .done(function (response) {
                console.log(response)
                $('#todoList').append(`
          <div class="card mb-2" style="background-color:azure;font-family:'Flamenco'">
                <div class="card-body">
                    <h5 class="card-title"> ${response.data.name} </h5>
                    <p class="card-text">name: ${response.data.name}</p>
                    <p class="card-text">description: ${response.data.description}</p> 
                    <p class="card-text">status: ${response.data.status}</p> 
                    <p class="card-text">due date : ${response.data.dueDate}</p> 
                </div> 
            </div>
          `)
                $("#formCreate").slideToggle("slow");
            })
            .fail(function (err) {
                console.log(err)
            })
    })
}

function create() {
    // $.post(`http://localhost:3000/todos/`)
    // swal({
    //     title: "Todo Form",
    //     text: "This is a form",
    //     content: "input",
    //     // icon :"success",
    //     button: "submit form"
    // });
    $("#formCreate").slideToggle("slow");
    $('#formCreate').submit(function (event) {
        event.preventDefault()
        // post request untuk menyimpan data repo baru
        $.post(`${url}/todos/`, {
            name: $('#todoName').val(),
            description: $('#todoDescription').val(),
            dueDate: $('#dueDate').val()
        })
            .done(function (response) {
                console.log(response)
                $('#todoList').append(`
          <div class="card mb-2" style="background-color:azure;font-family:'Flamenco'">
                <div class="card-body">
                    <h5 class="card-title"> ${response.data.name} </h5>
                    <p class="card-text">name: ${response.data.name}</p>
                    <p class="card-text">description: ${response.data.description}</p> 
                    <p class="card-text">status: ${response.data.status}</p> 
                    <p class="card-text">due date : ${response.data.dueDate}</p> 
                </div> 
            </div>
          `)
                $("#formCreate").slideToggle("slow");
            })
            .fail(function (err) {
                console.log(err)
            })
    })

}

$('#findAll').click(function () {
    $('#todoList').empty()
    showAll()
})



function showAll() {
    $.get(`${url}/todos`)
        .done(responses => {
            $('#todoList').html(`please wait`)
            $('#todoList').empty()
            let i = 0
            responses.data.forEach(response => {
                // console.log(`ini response`, response)
                i += 1
                $('#todoList').append(`
                <div id="todo${i}" class="card mb-2" style="background-color:azure;font-family:'Flamenco'">
                <div class="card-body">
                    <h5 class="card-title"> #${i} ${response.name} </h5>
                    <p class="card-text">name: ${response.name}</p>
                    <p class="card-text">description: ${response.description}</p> 
                    <p id="response${i}" class="card-text">status: ${response.status}</p> 
                    <p class="card-text">due date : ${response.dueDate}</p> 
                </div>
                <div class="card-body">
                <button type="button" id="completed${i}" class="btn btn-success" >Finished</button>
                <button type="button" id="notCompleted${i}" class="btn btn-success" style="display:none" >Not Finished Yet</button>
                <button type="button" id="edit${i}" class="btn btn-primary" >Edit Todo</button>
                <button type="button" id="delete${i}" class="btn btn-danger" >Delete Todo</button>
                <div class="card-body" id="formEdit" style="display:none">
                    <form>
                        <div class="form-group">
                            <label for="name">What do you want to do? </label>
                            <input type="text" class="form-control" id="todoNewName" value=${response.name}>
                        </div>
                        <div class="form-group">
                            <label for="Description">How you want to do it?</label>
                            <textarea class="form-control" id="todoNewDescription" value=${response.description}></textarea>
                        </div>
                        <div class="form-group">
                            <label for="dueDate">Due Date</label>
                            <input type="date" class="form-control" id="newDueDate" value=${response.dueDate}>
                        </div>

                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
                </div>
            </div>
                `)
                $(`#completed${i}`).click(function () {
                    // $(`#response${i}`).val(response.status)
                    // $(`#completed${i}`).hide()
                    // $(`#notCompleted${i}`).show()
                    patchComplete(response._id)
                })
                $(`#notCompleted${i}`).click(function () {
                    $(`#notCompleted${i}`).hide()
                    $(`#completed${i}`).show()
                    // patchComplete(response_id)
                })
                $(`#edit${i}`).click(function(){
                    editTodo(response._id, i)
                })
                $(`#delete${i}`).click(function(){
                    deleteTodo(response._id)
                })
            })
        })
        .fail(err => {
            console.log(err)
        })
}

function patchComplete(id) {
    $.get(`${url}/todos/${id}`)
        .done(response => {
            console.log(response)
        })
    // let data = null
    // if(stats === 'uncompleted') {
    //     data = 'completed'
    // }
    // else {
    //     data = 'uncompleted'
    // }
    // $.put(`${url}/todos/${id}`, {
    //     status: data
    // })
    //     .done(response => {
    //         $(`#response${i}`).val(response.data.status)
    //     })
    //     .fail(err => {
    //         console.log(err)
    //     })

}

function editTodo(id, i) {
    $("#formEdit").slideToggle("slow")
    $('#formEdit').submit(function (event) {
        event.preventDefault()
        // post request untuk menyimpan data repo baru
        $.put(`${url}/todos/${id}`, {
            name: $('#todoNewName').val(),
            description: $('#todoNewDescription').val(),
            dueDate: $('#newDueDate').val()
        })
            .done(response => {
                $('#todoList').append(`
          <div class="card mb-2" style="background-color:azure;font-family:'Flamenco'">
                <div class="card-body">
                    <h5 class="card-title">${i} ${response.data.name} </h5>
                    <p class="card-text">name: ${response.data.name}</p>
                    <p class="card-text">description: ${response.data.description}</p> 
                    <p class="card-text">status: ${response.data.status}</p> 
                    <p class="card-text">due date : ${response.data.dueDate}</p> 
                </div> 
            </div>
          `)
                // $("#formEdit").slideToggle("slow");
            })
            .fail(err => {
                console.log(err)
            })

    })
}

function deleteTodo(id) {
    console.log('ini delete')
    $.delete(`${url}/todos/${id}`)
        .done(response => {
            console.log(response)
        })
        .fail(err => {
            console.log(err)
        })
}

const link = "http://localhost:3000/"
login()
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    var id_token = googleUser.getAuthResponse().id_token;
    
    $.post('http://localhost:3000/users/authentication/google', {id_token})
        .done((token) => {
            console.log(token)
            swal("Login Succeed","" ,"success");
            localStorage.setItem('token', `${token.token}`)
            localStorage.setItem('name', `${token.user.name}`)
            localStorage.setItem('email', `${token.user.email}`)
            localStorage.setItem('id', `${token.user._id}`)
            checkLogin()
   
        })
        .fail(err => {
            swal('Error',"" ,"error");
        })
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        localStorage.removeItem('token', 'name', 'email', 'id')
    });
    $('#homepage').show()
    $('#userpage').hide() 
}

function checkLogin() {
    if (localStorage.getItem('token')) {
        //check token to server
        $.ajax({
            url: `${link}users/authentication`,
            method: 'GET',
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .done((event) => {
            $('.dropdown-trigger').dropdown();
            $(document).ready(function () {
                $('#homepage').hide()
                $('#userpage').show()
                getTask()   
                getList()
                addList()
                addMember()
                addTask()
                $('#sidebarCollapse').on('click', function () {
                    $('#sidebar').toggleClass('active');
                    $(this).toggleClass('active');
                    $('select').formSelect();
                    $('.datepicker').pickadate({
                        selectMonths: true, 
                        selectYears: 15,
                        format: 'dd/mm/yyyy'
                    });
                      
                    $(function(){
                    console.log(new Date().toISOString().substring(0,10))
                    })           
                });
            });
        })
        .fail((err) => {
            register()
            $('#homepage').show()
            $('#userpage').hide()
        })
    } else {
        register()
        $('#homepage').show()
        $('#userpage').hide()
    }
}

function login() {
    $('#login').submit(function(event) {
        event.preventDefault()
        let user = {}
        for (let i = 0; i <= event.currentTarget.length-1; i++) {
            user[event.currentTarget[i].name] = event.currentTarget[i].value
        }

        $.ajax({
            url: `${link}users/login`,
            data: user,
            method: "POST",
        })
        .done(function(response) {
            swal("Login Succeed","" ,"success")
            localStorage.setItem('token', response.token)
            localStorage.setItem('id', response.user._id)
            localStorage.setItem('name', response.user.name)
            checkLogin()
        })
        .fail(function(err) {
            let errMsg = err.responseJSON.status
            swal(errMsg,"" ,"error");
        })
    })
}

function register() {
    $('#register').submit(function(event) {
        event.preventDefault()
        let newUSer = {}

        for (let i = 0; i <= event.currentTarget.length-1; i++) {
            newUSer[event.currentTarget[i].name] = event.currentTarget[i].value
        }

        $.ajax({
            url: `${link}users`, 
            data: newUSer,
            method: 'POST',
        })
        .done(function(user) {
            localStorage.setItem('token', user.token)
            localStorage.setItem('id',  user.user._id)
            localStorage.setItem('name', response.user.name)
            swal("Registration Succeed","" ,"success");
            checkLogin()

        })
        .fail(function(err) {
            let errMsg = err.responseJSON.msg
            swal(errMsg,"" ,"error");
        })
    })
}

function getList() {
    $.ajax({
        url: `${link}lists`,
        method: 'GET',
        headers: {
            token: localStorage.getItem('token'),
            id: localStorage.getItem('id')
        }
    })
    .done(function(response) {
        response.forEach(res => {
            let members = ''
            res.members.forEach(member => {
                members += `<p>${member.name}</p>`
            })                

            $('#allLists').append(
            `<div class="card-panel red lighten-1 z-depth-5" >
                <ul class="collection">
                    <div class="right">
                        <li onclick="editList('${res._id}')"><a><i class="material-icons">edit</i></a></li>
                        <li onclick="deleteList('${res._id}')"><a><i class="material-icons" >delete</i></a></li> 
                    </div>
                    
                    <li class="collection-item red lighten-1">
                        <h5 class="title " onclick="getTask('${res._id}', '${res.name}')" style="cursor:pointer"><em><strong>${res.name}</strong></em></h5>
                        <i class="material-icons" style="cursor:pointer">person_outline</i>
                        <div id=""members">
                            ${members}
                        </div>
                        <i class="material-icons">person_add</i>               
                        <form class="addMember">
                            <input style="border-radius: 15px" type="text"  name="email"  placeholder="Enter User Email">
                            <button onclick="addMember('${res._id}')" type="submit" class="btn btn-primary btn-flat" style="border-radius: 15px" >
                                Add Member
                            </button>   
                        </form>

                    </li>

                </ul>
            </div>`
            )
        })
    })
    .fail(function(err) {
        let errMsg = err.responseJSON.err.errors.name.message
        swal(errMsg,"" ,"error");
    })
}

function getTask(listId, listName) {
    if (!listName) {
        listName = 'Tasks'
    }
    $('#listname').empty()
    $('#listname').append(`
    <p>
        <h3>${listName} <a href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" data-toggle="collapse" class="btn-floating waves-effect waves-light right" ><i class="material-icons" >add</i></a></h3>
    </p>
    <div class="collapse" id="collapseExample">
        <div class="card card-body">
            <form id="addTask" >
                <div class="row">
                    <div class="input-field col s12">
                    <input id="taskname" type="text" >
                    <label for="name">Task</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                    <input id="description" type="text">
                    <label for="description">Description</label>
                    </div>
                </div>
        
                <input type="date" class="datepicker"> 
                <button onclick="addTask('${listId}', '${listName}')"  type="submit" class="btn btn-primary">Add Task</button>
            </form>
        </div>
    </div>
    `)
    $.ajax({
        url: `${link}lists/${listId}/tasks`,
        method: 'GET',
        headers: {
            token: localStorage.getItem('token'),
            id: localStorage.getItem('id')
        }
    })
    .done(function(response) {
        console.log('bdsbadkaskb dxcjasbdcj======', response)
        $('#tasks').empty()
        if (response.length === 0) {
            $('#tasks').empty()
        } else {
            response.forEach((res) => {
                $('#tasks').append(
                    `<div id="list${res._id}" class="card-panel teal lighten-4 z-depth-5">
                        <ul class="right">
                            <li ><a href=""><i class="material-icons">edit</i></a>     <a style="cursor:pointer" onclick="deleteTask('${res._id}', '${listId}', '${listName}')"><i class="material-icons" >delete</i></a></li>
                        </ul>   
                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                        <label class="form-check-label" for="defaultCheck1">
                            ${res.name}
                            <br>
                            ${Date(res.dueDate)}
                        </label>  
                    </div>`
                )
       
            })
                
        } 
    })
    .fail(function(err) {
        console.log(err)
        // swal(err,"" ,"error")
    })

}

function addList() {
    $('#addList').on("submit", function(event) {
        event.preventDefault()
        console.log('============')
        console.log(event.currentTarget)
        $.ajax({
            url:`${link}lists`,
            method: 'POST',
            headers: {
                token: localStorage.getItem('token'),
                id: localStorage.getItem('id')
            },
            data: {
                master: localStorage.getItem('id'),
                name: event.currentTarget[0].value,
                members: localStorage.getItem('id')
            }
        })
        .done(function(response) {    
            console.log('=======fsdfsdds', response._id)
            $('#allLists').append(
                `<div id="list${response._id}" class="card-panel red lighten-1 z-depth-5" >
                    <ul class="collection">
                        <div class="right">
                            <li onclick="editList('${response._id}')"><a><i class="material-icons">edit</i></a></li>
                            <li onclick="deleteList('${response._id}')"><a><i class="material-icons" >delete</i></a></li> 
                        </div>
                        
                        <li class="collection-item red lighten-1" >
                            <h5 class="title" onclick="getTask('${response._id}','${response.name}')" style="cursor:pointer" ><em><strong>${response.name}</strong></em></h5>
                            <i class="dropdown-trigger material-icons" data-target="dropdown1"  style="cursor:pointer">person_outline</i>
                            <div id=""members">
                                <p>${localStorage.getItem('name')}</p>
                            </div>
                            <i class="material-icons" >person_add</i>               
                        <form class="addMember">
                            <input style="border-radius: 15px" type="text"  name="email"  placeholder="Enter User Email">
                            <button  onclick="addMember('${response._id}')" type="submit" class="btn btn-primary btn-flat" style="border-radius: 15px" >
                                Add Member
                            </button>   
                        </form>
                        </li>
                        
                    </ul>
                </div>`
            )
            swal("Successfully Added a New List","" ,"success");

        })
        .fail(function(err) {

            let errMsg = err.responseJSON.err.errors.name.message
            swal(errMsg,"" ,"error");

        })
    })
   
}

function addMember(listId) {
    $('.addMember').submit(function(event){
        event.preventDefault()
        let memberEmail = event.currentTarget[0].value
        $.ajax({
            url: `${link}lists/${listId}`,
            method: 'PUT',
            headers: {
                token: localStorage.getItem('token'),
                id: localStorage.getItem('id')
            },
            data: {email: memberEmail}
        })
        .done(function(response) {
            $(`#allLists`).empty()
            getList()
            swal(response.status,"" ,"success");
        })
        .fail(function(err) {
            let errMsg = err.responseJSON.status
            swal(errMsg,"" ,"error");
        })
    });
}

function deleteTask(taskId, listId, listName) {
    $.ajax({
        url: `${link}lists/${listId}/${taskId}`,
        method: 'DELETE',
        headers: {
            token: localStorage.getItem('token'),
            id: localStorage.getItem('id')
        },
    })
    .done(function(response) {
        $("#tasks").empty()
        getTask(listId, listName)
    })
    .fail(function(err) {
        console.log(err)
    })
}

function deleteList(listId) {
    $.ajax({
        url: `${link}lists/${listId}`,
        method: 'DELETE',
        headers: {
            token: localStorage.getItem('token'),
            id: localStorage.getItem('id')
        },
    })
    .done(function(response) {
        event.preventDefault()
        $(`#allLists`).empty()
        getList()
        swal("Successfully Deleted a List","" ,"success");

    })
    .fail(function(err) {
        console.log(err.responseJSON.status)
        let errMsg = err.responseJSON.status
        swal(errMsg,"" ,"error");
        
    })
}

function addTask(listId, listName) {
    console.log('========', listId, listName)
    $("#addTask").submit(function(event) {
        event.preventDefault()
        let task = {
            name: event.currentTarget[0].value,
            description: event.currentTarget[1].value,
            dueDate: event.currentTarget[2].value,
            listId: listId
        }
        console.log(task)
        $.ajax({
            url: `${link}lists/${listId}/tasks`,
            method: 'POST',
            headers: {
                token: localStorage.getItem('token'),
                id: localStorage.getItem('id')
            },
            data: task
        })
        .done(function(response) {
            $('#tasks').append(
                `<div id="list${listId}" class="card-panel teal lighten-4 z-depth-5">
                    <div>
                        <ul class="right">
                            <li ><a href=""><i class="material-icons">edit</i></a>     <a style="cursor:pointer" onclick="deteleTask('${response._id}', '${listId}', '${listName}')"><i class="material-icons" >delete</i></a></li>
                        </ul>   
                        <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                        <label class="form-check-label" for="defaultCheck1">
                            ${listName}
                            <br>
                            ${Date(event.currentTarget[2].value)}
                        </label>  
                    </div>
                </div>`
            )
            swal("Successfully Added a Task","" ,"success");

        })
        .fail(function(err) {
            swal(err.responseJSON.status, "" ,"error");
        })
    })
}


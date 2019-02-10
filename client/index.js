let url = `http://localhost:3000`
let user = {}
let myProjects = []
let allProjects = []
let tasks = []
let myTask = []

$("#taskDeadline").attr('value', parseDate(new Date))
$(document).ready(
    cekLogin()
)

// USER
function cekLogin () {
    if (!localStorage.token){
        $('#signOutButton').hide()
        // $('#home').hide()
    } else {
        getUser(appendUser)
        getTask()
        setTimeout(() => {
            appendTask(myTask)
            getAllProjects()
            appendProjects(allProjects)
        }, 100)
        // if (user) {
        //     $('#home').show()
        //     $('#signOutButton').show()
        // }
    }
}

function getUser (cb) {
    $.ajax({
        type: 'get',
        url: `${url}/users`,
        headers: {
            token: localStorage.token
        }
    })
    .done(data => {
        user = data
        $('#home').show()
        $('#signOutButton').show()
        cb(data)
    })
    .fail(err => {
        console.error(err)
    })
}

function appendUser (user) {
    user = user
    $('#userInfo').empty()
    $('#userInfo').append(`
    <!-- PROFILE -->
    <div class="jumbotron ml-3 mt-1" style="margin-bottom: 0; padding: 7px; width: 100%">
        <div class="row ml-1">
            <div class="col-4">
                <img style="border-radius: 50%; width: 70px; height: 70px" src="${user.image}" alt="user image" >
            </div>
            <div class="col" style="width: 100%">
                <h5>${user.name}</h5>
            </div>
        </div>
        <hr>
        <div class="row ml-1">
           <h6>Tasks: ${myTask.length} </h6>
        </div>
        <div class="row ml-1">
           <h6 >Projects:</h6>
           <h2 style="cursor: pointer" class="text-right col" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"> <i class="fas fa-folder-plus"></i> </h2>
        </div>
        <div class="row ml-1">
            <div id="projectList" > </div>
        </div>
    </div>
    `)
     
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        user = {}
        localStorage.removeItem('token')
        $('#home').hide()
        $('#signInButton').show()
        $('#signOutButton').hide()
    });
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        type: 'post',
        url: `${url}/users/gooSign`,
        data: {
            id_token
        }
    })
    .done(success => {
        localStorage.setItem('token', success.token)
        user = success.data
        cekLogin()
        $('#home').show()
        $('#signInButton').hide()
        $('#signOutButton').show()
    })
    .fail(err => {
        console.error(err)
    })
}

// TASK
function getTask () {
    $.ajax({
        type: 'get',
        url: `${url}/tasks`,
        headers: {
            token: localStorage.token
        }
    })
    .done(data => {
        tasks = data
        myTask = data.filter(el => String(el.user._id) == String(user._id))
        // console.log(tasks)

        // console.log(myTask)
    })
    .fail(err => {
        console.log(err)
    })
}

function appendTask (tasks = myTask) {
    $('#content').empty()
    $('#content').append(`
    <div class="card-columns" style="column-count: 2" id="cardList">
        <div id="cards"> </div>
    </div>
    `)
    tasks.forEach(task => {
        $('#cards').append(`
        <!-- CARD LIST -->
            <div class="card text-white bg-primary mb-3 ml-1 mt-1" style="width: 100%">
                <div class="card-header">
                    <div class="row"> 
                        <h4 class="text-white col">
                        ${task.title}
                        </h4>
                        <div style="cursor: pointer"  data-toggle="modal" data-target="#editTaskModal" onclick="editTask('${task._id}', '${task.title}', '${task.description}', '${task.deadline}')" class="col-1" > <i class="fas fa-edit"></i> </div>
                        <div style="cursor: pointer" onclick="deleteTask('${task._id}')" class="col-1" > <i class="far fa-trash-alt"></i> </div>
                    </div>
                </div>
                <small class="text-muted ml-3" > ${ new Date(task.deadline).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric' })} </small>
                <div class="card-body">
                    <p class="card-text">${task.description}</p>
                </div>
            </div>
        `)
    })
}

function deleteTask (id) {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this task!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            $.ajax({
                type: 'delete',
                url: `${url}/tasks/${id}`,
                headers: {
                    token: localStorage.token
                }
            })
            .done(success => {
                swal("Poof! Your task has been deleted!", {
                    icon: "success",
                  });
                getTask()
                setTimeout(() => {
                    appendTask()

                }, 100)
            })
            .fail(err => {
                swal('Sorry', `${err.responseJSON.msg}`, 'error')
                console.log(err)
            })
        }
      });
  
}

function parseDate (date) {
    var today = new Date(date);
    var dd = today.getDate();
    var mm = today.getMonth()+1
    var yyyy = today.getFullYear();
    
    if(dd < 10){
        dd ='0'+ dd
    } 
    if(mm < 10){
        mm ='0'+ mm
    } 
    
    today = yyyy+'-'+mm+'-'+dd;
    return today
}


function editTask (id, title, description, deadline) {
    $("#editTaskTitle").val(`${title}`) 
    $("#editTaskDescription").val(`${description}`)
    $("#editTaskDeadline").attr('value', parseDate(deadline))

   $('#editTaskForm').submit(e => {
       e.preventDefault()

       let data = {
            title: $('#editTaskTitle').val(),
            description: $('#editTaskDescription').val(),
            deadline: $('#editTaskDeadline').val()
        }   
          $.ajax({
              type: 'put',
              url: `${url}/tasks/${id}`,
              headers: {
                  token: localStorage.token
              },
              data
          })
          .done(success => {
            swal({
                title: "Yeay!",
                text: "You edit this task",
                icon: "success",
            });
            $('#editTaskModal').modal('hide')
              getTask()
              setTimeout(() => {
                  appendTask(myTask)
              }, 100);
          })
          .fail(err => {
              console.log(err)
          })

   })
}

$('#createTaskForm').submit(e => {
    e.preventDefault()
    createPersonalTask()
})

function createPersonalTask () {
    $.ajax({
        type: 'post',
        url: `${url}/tasks`,
        headers: {
            token: localStorage.token
        },
        data: {
            title: $('#taskTitle').val(),
            description: $('#taskDescription').val(),
            deadline: $('#taskDeadline').val()
        }
    })
    .done(data => {
        $('#taskTitle').val('')
        $('#taskDescription').val('')
        $('#taskDeadline').val('')
        tasks.unshift(data)
        myTask.unshift(data)
        appendTask(myTask)
    })
    .fail(err => {
        console.log(err)
    })
}

// PROJECT
$('#createProjectForm').submit(e => {
    e.preventDefault()
    createProject()
})

function createProject () {
    let data = {
        name: $(`#projectTitle`).val(),
    }
    $.ajax({
        type: 'post',
        url: `${url}/projects`,
        headers: {
            token: localStorage.token
        },
        data
    })
    .done(success => {
        $(`#projectTitle`).val('')
        // allProjects.unshift(success)
        console.log(success, 'sukses create project')
        getAllProjects()
    })
    .fail(err => {
        console.log(err)
    })
}

function getAllProjects () {
    $.ajax({
        type: 'get',
        url: `${url}/projects`,
        headers: {
            token: localStorage.token
        }
    })
    .done(list => {
        allProjects = list
        appendProjects(allProjects)
        // myProjects = list.
        // console.log(list, 'ini list')
    })
    .fail(err => {
        console.log(err)
    })
}

function appendProjects (list) {
    $('#projectList').empty()
    list.forEach(project => {
        $('#projectList').append(`
            <button type="button" onclick="setProjectPage('${project._id}')" class="btn btn-primary mr-1 mb-1 btn-sm"> ${project.name} </button>
        `)
    })
}

function emptyProject () {
    $('#projectCard').empty()
}

function setProjectPage (id) {
    let project = allProjects.filter(el => String(el._id) == String(id))
    $('#projectCard').empty()
    $('#projectCard').append(`
    <div class="card text-white bg-primary mb-3 ml-1 mt-1" style="width: 100%">
        <div class="card-header row">
            <h3 class="text-white col">
            ${project[0].name}
            </h3>
            <div style="cursor: pointer" data-toggle="modal" data-target="#addMemberModal" class="col-1" ><h3 class="text-white" > <i class="fas fa-users"></i> </h3></div>
            <div style="cursor: pointer" data-toggle="modal" data-target="#addProjectTaskModal" class="col-1" ><h3 class="text-white" > <i class="fas fa-tasks"></i> </h3></div>
        </div>
        <div class="card-body">
        <h4 class="text-white" >Members: </h4>
        <div id="memberList"> </div>
        </div>
    </div>
    `)
    $('#memberList').empty()
    project[0].member.forEach(el => {
        $('#memberList').append(`
            <img class="m-2" style="border-radius: 50%; width: 70px; height: 70px" src="${el.image}" alt="user image" >
        `)
    })

    appendTask(project[0].task)

    $('#addProjectTaskForm').submit(e => {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: `${url}/tasks/project`,
            headers: {
                token: localStorage.token
            },
            data: {
                title: $('#addProjectTaskTitle').val(),
                description: $('#addProjectTaskDescription').val(),
                deadline: $('#addProjectTaskDeadline').val(),
                project: id
            }
        })
        .done(success => {
            let projectTask = allProjects.filter(el => String(el._id) == String(id))
            projectTask[0].task.unshift(success)
            appendTask(projectTask[0].task)
            $('#addProjectTaskModal').modal('hide')
        })
        .fail(err => {
            console.log(err)
        })
    })

    $('#addMemberForm').submit(e => {
        e.preventDefault()
        $.ajax({
            type: 'put',
            url: `${url}/projects/${id}/add`,
            headers: {
                token: localStorage.token
            },
            data: {
                member: $('#member').val()
            }
        })
        .done(success => {
            $('#addMemberModal').modal('hide')
            $('#memberList').append(`
                <img class="m-2" style="border-radius: 50%; width: 70px; height: 70px" src="${success.pic}" alt="user image" >
            `)
        })
        .fail(err => {
            if (err.status == 400) {
                $('#addMemberModal').modal('hide')
            }
            swal('Sorry', `${err.responseJSON.msg}`, 'error')
        })
    })
}

function kickMember () {
    
}
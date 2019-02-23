const url = 'http://localhost:3000'
alertify.set('notifier','position', 'top-right')

let taskList = []
let taskListTemp = []
let incomingTask = []
let doneTask = []
let task = []

let groupList = []
let projectTasks = []
let projectTask

if(localStorage.token) {
    $('.form').hide()
    $('#home').show()
    getAllTask()
    getAllGroup()
    notifInvitation()
} else {
    $('.form').show()
    $('#home').hide()
}

function dateFormat(input) {
    if(!input) {
        return '-'
    } else {
        let splitDate = input.slice(0, 10).split('-')
        switch(splitDate[1]) {
          case '01': return `${splitDate[2] } Jan ${splitDate[0]}` ; break;
          case '02': return `${splitDate[2] } Feb ${splitDate[0]}` ; break;
          case '03': return `${splitDate[2] } Mar ${splitDate[0]}` ; break;
          case '04': return `${splitDate[2] } Apr ${splitDate[0]}` ; break;
          case '05': return `${splitDate[2] } May ${splitDate[0]}` ; break;
          case '06': return `${splitDate[2] } Jun ${splitDate[0]}` ; break;
          case '07': return `${splitDate[2] } Jul ${splitDate[0]}` ; break;
          case '08': return `${splitDate[2] } Aug ${splitDate[0]}` ; break;
          case '09': return `${splitDate[2] } Sep ${splitDate[0]}` ; break;
          case '10': return `${splitDate[2] } Oct ${splitDate[0]}` ; break;
          case '11': return `${splitDate[2] } Nov ${splitDate[0]}` ; break;
          case '12': return `${splitDate[2] } Des ${splitDate[0]}` ; break;
        }
    }
}

function deleteProjectTask(pTaskId) {
    $.ajax({
        url: `${url}/projecttasks/${pTaskId}`,
        method: 'delete',
        headers: {
            token: localStorage.token
        },
    })
    .done(result => {
        let deleted = projectTasks.filter((element) => {
            return element._id !== result._id
        })
        showProjectTask(deleted)
    })
    .fail(err => {
        console.log(err)
    })
}

function updateProjectTask () {
    $.ajax({
        url: `${url}/projecttasks/${projectTask._id}`,
        method: 'put',
        headers: {
            token: localStorage.token
        },
        data: {
            title: $('#titlePUpdt').val(),
            description: $('#descPUpdt').val(),
            dueDate: $('#dueDatePUpdt').val()
        }
    })
    .done(result => {
        let indexUpdt = projectTasks.findIndex(element => 
            element._id == result._id
        )
        projectTasks.splice(indexUpdt, 1, result)
        showProjectTask(projectTasks)
        $('#titlePUpdt').val(''),
        $('#descPUpdt').val(''),
        $('#dueDatePUpdt').val('')
    })
    .fail(err => {
        console.log(err)
    })  
}

function finishedProjectTask(pTaskId) {
    $.ajax({
        url: `${url}/projecttasks/${pTaskId}`,
        method: 'put',
        headers: {
            token: localStorage.token
        },
        data: {
            status: 'done'
        },
    })
    .done(result => {
        // alertify.success('Task Finished!')
        let indexUpdt = projectTasks.findIndex(element => 
            element._id == result._id
        )
        projectTasks.splice(indexUpdt, 1, result)
        showProjectTask(projectTasks)
        $('#finishedPTask').prop('disabled', true)
    })
    .fail(err => {
        console.log(err)
    })
}

function findOneProjectTask(pTaskId) {
    $.ajax({
        url: `${url}/projecttasks/${pTaskId}`,
        method: 'get',
        headers: {
            token: localStorage.token
        }
    })
    .then(result => {
        projectTask = result
        $('#titlePUpdt').val(result.title)
        $('#descPUpdt').val(result.description)
        if(!result.dueDate) {
            $('#datePUpdt').val('-')
        } else {
            $('#datePUpdt').val(dateFormat(result.dueDate))
        }
        console.log(result)
    })
    .catch(err => {
        console.log(err)
    })
}

function taskPIncoming() {
    let incoming = projectTasks.filter((element) => {
        return element.status == 'incoming'
    })
    showProjectTask(incoming)
}

function taskPDone() {
    let done = projectTasks.filter((element) => {
        return element.status == 'done'
    })
    showProjectTask(done)
}

function getAllPTask() {
    showProjectTask(projectTasks)
}

function searchPTask() {
    let keyword = new RegExp(`${$('#titlePKeyword').val()}`)
    let data = projectTasks.filter( function(element) {
            return element.title.match(keyword)
        })
    $('#titlePKeyword').val('')
    showProjectTask(data)
}

function showProjectTask(input) {
    $('#projectTaskList').html('')
    $('#projectTaskList').append(`
    <div class="btn-group mb-2" role="group" aria-label="Basic example" style="float:right">
        <button type="button" class="btn" onclick="getAllPTask()">All Tasks</button>
        <button type="button" class="btn" onclick="taskPIncoming()">Incoming</button>
        <button type="button" class="btn" onclick="taskPDone()">Done</button>
    </div>
    <div class="input-group mb-3">
        <input type="text" class="form-control" id="titlePKeyword" placeholder="search task title..." aria-label="Recipient's username" aria-describedby="button-addon2">
        <div class="input-group-append">
            <button onclick="searchPTask()" class="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
        </div>
    </div>
    `)
    input.forEach(task => {
        $('#projectTaskList').append(`
        <div class="card w-100 mb-2" style="background:url('./assets/bg-card.png');">
            <div class="card-body">
                <h5 class="card-title">${task.title} <span class="badge" style="float:right; font-size:12px;"><img src="./assets/push-pin.png"></span>  <span class="badge badge-secondary">${task.status}</span> 
                </h5>
                <hr>
                <p class="card-text">${task.description}</p>
                <p>Due Date: ${dateFormat(task.dueDate)} </p>
                <hr>
                <button 
                    type="button" 
                    data-toggle="tooltip" 
                    data-placement="top" 
                    title="Delete Task" 
                    style="background:none; border:none; float:right;"
                    onclick="deleteProjectTask('${task._id}')"
                    >
                    <img src="./assets/delete.png">
                </button>
    
                <button 
                    type="button" 
                    data-placement="top" 
                    title="Update Task" 
                    style="background:none; border:none; float:right;"
                    data-toggle="modal" 
                    data-target="#updateProjectModal"
                    onclick="findOneProjectTask('${task._id}')"
                    >
                    <img src="./assets/edit.png">
                </button>
    
    
                <button 
                    type="button" 
                    data-placement="top" 
                    title="Finished Task"
                    id="finishedPTask" 
                    style="background:none; border:none; float:right;"
                    onclick="finishedProjectTask('${task._id}')"
                    >
                <img src="./assets/finish.png">
                </button>
                <p style="font-size:14px; padding-top:5px;">created at: ${dateFormat(task.createdAt)}</p>
            </div>
        </div>
        `)
    })
}

function createProjectTask(projectId) {
    $.ajax({
        url: `${url}/projecttasks`,
        method: 'post',
        data: {
            projectId: projectId,
            title: $('#projectTName').val(),
            description: $('#projectDesc').val(),
            dueDate: $('#dueDateProject').val()
        },
        headers: {
            token: localStorage.token
        }
    })
    .done(result => {
        $('#projectTName').val(''),
        $('#projectDesc').val(''),
        $('#dueDateProject').empty()
        projectTasks.unshift(result)
        showProjectTask(projectTasks)
    })
    .fail(err => {
        console.log(err)
    })
}

function getProjectTask(projectId) {
    $.ajax({
        url: `${url}/projecttasks`,
        method: 'get',
        headers: {
            token: localStorage.token,
            projectId: projectId
        },
    })
    .done(result => {
        projectTasks = result
        showProjectTask(projectTasks)
    })
    .fail(err => {
        console.log(err)
    })
}

function createProject() {
    $.ajax({
        url: `${url}/projects`,
        method: 'post',
        headers: {
            token: localStorage.token
        },
        data: {
            name: $('#projectName').val() 
        }
    })
    .done(result => {
        alertify.success('Success Create New Project')
        $('#projectName').val('')
        groupList.push(result)
        showGroups(groupList)
        console.log(result)
    })
    .fail(err => {
        console.log(err)
    })
}

function getAllGroup() {
    $.ajax({
        url: `${url}/projects`,
        method: 'get',
        headers: {
            token: localStorage.token
        }
    })
    .done(result => {
        groupList = result
        showGroups(groupList)
    })
    .fail(err => {
        console.log(err)
    })
}

function showProjectTodo(projectId) {
    getProjectTask(projectId)
    $('#projectTodo').html('')
    $('#projectTodo').append(`
    <p>
        <button 
            class="btn" 
            type="button" 
            data-toggle="collapse" 
            data-target="#projectTask" 
            aria-expanded="false" 
            aria-controls="collapseExample"
            style="width:345px;"
            >
            Create New Project Task
        </button>
    </p>
    <div class="collapse" id="projectTask">
        <div class="card card-body" style="background: url('https://webgradients.com/public/webgradients_png/008%20Rainy%20Ashville.png') no-repeat center center fixed">
            <div class="form-group">
                <input type="text" class="form-control" id="projectTName" placeholder="Enter task title">
            </div>
            <div class="form-group">
                <input type="text" class="form-control" id="projectDesc" placeholder="Enter task description">
            </div>
            <div class="form-group">
                <input type="date" class="form-control" id="dueDateProject">
            </div>
            <button onclick="createProjectTask('${projectId}')" type="submit" class="btn">Create</button>
        </div>
    </div>
    <hr>
    `)
}

function deleteProject(projectId) {
    $.ajax({
        url: `${url}/projects/${projectId}`,
        method: 'delete',
        headers: {
            token: localStorage.token
        }
    })
    .then(result => {
        alertify.success('You deleted this project')
        let deletedProject = groupList.filter(element => {
            return element._id !== result._id
        })
        groupList = deletedProject
        showGroups(deletedProject)
    })
    .fail(err => {
        alertify.warning(err.responseJSON.msg)
    })
}

function showGroups(input) {
    $('#groupList').html('')
    input.reverse()
    let index = 0
    input.forEach(element => {
        $('#groupList').append(`
        <div class="accordion" id="accordionExample${index}">
            <div class="card">
                <div onclick="showProjectTodo('${element._id}')" class="card-header" id="headingOne" data-toggle="collapse" data-target="#collapseOne${index}" aria-expanded="true" aria-controls="collapseOne">
                    <h5 class="mb-0">
                        ${element.name}
                    </h5>
                </div>
                
                <div id="collapseOne${index}" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample${index}">
                    <div class="card-body">
                        <div class="form-group">
                            <label>Invite New Member</label>
                            <input type="email" class="form-control" id="memberEmail${index}" placeholder="Enter user email" style="height:33px; border:1px solid grey; border-radius:3px; font-size:14px;">
                            <button onclick="sendInvitation('${element._id}', $('#memberEmail${index}').val())" type="button" class=" btn-outline-primary btn-sm btn-block mt-1">Send Invitation</button>
                        </div>
                        <p>member list:</p>
                        <div id="member${index}"></div>
                    </div>
                    <button style="border:none; background:none;" onclick="deleteProject('${element._id}',)"><span style="float:left;"><img src="./assets/delete.png"></span></button>
                </div>
            </div>
        </div>
        `)
        $(`#member${index}`).html('')
        element.members.forEach(member => {
            $(`#member${index}`).append(`
            <p>${member.name} <span style="float:right"><button onclick="deleteProjectMember('${element._id}','${member._id}')"> <img src="./assets/kick.png" alt=""></button></span></p>
            `)
        })
        index++
    })
}

function deleteProjectMember(projectId, memberId) {
    $.ajax({
        url: `${url}/projects/remove-member/${projectId}`,
        method: 'patch',
        headers: {
            token: localStorage.token
        },
        data: {
            memberId: memberId
        }
    })
    .done(result => {
        // getAllGroup()
        let indexUpdt = groupList.findIndex(element => 
            element._id == result._id
        )
        groupList.splice(indexUpdt, 1, result)
        showGroups(groupList)
        console.log(result)
        console.log(groupList), '======'
    })
    .fail(err => {
        console.log(err)
    })
}

function notifInvitation() {
    $.ajax({
        url: `${url}/users/${localStorage.id}`,
        method: 'get',
        headers: {
            token: localStorage.token
        }
    })
    .then(result => {
        $('#notifInvit').html('')
        if(result.projectsInvitation.length > 0) {
            result.projectsInvitation.forEach((element, i) => {
                $(`#notifInvit`).append(`
                <div class="alert alert-success" id="notif${i}" role="alert">
                    You have new project invitation from - ${element.ownerName}
                    <button type="button" class="btn2" onclick="acceptInvit('${element._id}', 'notif${i}')">accept</button>
                    <button type="button" class="btn3" onclick="declinedInvit('${element._id}')">declined</button>
                </div>
                `)
            })
        }
    })
    .catch(err => {
        console.log(err)
    })
}

function acceptInvit(projectId, divId) {
    $.ajax({
        url: `${url}/projects/${projectId}`,
        method: 'patch',
        headers: {
            token: localStorage.token
        }
    })
    .done(result => {
        $(`#${divId}`).hide()
        getAllGroup()
    })
    .fail(err => {
        console.log(err)
    })
}

function sendInvitation(projectId, email) {
    $.ajax({
        url: `${url}/projects/invitation`,
        method: 'post',
        headers: {
            token: localStorage.token
        },
        data: {
            memberEmail: email,
            projectId: projectId
        }
    })
    .done(result => {
        alertify.success('success send invitation')
    })
    .fail(err => {
        if(err.responseJSON.msg === 'user not found') {
            alertify.warning('user not found')
        } else if (err.responseJSON.msg === 'sudah di invite') {
            alertify.warning(`this user is already invited`)
        } else if (err.responseJSON.msg === 'sudah masuk Project') {
            alertify.warning(`user already joined this group`)
        }
        console.log(err.responseJSON.msg, '===err')
    })
}

function taskIncoming() {
    // taskList = Object.assign(taskListTemp, taskListTemp)
    // taskList = [{...taskListTemp, prop: newOne}]
    // taskList = taskListTemp
    let incoming = taskList.filter((element) => {
        return element.status == 'incoming'
    })
    // taskList = incoming
    // incomingTask = incoming
    console.log(taskList, '===== task incoming')
    $('#taskList').html('')
    showTask(incoming)

}

function taskDone() {
    // taskList = [{...taskListTemp, prop: newOne}]
    // taskList = Object.assign(taskListTemp, taskListTemp)
    // taskList = taskListTemp
    let done = taskList.filter((element) => {
        return element.status == 'done'
    })
    // taskList = done
    $('#taskList').html('')
    showTask(done)
    // console.log(incoming)
}

function searchTask() {
    let keyword = new RegExp(`${$('#titleKeyword').val()}`)
    let data = taskList.filter( function(element) {
            return element.title.match(keyword)
        })
    $('#taskList').html('')
    $('#titleKeyword').val('')
    showTask(data)
}

function showTask(input) {
    // $('#taskList').html('')
    input.forEach(task => {
        $('#taskList').append(`
        <div class="card w-100 mb-2" style="background:url('./assets/bg-card.png');">
            <div class="card-body">
                <h5 class="card-title">${task.title} <span class="badge" style="float:right; font-size:12px;"><img src="./assets/push-pin.png"></span>  <span class="badge badge-secondary">${task.status}</span> 
                </h5>
                <hr>
                <p class="card-text">${task.description}</p>
                <p>Due Date: ${dateFormat(task.dueDate)} </p>
                <hr>
                <button 
                    type="button" 
                    data-toggle="tooltip" 
                    data-placement="top" 
                    title="Delete Task" 
                    style="background:none; border:none; float:right;"
                    onclick="deleteTask('${task._id}')"
                    >
                    <img src="./assets/delete.png">
                </button>

                <button 
                    type="button" 
                    data-placement="top" 
                    title="Update Task" 
                    style="background:none; border:none; float:right;"
                    data-toggle="modal" 
                    data-target="#updateModal"
                    onclick="findOneTask('${task._id}')"
                    >
                    <img src="./assets/edit.png">
                </button>


                <button 
                    type="button" 
                    data-placement="top" 
                    title="Finished Task"
                    id="finishedTask" 
                    style="background:none; border:none; float:right;"
                    onclick="finishedTask('${task._id}')"
                    >
                <img src="./assets/finish.png">
                </button>
                <p style="font-size:14px; padding-top:5px;">created at: ${dateFormat(task.createdAt)}</p>
            </div>
        </div>
        `)
    })
}

function finishedTask (id) {
    $.ajax({
        url: `${url}/tasks/${id}`,
        method: 'put',
        data: {
            status: 'done'
        },
        headers: {
            token: localStorage.token
        }
    })
    .done(result => {
        alertify.success('Task Finished!')
        let indexUpdt = taskList.findIndex(element => 
            element._id == result._id
        )
        taskList.splice(indexUpdt, 1, result)
        $('#taskList').html('')
        showTask(taskList)
        $('#finishedTask').prop('disabled', true)
    })
    .fail(err => {
        console.log(err)
    })
}

function getAllTask() {
    console.log('get all task')
    taskList = []
    $.ajax({
        url: `${url}/tasks`,
        method: 'get',
        headers: {
            token: localStorage.token
        }
    })
    .done(result => {
        taskList = [...result]
        taskListTemp = [...result]
        $('#taskList').html('')
        taskList.reverse()
        showTask(taskList)
    })
    .fail(err => {
        console.log(err)
    })
}

function createTask() {
    $.ajax({
        url: `${url}/tasks`,
        method: 'post',
        data: {
            title: $('#title').val(),
            description: $('#desc').val(),
            dueDate: $('#dueDate').val()
        },
        headers: {
            token: localStorage.token
        }
    })
    .done(result => {
        taskList.unshift(result)
        taskListTemp.push(result)
        alertify.success('Success Add New Task')
        $('#taskList').html('')
        showTask(taskList)
        $('#title').val('')
        $('#desc').val('')
        $('#date').empty()
    })
    .fail(err => {
        console.log(err)
    })
}

function updateTask() {
    console.log('trigger update')
    $.ajax({
        url: `${url}/tasks/${task[0]._id}`,
        method: 'put',
        headers: {
            token: localStorage.token
        },
        data: {
            title: $('#titleUpdt').val(),
            description: $('#descUpdt').val(),
            dueDate: $('#dueDateUpdt').val()
        }
    })
    .done(result => {
        let indexUpdt = taskList.findIndex(element => 
            element._id == result._id
        )
        taskList.splice(indexUpdt, 1, result)
        $('#taskList').html('')
        showTask(taskList)
    })
    .fail(err => {
        console.log(err)
    })
}

function deleteTask(id) {
    $.ajax({
        url: `${url}/tasks/${id}`,
        method: 'delete',
        headers: {
            token: localStorage.token
        }
    })
    .done(result => {
        let deleted = taskList.filter((element) => {
            return element._id !== result._id
        })
        taskList = deleted
        $('#taskList').html('')
        showTask(deleted)
        // taskList = deleted
        // console.log(result)
    })
    .fail(err => {
        console.log(err)
    })
}

function findOneTask(id) {
    $.ajax({
        url: `${url}/tasks/${id}`,
        method: 'get',
        headers: {
            token: localStorage.token
        }
    })
    .done(result => {
        task = []
        task.push(result)
        $('#titleUpdt').val(result.title)
        $('#descUpdt').val(result.description)
        if(!result.dueDate) {
            $('#dateUpdt').val('-')
        } else {
            $('#dateUpdt').val(dateFormat(result.dueDate))
        }
    })
    .fail(err => {
        console.log(err)
    })
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
        setTimeout(() => {
            $('.form').hide()
            $('#home').show()  
        }, 1500)
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
        localStorage.clear()
        $('.form').show()
        $('#home').hide()
}

// gauth: (req, res) => {

//     clientInformation.verifyIdtoken({
//             idToken
//             audience: 
//         })
//         .then(ticket => {
//                 .json(ticket.payloa)
//             })
//             .catch(err => {
                
//                 })
//             }


// function getUser(cb) {
//     let data = {
//         a : 1,
//         b: 2
//     }
//     cb(data)
// }

// getUser(abc)

// function abc(user) {
//     console.log(user.a) // 1
//     console.log(user.b) // 2
// }
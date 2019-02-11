let taskList = []
let taskListTemp = []
let incomingTask = []
let doneTask = []
let task = []

$(document).ready(
    isLogin()
)

function isLogin() {
    if(localStorage.token) {
        $('.form').hide()
        $('#home').show()
        getAllTask()
    } else {
        $('.form').show()
        $('#home').hide()
    }
}


function taskIncoming() {
    let incoming = taskList.filter((element) => {
        return element.status == 'incoming'
    })
    showTask(incoming)
}

function taskDone() {
    let done = taskList.filter((element) => {
        return element.status == 'done'
    })
    showTask(done)
}

function searchTask() {
    let keyword = new RegExp(`${$('#titleKeyword').val()}`)
    let data = taskList.filter( function(element) {
            return element.title.match(keyword)
        })
    $('#titleKeyword').val('')
    showTask(data)
}

function showTask(input) {
    $('#taskList').html('')
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
        showTask(taskList)
        $('#finishedTask').prop('disabled', true)
    })
    .fail(err => {
        console.log(err)
    })
}

function getAllTask() {
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
        alertify.success('Task Updated')
        let indexUpdt = taskList.findIndex(element => 
            element._id == result._id
        )
        taskList.splice(indexUpdt, 1, result)
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
        alertify.success('Task Deleted')
        let deleted = taskList.filter((element) => {
            return element._id !== result._id
        })
        taskList = deleted
        showTask(deleted)
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
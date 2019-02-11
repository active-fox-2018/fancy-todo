
$('#AddTaskForm').submit((event) => {
  event.preventDefault()
  var body = {
    name: $("#task-name").val(),
    description: $("#description").val(),
    due_date: $("#due-date").val()
  }

  $.ajax({
    url: `${serverUrl}/todos`,
    headers: {
      "token": localStorage.getItem('token')
    },
    data: body,
    method: 'POST'
  })
    .done(()=> {
      $('#exampleModal3').modal('toggle')
      getHome()
    })
    .fail(err => {
      console.log(err.responseJSON.msg)
      $('#AddTaskError').html(`<h6 style="color:red;">${err.responseJSON.msg}</h6>`)
    })
})

function getList(data, tagName) {
  data.forEach(element => {
    $('.main-content').append(`
      <ul class="list-group list-group-flush">
        <li class="list-group-item d-flex justify-content-between align-items-center" id="listDone">
          <div><i class="btn far fa-square" id="taskDone" onclick="deleteTask('${element._id}','${tagName}')"></i>
            ${element.name}</div>
          <span><i class="btn far fa-comment" data-toggle="modal"
          data-target="#exampleModal4" data-id="${element._id}" data-name="${element.name}" data-date="${element.due_date}" data-description="${element.description}"></i></span>
        </li> 
      </ul>
    `)
  })
}

function getTag(tagName) {

  $('.main-content').empty()
  $('.main-content').append(`<h4 class="mt-3 mb-3">${tagName}</h4>`)

  if (tagName = "All Task") {
    $.ajax({
      url: `${serverUrl}/todos`,
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .done(Response => {
        console.log(Response.data)
        getList(Response.data, tagName)
      })
      .fail(err => {
        console.log(err)
      })
  }
}

function deleteTask(taskId, tagName) {
  $.ajax({
    url: `${serverUrl}/todos/${taskId}`,
    headers: {
      token: localStorage.getItem('token')
    },
    method: "DELETE"
  })
    .done(() => {
      $.when($('#listDone').fadeOut())
      .done(() => {
        getTag(tagName)
      })
    })
    .fail(err => {
      console.log(err)
    })
}

$('#exampleModal4').on('show.bs.modal', function(event){
  var button = $(event.relatedTarget)
  var id = button.data('id')
  var name = button.data('name')
  var date = button.data('date')
  var description = button.data('description')
  console.log("MODAL", name, date, description)

  var modal = $(this)
  modal.find('#EditTaskForm').val(id)
  modal.find('#task-name2').val(name)
  modal.find('#due-date2').val(date)
  modal.find('#description2').val(description)
})


$('#EditTaskForm').submit((event) => {
  event.preventDefault()
  var body = {
    name: $("#task-name2").val(),
    description: $("#description2").val(),
    due_date: $("#due-date2").val()
  }

  var taskId = $('#EditTaskForm').val()

  $.ajax({
    url: `${serverUrl}/todos/${taskId}`,
    headers: {
      "token": localStorage.getItem('token')
    },
    data: body,
    method: 'PUT'
  })
    .done(()=> {
      console.log("update success")
      $('#exampleModal4').modal('toggle')
      getHome()
    })
    .fail(err => {
      console.log(err)
      $('#EditTaskError').html(`<h6 style="color:red;">${err.statusText}</h6>`)
    })

})


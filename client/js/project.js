
function getAllProjectTodo(projectName) {

  $('.main-content').empty()

  if (projectName = "All Task") {
    $('.main-content').append(`<h4 class="mt-3 mb-3">All tasks in your projects </h4>`)
  } else {
    $('.main-content').append(`<h4 class="mt-3 mb-3">${projectName} </h4>`)
  }

  if (projectName == "All Task") {
    $.ajax({
      url: `${serverUrl}/projects`,
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .done(Response => {
        console.log("get all project todos", Response.data)
        Response.data.forEach(userproject => {
          getList(userproject.todos, projectName)
        })
      })
      .fail(err => {
        console.log(err)
      })
  }
}

function getProjectList() {
  $('#nav-projects').empty()
  $.ajax({
    url: `${serverUrl}/projects`,
    headers: {
      "token": localStorage.getItem('token')
    }
  })
    .done(Response => {
      $('#nav-projects').append(`
        <a class="nav-link active" data-toggle="pill" onclick="getAllProjectTodo('All Task')" href="#"><i
        class="fas fa-list-ul" style="color: green;"></i> All Task</a>
        <a class="nav-link" data-toggle="pill" href="#"><i class="fas fa-calendar-day"
            style="color: rgb(206, 77, 60);"></i>
          Today</a>
        <a class="nav-link" data-toggle="pill" href="#"><i class="far fa-star"
            style="color: rgb(250, 214, 54);"></i> Starred</a>
        <div>
          <hr>
        </div>
        <a class="nav-link" href="#" data-toggle="modal" data-target="#exampleModal5">+Add Projects</a>
      `)
      Response.data.forEach(project => {
       $('#nav-projects').append(`
          <a class="nav-link" data-toggle="pill" href="#" onclick="getAllProjectTodo('${project.name}')"><i class="fas fa-project-diagram"
            style="color: rgb(252, 99, 79);"></i> ${project.name}</a>
       `)
      })
    })
    .fail(err => {
      console.log(err)
    })
}

$('#AddProjectForm').submit((event) => {
  event.preventDefault()
  var body = {
    name: $("#project-name").val(),
    description: $("#description3").val(),
    due_date: $("#due-date3").val()
  }

  $.ajax({
    url: `${serverUrl}/projects`,
    headers: {
      "token": localStorage.getItem('token')
    },
    data: body,
    method: 'POST'
  })
    .done(() => {
      console.log("create project success")
      $('#exampleModal5').modal('toggle')
      getProjectList()
    })
    .fail(err => {
      console.log(err.responseJSON.msg)
      $('#AddProjectError').html(`<h6 style="color:red;">${err.responseJSON.msg}</h6>`)
    })

})

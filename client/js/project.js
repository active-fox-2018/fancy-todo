
function getAllProjectTodo(projectName){
  $('.main-content').empty()

  if(projectName = "All Task"){
    $('.main-content').append(`<h4 class="mt-3 mb-3">All tasks in your projects </h4>`)
  } else{
    $('.main-content').append(`<h4 class="mt-3 mb-3">All Tasks In Your ${projectName} </h4>`)
  }

  if (projectName == "All Task") {
    $.ajax({
      url: `${serverUrl}/todos?project`,
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .done(Response => {
        console.log("get all project todos",Response.data)
        // getList(Response.data, tagName)
      })
      .fail(err => {
        console.log(err)
      })
  }
}

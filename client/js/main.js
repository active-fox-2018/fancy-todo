const serverUrl = 'http://localhost:3000'

$(document).ready(() => {
  if (!localStorage.getItem('token')) {
    getAuth()
  } else {
    getHome()
  }
})

function getHome() {
  $('#auth').hide()
  $('#navbar').show()
  $('#home').show()
  getSideBar('personal')
}

function getSideBar(todoType) {
  if (todoType == "personal") {
    $('#projects-sidebar').hide()
    $('#personal-sidebar').show()
    getTag('All Task')
  } else {
    $('#projects-sidebar').show()
    $('#personal-sidebar').hide()
    getAllProjectTodo('All Task')
  }
}



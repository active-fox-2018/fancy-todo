$(".login-form").hide();
$(".login").css("background", "none");

$(".login").click(function () {
  $(".signup-form").hide();
  $(".login-form").show();
  $(".signup").css("background", "none");
  $(".login").css("background", "#fff");
});

$(".signup").click(function () {
  $(".signup-form").show();
  $(".login-form").hide();
  $(".login").css("background", "none");
  $(".signup").css("background", "#fff");
});

$(".btn").click(function () {
  $(".input").val("");
});

function onSuccess(googleUser) {
  var profile = googleUser.getBasicProfile();
  var id_token = googleUser.getAuthResponse().id_token;
  $.post('http://localhost:3000/verify_account', { id_token })
    .done(response => {
      localStorage.setItem('token', response);
      if (response) {
        $('.form-reg').hide();
        $('.list-group-item').show();
        $('#profileUser').show();
        readData();
      }
    })
    .fail(error => {
      console.log(error);
    });
}
function onFailure(error) {
  console.log(error);
}

function renderButton() {
  gapi.signin2.render('my-signin2', {
    'scope': 'profile email',
    'width': 370,
    'height': 42,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': onSuccess,
    'onfailure': onFailure
  });

}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    localStorage.clear();
    $('#profileUser').hide();
    $('.form-reg').show();
    $('.list-group-item').hide();
    $('.list-group-item').empty();
    $('#task').val('');
    $('#description').val('');
    $('date').val('');
  });
}

// Register User
function register() {
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/sign_up',
    data: {
      full_name: $('.full_name').val(),
      email: $('.email').val(),
      password: $('.password').val()
    }
  })
    .done(response => {
      console.log(response);
    })
    .fail(error => {
      console.log(error);
    })
}


// Login
function login() {
  $.ajax({
    url: 'http://localhost:3000/login',
    method: 'POST',
    data: {
      email: $('.email-login').val(),
      password: $('.password-login').val()
    }
  })
    .done(response => {
      localStorage.setItem('token', response);
      $('.form-reg').hide();
      $('.list-group-item').show();
      $('#profileUser').show();
      readData();

    })
    .fail(error => {
      console.log(error);
    })

}

// Create Todo
$('#submitForm').on('click', function (event) {
  event.preventDefault();
  $.ajax({
    url: 'http://localhost:3000/tasks',
    method: 'POST',
    headers: { token: localStorage.getItem('token') },
    data: {
      title: $('#task').val(),
      description: $('#description').val(),
      due_date: $('#date').val()
    }
  })
    .done(response => {
      $('.list-group-item').append(`
          <div class="list-todos mb-3">
            <p id="todo_id" hidden>${response.task._id}</p>
            <h4 class="list-group-item-title">${response.task.title}</h4>
            <p class="list-group-item-text">${response.task.description}</p>
            <p class="list-group-item-text due_date">Due date : ${response.task.due_date.slice(0, 10)}</p>
            <div class="list-btn">
              <a href="" class="btn btn-info btn-sm">
                <i class="fas fa-check"></i>
              </a>
              <a href="" id="update-task" class="btn btn-default btn-sm" onclick="showTaskUpdate('${response.task._id}','${response.task.title}','${response.task.description}', '${response.task.due_date}')">
                <i class="fas fa-edit"></i>
              </a>
              <a href="" class="btn btn-danger btn-sm delete-task" data-toggle="modal" data-target="#modalConfirmDelete" onclick="deleteTask('${response.task._id}')">
                <i class="fas fa-times"></i>
              </a>
            </div>
            </div>
          `)
      // after append
      $('#task').val('');
      $('#description').val('');
      $('#date').val('');
      $('#success').show().html(response.message);
      $('#field').hide();
      $('#login').hide();
    })
    .fail(error => {
      // console.log(error);
      if (error.status == 401) {
        $('#login').show().html(`${error.responseJSON.message}`);
        $('#task').val('');
        $('#description').val('');
        $('#date').val('');
      } else {
        $('#field').show().html(`${error.responseJSON.message}`);
        $('#task').val('');
        $('#description').val('');
        $('#date').val('');
      }
    });
});

// Read Todo
function readData() {
  $.ajax({
    url: 'http://localhost:3000/tasks',
    method: 'GET',
    headers: { token: localStorage.getItem('token') }
  })
    .done(response => {
      response.todos.forEach(todo => {
        // console.log(todo.due_date.slice(0,10));
        $('.list-group-item').append(
          `
              <div class="list-todos mb-3 todo-item">
              <p id="todo_id" hidden>${todo._id}</p>
              <h4 class="list-group-item-title">${todo.title}</h4>
              <p class="list-group-item-text">${todo.description}</p>
              <p class="list-group-item-text due_date">Due date : ${todo.due_date.slice(0, 10)}</p>
              <div class="list-btn">
                <a href="" class="btn btn-info btn-sm">
                  <i class="fas fa-check"></i>
                </a>
                <a href="" id="update-task" class="btn btn-default btn-sm" onclick="showTaskUpdate('${todo._id}','${todo.title}','${todo.description}', '${todo.due_date}')">
                  <i class="fas fa-edit"></i>
                </a>
                <a href="" class="btn btn-danger btn-sm delete-task" data-toggle="modal" data-target="#modalConfirmDelete" onclick="deleteTask('${todo._id}')">
                  <i class="fas fa-times"></i>
                </a>
              </div>
              </div>
              `
        )
        event.preventDefault();
      });
    })
    .fail(error => {
      console.log(error);
    });
}

// Update Todo
function showTaskUpdate(id, title, description, date) {
  event.preventDefault();
  $("#todo_id").val(id);
  $("#title_update").val(title);
  $("#description_update").val(description);
  $("#date_update").val(date.slice(0, 10));
  $('#updateTask').modal('show');
}

$('#updateForm').on('click', function (event) {
  event.preventDefault();
  $.ajax({
    url: 'http://localhost:3000/tasks',
    method: 'PUT',
    headers: { token: localStorage.getItem('token') },
    data: {
      _id: $("#todo_id").val(),
      title: $('#title_update').val(),
      description: $('#description_update').val(),
      due_date: $('#date_update').val()
    }
  })
    .done(response => {
      $('#success_update').show().html(response.message);
      $('.list-group-item').empty();
      $('#title_update').val('');
      $('#description_update').val('');
      $('#date_update').val('');
      $('#field').hide();
      $('#login').hide();
      readData();
    })
    .fail(error => {
      console.log(error);;
    });
});

// Delete
function deleteTask(id) {
  $("#todo_id").val(id);
}

$('#task_delete').on('click', function (event) {
  event.preventDefault();
  $.ajax({
    url: 'http://localhost:3000/tasks',
    method: 'DELETE',
    headers: { token: localStorage.getItem('token') },
    data: {
      _id: $("#todo_id").val()
    }
  })
    .done(response => {
      $('.list-group-item').empty();
      readData();
    })
    .fail(error => {
      console.log(error);
    });
});

// Show Modal
$(document).ready(function () {
  $('.show-addTask').on('click', function (event) {
    event.preventDefault();
    $('#addTask').modal('show');
  });
});

// Close use Esc key
$(document).keyup(function (e) {
  if (e.key === "Escape") {
    $('#task').val('');
    $('#description').val('');
    $('#date').val('');
    $('#field').hide();
    $('#login').hide();
    $('#success').hide();
    $('#success_update').hide();
  }
});

// Close use click
$('.closeForm').on('click', function (event) {
  $('#task').val('');
  $('#description').val('');
  $('#date').val('');
  $('#field').hide();
  $('#login').hide();
  $('#success').hide();
  $('#success_update').hide();
});

// Signout
$('.signout').on('click', function (event) {
  event.preventDefault();
});
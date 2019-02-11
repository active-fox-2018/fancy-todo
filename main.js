const url = 'http://localhost:3000'

$(".registerForm").hide()
$(".loginForm").hide()
$("#content").hide()

function registerForm() {
  $(".loginForm").hide()
  $("#home").hide()
  $(".registerForm").show()
}

function signIn() {
  $(".registerForm").hide()
  $(".loginForm").show()
  $("#home").hide()
}

function toHome() {
  $("#content").hide()
  $(".registerForm").hide()
  $(".loginForm").hide()
  $("#home").show()
}
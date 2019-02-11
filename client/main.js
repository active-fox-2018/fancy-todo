// function onSignIn(googleUser) {
//   var profile = googleUser.getBasicProfile();
//   var id_token = googleUser.getAuthResponse().id_token;
//   $.post('http://localhost:3000/verify_account', { id_token })
//     .done(response => {
//       console.log(response);
//     })
//     .fail(error => {

//     });
// }

// function signOut() {
//   var auth2 = gapi.auth2.getAuthInstance();
//   auth2.signOut().then(function () {
//     console.log('User signed out.');
//   });

//   function addTask() {
//     $.post
//   }

// }
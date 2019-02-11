function fetchProjects() {
    $.post('http://localhost:3000/verify', { token: localStorage.getItem('token') })
    .done(response => {
        let id = response.id
        if (!id) {
            swal("Validation Failed!", "Unauthorized Access", "error");
        } else {
            $('.jumbotron').hide()
            $('#buttonAllTodos').hide()
            $('#addNewTodo').hide()
            $('#edit-todo').hide()
            $('#signInButton').hide()
            $('#gSignIn').hide()
            $('#login_data').hide()
            $('#signup_form').hide()
            $('#allTodos').hide()
            $('#addProject').show()
        }
        $.get(`http://localhost:3000/users/${id}`)
        .done(response => {
            console.log(response)
            $('#project_name_').empty()
            $('#allProjects').show()
            response.forEach(p => {
                $('#project_name_').append(`
                    <td>${p.name}</td>
                `)
                $('#project_member_').empty()
                p.users.forEach(m => {
                    $('#project_member_').append(`
                        <li>${m}</li>
                    `)
                })
            });
        })
        .fail(err => {
            console.log(err)
        })
    })
    .fail(err => {
        console.log(err)
    })
}

$('#newProject-data').submit(function (event) {
    event.preventDefault()
})
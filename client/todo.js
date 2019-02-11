function fetchTodos() {
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
            $('#allTodos').show()
            $('#addProject').hide()
            $('#logout_button').show()
        }
        $.get(`http://localhost:3000/${id}`)
        .done(response => {
            console.log(response)
            $('#todos').empty()
            response.forEach(todo => {
            let statusChecking = `<input type="checkbox" name="checked" value="checked" id="checked"><br>`
            if (todo.status == 'checked') statusChecking = `<input type="checkbox" name="checked" value="checked" id="checked" checked><br>`
            let date = new Date(`${todo.due_date}`)
            let month = date.getMonth() + 1
            if ((date.getMonth() + 1) < 10) month = '0' + (date.getMonth() + 1)
            let full_date = `${date.getFullYear()}-${month}-${date.getDate()}`
                $('#todos').append(`
                <tr>
                    <td>${statusChecking}</td>
                    <td>${todo.name}</td>
                    <td>${todo.description}</td>
                    <td>${full_date}</td>
                    <td><a href="#" onclick="getDetail('${todo._id}')">Edit Todo</a> || <a href="#" onclick="deleteTodo('${todo._id}')">Delete Todo</a> </li></td>
                </tr>
                `)
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

function showFormAddTodo() {
    $('#addNewTodo').show()
}

$('#addNewTodo').submit(function (event) {
    event.preventDefault()
    $.post('http://localhost:3000/verify', { token: localStorage.getItem('token') })
    .done(response => {
        let id = response.id
        $.post('http://localhost:3000/todos', {
            name: $('#todo').val(),
            description: $('#desc').val(),
            user: id,
            due_date: $('#due_date').val()
        })
    })
    .done(response => {
        console.log(response)
        swal("Congratulations", "Todo has been added!", "success");
        homepage()
        fetchTodos()
    })
    .fail(err => {
        console.log(err)
    })  
})

//populate detail untuk update
function getDetail(id) {
    $('.jumbotron').hide()
    $('#buttonAllTodos').hide()
    $('#addNewTodo').hide()
    $('#edit-todo').show()
    $('#signInButton').hide()
    $('#gSignIn').hide()
    $('#login_data').hide()
    $('#signup_form').hide()
    $('#allTodos').show()
    $('#logout_button').show()
    $.get(`http://localhost:3000/todos/${id}`)
    .done(todo => {
        let date = new Date(`${todo.due_date}`)
        let month = date.getMonth() + 1
        let radio_status;
        if (todo.status == 'checked') {
            radio_status = 
            `<input type="checkbox" name="checked" value="checked" id="checked" checked>Done<br>`
        } else {
            radio_status = 
            `<input type="checkbox" name="checked" value="checked" id="checked">Done<br>`
        }
        let specDate = date.getDate()
        if ((date.getMonth() + 1) < 10) month = '0' + (date.getMonth() + 1)
        if (specDate < 10) specDate = '0' + (date.getDate())
        let full_date = `${date.getFullYear()}-${month}-${specDate}`
        $('#addNewTodo').hide()
        $('#edit-todo').empty()
        $('#edit-todo').append(`
        <form id="form-edit-todo">
            Name:
            <input type="text" value="${todo.name}" id="name-updated"> <br>
            Description:
            <input type="text" value="${todo.description}" id="desc-updated"> <br>
            Status:
            ${radio_status}
            Due Date:
            <input type="date" value="${full_date}" id="pick-date"> <br>
            <button type="submit">Update Todo</button>
        </form>
        `)

        //edit todo
        $('#form-edit-todo').submit(function (event) {
            event.preventDefault()
            let checkbox = $('#checked:checked').val()
            if ($('#checked').not(':checked')) checkbox = 'unchecked'
            checkbox = 'checked'
            // tembak ke localhost abis itu update datanya
            $.ajax({
                url: `http://localhost:3000/todos/${id}`,
                type: 'put',
                data: {
                    name: $('#name-updated').val(),
                    description: $('#desc-updated').val(),
                    status: checkbox,
                    due_date: $('#pick-date').val()
                }
            })
            .done(updated => {
                swal("Your todo has been successfully updated", "", "success");
                homepage()
                fetchTodos()
            })
            .fail(err => {
                console.log(err)
            })
        })
    })
    .fail(err => {
        console.log(err)
    })
}

//delete todo
function deleteTodo(id) {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this todo!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Your todo has been deleted!", {
            icon: "success",
          });
            $.ajax({
                url: `http://localhost:3000/todos/${id}`,
                type: 'delete',
                data: {_method: 'delete'}
            })
            .done(deleted => {
                // console.log(deleted)
            })
            .fail(err => {
                console.log(err)
            })
        } else {
        //   swal("Your imaginary file is safe!");
        }
      });
}
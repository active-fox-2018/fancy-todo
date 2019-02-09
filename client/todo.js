function fetchTodos() {
    $.post('http://localhost:3000/verify', { token: localStorage.getItem('token') })
    .done(response => {
        let id = response.id
        $.get(`http://localhost:3000/${id}`)
        .done(response => {
            let todoName = response.map(e => e.name)
            console.log(todoName)
        })
    })  
    .done(user => {
        
    })
    .fail(err => {
        console.log(err)
    })  
}

$('#addNewTodo').submit(function (event) {
    event.preventDefault()
    $.post('http://localhost:3000/verify', { token: localStorage.getItem('token') })
    .done(response => {
        let id = response.id
        $.post('http://localhost:3000/todos', {
            name: $('#todo').val(),
            description: $('#desc').val(),
            user: id
        })
    })
    .done(response => {
        console.log(response)
        swal("Congratulations", "Todo has been added!", "success");
    })
    .fail(err => {
        console.log(err)
    })  
})
function create() {
    // $.post(`http://localhost:3000/todos/`)
    // swal({
    //     title: "Todo Form",
    //     text: "This is a form",
    //     content: "input",
    //     // icon :"success",
    //     button: "submit form"
    // });
    $("#formCreate").slideToggle("slow");
    $('#formCreate').submit(function (event) {
        // berhentikan bevaviour form yang normal
        event.preventDefault()
        // post request untuk menyimpan data repo baru
        $.post('http://localhost:3000/todos/', {
         name: $('#todoName').val(),
         description : $('#todoDescription').val(),
         dueDate : $('#dueDate').val()
        })
        .done(function (response) {
          console.log(response)
          $('#todoList').append(`
          <p>${response.data.name}</p> <br>
          <p>${response.data.description}</p> <br>
          <p>${response.data.status}</p> <br>
          <p>${response.data.dueDate}</p> <br>
          `)
        })
        .fail(function (err) {
          console.log(err)
        })
      })

}

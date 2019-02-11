# fancy-todo
## Api Documentation
### List of Endpoints (URI)

#### todo endpoint
Endpoint | HTTP | Description
----- | ---- | -----------
/todos/|POST| create new todo item
/todos/|GET|get all todo item saved at database
/todos/:id|GET| get todo item with id params
/todos/:id|PUT| update todo item with id params
/todos/:id|DELETE| delete todo item with id params

##### user endpoint
Endpoint | HTTP | Description
----- | ---- | -----------
/users/googleAuth|POST|sign in through googleSignIn
/users/|POST|sign in through form

## Usage
Make sure you have Node.js and npm installed in your computer, and then run these commands :

> $ npm install

> $ npm start

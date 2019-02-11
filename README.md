# MyTodo

A simple todo-list web-app bult with mongoose and sequelize

# Server API Routes


### Authentication Routes

| Route         | HTTP          | Header | Body| Description          | 
| ------------- |:-------------:|-----------| ------------| :------------------- |
| /register     | POST      |none  | email:string, password:string | Create user and generate token   | 
| /login| POST | none | email:string, pasword: string | authenticate registered user and generate token |
| /googleauth| POST | none | pasword: string | authenticate registered user and generate token |

### User CRUD Routes

| Route         | HTTP          | Header | Body| Description          | 
| ------------- |:-------------:|-----------| ------------| :------------------- |
| /users    | GET   |token  | none |Get all user info (admin only)   | 
| /users/:id| GET | token | none | Get a user's info (admin and authenticated user only) |
| /users    | POST   |token  | email:string, password:string |Create  a user (admin only)   | 
| /users/:id    | PUT |token  | email:string, password:string, role:string |Update a user's attributes (admin only)   |
| /users/:id    | DELETE |token  | none |delete a user (admin and authenticated user only)   |

### Todo CRUD Routes
| Route         | HTTP          | Header | Body| Description          | 
| ------------- |:-------------:|-----------| ------------| :------------------- |
| /todos    | GET   |token  | none |Get all user info (admin only)   | 
| /todos/:id| GET | token | none | Get a user's info (admin and authenticated user only) |
| /todos    | POST   |token  | email:string, password:string |Create  a user (admin only)   | 
| /todos/:id    | PUT |token  | email:string, password:string, role:string |Update a user's attributes (admin only)   |
| /todos/:id    | DELETE |token  | none |delete a user (admin and authenticated user only)   |

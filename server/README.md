# fancy-todo

# Server Documentation
|Route|HTTP|Header(s)|Body|Description|
|---------|---------|---------|---------|---------|
|_/_|**POST**|none|Google sign in **OR** manual sign in(email, password)|Site Landing Page|
|_/signup_|**POST**|none|full name, email, password|Manual Sign Up|
|_/verify_|**POST**|none|none|Verifying user through token stored in localstorage|
|_/signup_|**POST**|none|none|Manual sign up (full name, email, password)|
|_/:id_|**GET**|none|none|Get todo list from User|
|_/users/:id_|**GET**|none|none|Get project list from User (still not working tho)|
|_/todos_|**POST**|none|none|Create todo list and add it to User's todo|
|_/todos/:id_|**PUT**|none|none|Edit todo detail|
|_/todos/:id_|**DELETE**|none|none|Delete todo from the list|
|_/projects/:id_|**GET**|none|none|Get specific project list by Id|


## Usage
```
npm install
npm start
live-server --host=localhost (Run it on client side)
```
> Run on http://localhost:8080
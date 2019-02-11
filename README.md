# fancy-todo

#users-route
|    Route     |  HTTP  | Header(s)| Body   | Description                           |              
---------------|--------|----------|--------|----------------------------------------
/users     | GET    | none | none | Get all the users 
/users     | POST   | none | name: String(**Required**), email: String(**Required**), password: String(**Required**) | Create a user
/users/authentication | GET | Token | none |User Authentication
/users/login | POST    | none | email: String(**Required**), password: String|Login
/users/authentication/google    | POST   | none | none |Login with Google Acc

____________________________________________________________________________________

#lists-tasks-routes
|    Route     |  HTTP  | Header(s)| Body   | Description                           |   
---------------|--------|----------|--------|----------------------------------------
/lists    | GET   | token | none |Show Lists
/lists/:listId     | GET    | token | none | Show List
/lists     | POST   | none | name:String(**Required**) | Create a list
/lists/:listId | PUT | token | Anything you want to change from the list |Edit list
/lists/:listId | DELETE    | token | none |Delete a list
/lists/:listId/tasks    | GET   | token | none |Show tasks
/lists/:listId/:taskId    | GET   | token | none |Show specific task
/lists/:listId/tasks    | POST   | token | name: String(**Required**), description: String, dueDate: Date, assignTo: String |Add new task
/lists/:listId/:taskId    | PUT   | token | Anything you want to change from the task |Edit task
/lists/:listId/:taskId    | DELETE   | token | none |Delete Task

# Fancy-Todo

List of basic routes :

| Route                |HTTP    |Header(s)| Body            |Description    |
| -------------------- | ------ | ------- | --------------- | ------------- |
|`/register`       |**POST**|`none`   |name:String (**Required**), email:String (**Required**), password:String(**Required**)|register user |
|`/login`       |**POST**|`none`   |email:String (**Required**), password:String(**Required**)|login User|
|`/singin/google`|**POST**|`none`   |`none`           |Singin User Using 3rd API|

List of todo routes:

|Route          |HTTP      |Header(s)|Body             |Description    |
| ------------- | -------- | ------- | --------------- | ------------- |
|`/todos`       |**GET**   |`token`  |`none`           |Get todo-list that user have (Authenticated User)|
|`/todos/:todoId`       |**GET**   |`token`  |`none`           |Get todo-list detail (Authenticated User)|
|`/todos`       |**POST**  |`token`  |name:String (**Required**), description:String(**Required**), due_date:Date(**Required**)|Create todo-list (Authenticated User)|
|`/todos/:todoId`   |**DELETE**|`token`  |`none`           |Delete todo-list (Authenticated User)|
|`/todos/:todoId`   |**PUT**   |`token`  |name:String (**Required**), description:String(**Required**), due_date:Date(**Required**)|Update todo-list with new info (Authenticated User)|

List of project routes

|Route          |HTTP      |Header(s)|Body             |Description    |
| ------------- | -------- | ------- | --------------- | ------------- |
|`/projects`|**GET**|`token`|`none`|Get projects-list that user have (Authenticated User)|
|`/projects/:projectId`|**GET**|`token`|`none`|Get project-list detail (Authenticated User)|
|`/projects`|**POST**|`token`|name:String (**Required**)|Create project (Authenticated User)|
|`/projects/:projectId`|**DELETE**|`token`|`none`|Delete project (Authenticated User)|
|`/projects/invite/:projectId`|**POST**|`token`|email:String (**Required**)|Invite new member to project (Authenticated User)|
|`/projects/:projectId`|**POST**|`token`|name:String (**Required**), description:String(**Required**), due_date:Date(**Required**)|Create todo-list nad push into project (Authenticated User)|
|`/project/:projectId/:todoId`|**PUT**|`token`|name:String (**Required**), description:String(**Required**), due_date:Date(**Required**)|Update todo-list in project(Authenticated User)|
|`/project/:prjectId/:todoId`|**DELETE**|`token`|`none`|Delete todo-list in project (Authenticated User)|

### Usage


Make new file `.env` With Template:

```
JWT_SECRET="INSERT JWT_SECERT HERE"
```

Run these commands:

 ```
 $ service mongod start
 $ npm install
 $ npm run dev
 ```


Access the API via `http://localhost:3000/`
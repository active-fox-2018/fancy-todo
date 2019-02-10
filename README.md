<h1> Schedos </h1>
<br>

**LIST OF USER ROUTES:**

Route|HTTP|Header(s)|Body|Description|
|---|---|---|---|---|
|/users/gooSign|POST|none|id_token: String **(REQUIRED)**|Create user and generate jwt (login)|
|/users|POST|none|name: String, email:String **(REQUIRED)**, password:String **(REQUIRED)**, image: file|Create user and generate jwt (login)|
|/users|GET|token|none|Get the users info |

<br>
<br>

**LIST OF TASK ROUTES:**
Route|HTTP|Header(s)|Body|Description|
|---|---|---|---|---|
|/tasks|GET|token| |Get all tasks|
|/tasks/:id|GET|token| |Get one task|
|/tasks|POST|token|title: String **(REQUIRED)**, description: String **(REQUIRED)**, deadline: Date |Create personal task (without project)|
|/tasks/projects|POST|token|title: String **(REQUIRED)**, description: String **(REQUIRED)**, deadline: Date, project: String **(REQUIRED)** |Create task into a project|
|/tasks/:id|PUT|token|title: String **(REQUIRED)**, description: String **(REQUIRED)**, deadline: Date, project: String, status: Boolean |Edit task (authorized user)|
|/tasks/:id|DELETE|token| |Delete task (authorized user)|
<br>
<br>

**LIST OF PROJECT ROUTES:**
Route|HTTP|Header(s)|Body|Description|
|---|---|---|---|---|
|/projects|GET|token| |Get all projects|
|/projects/:id|GET|token| |Get one project|
|/projects|POST|token|name: String **(REQUIRED)**|Create project|
|/projects/:id/add|PUT|token|member: String **(REQUIRED)**|Add member into project|
|/projects/:id/kick|PUT|token|member: String **(REQUIRED)**|Remove member from project|
|/projects/:id|DELETE|token| |Delete project (authorized user)|

**Usage:**

Make sure you have Node.js and npm installed in your computer, and then run these commands:

```
$ npm install
$ npm run dev
```
And don't forget to fill the .env file 

Link Server:

http://35.185.188.79

Link deploy: 

http://schedos.veneciac.xyz
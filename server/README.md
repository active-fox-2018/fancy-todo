# Fancy Todo

List: of basic routes:

|Route|HTTP|Header(s)|Body|Description|
|---------|---------|---------|---------|---------|
|_/auths/googleLogin_|**POST**|none|username, password|google login and generate token|
|_/auths/verify_|**POST**|token|none|verify token|
|_/users/login_|**POST**|none|email, password|login user, and generate token|
|_/users/register_|**POST**|none|name, email, password|register user|
|_/users/:email_|**PATCH**||||
|_/todos/_|**POST**|token, id|name, description, due_date|create todo|
|_/todos/|**GET**|token, id|none|Get users personal todos|
|_/todos/:todoId_|**GET**|token, id|none|Get todo|
|_/todos/:todoId_|**PATCH**|token, id|status|updated status todo|
|_/todos/:todoId_|**DELETE**|id, token |none|Delete a todos(Authorized only)|
|_/projects/_|**POST**|token, id|name, leader|create project|
|_/projects/_|**GET**|token, id||read all project todos|
|_/projects/:projectId/todos_|**POST**|token, id|none|create project Todo|
|_/projects/:projectId/todos/:todoId_|**DELETE**|token, id|none|delete project Todo (Authorized only)|


Additional Information:

### - **Register User**

Create and Return json data about new User

+ **URL**
  
  /register

+ **Method**

  POST

+ **Data Params**
  
  username[string], password[string]

+ **Success Response**

      { msg : `register user: someone success`, data: { created data }, token }


+ **Error Response**

### - **Create todos**

+ **URL**
  
  /todos

+ **Method**

  POST

+ **Data Params**
  
  name[string], description[string], due_date[date]

+ **Success Response**

      { msg : `created successfully`, newData  }

+ **Error Response**

      { msg :`server error`, err }

### **Get All Personal Users Todos**

+ **URL**
  
  /todos

+ **Method**

  GET

+ **Data Params**

+ **Success Response**

      { data : all user todos  }


+ **Error Response**

      { msg :`server error`, err }


======================= coming soon =============================
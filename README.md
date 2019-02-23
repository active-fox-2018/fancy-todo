# NOthinkLIST APIs Documentation

Usage :

Make sure you have Node.js and npm installed in your computer, and then run these commands:

```
$ npm install
$ npm start
```

```
Access the API via http://localhost:3000/
```

***APIs LISTS***

List of Users Authentications APIs

| Route | HTTP | Header(s) | Body | Description |
|---|---|---|---|---|
| /login | POST | none | email:String ***(REQUIRED)*** , password:String ***(REQUIRED)*** | sign in to aplication |
| /gauth | POST | none | none | sign in to aplication via google oAuth
| /users | POST | none | name:String ***(REQUIRED)*** , email:String ***(REQUIRED)*** , password:String ***(REQUIRED)*** | register to aplication |
| /users/:id | GET | token | none | get a single user info |


```
POST | http://localhost:3000/login

request
{
    email: String (should be correct email format)
    password: String (minimum length is 5)
}

success response
{
    token: ...
}

error response if email format is wrong
{
    msg: 'email format is wrong'
}

error response if password length less than 5
{
    msg: 'minimum password length is 5'
}

error response if email empty
{
    msg: 'email must be filled'
}

error response if password empty
{
    msg: 'password must be filled'
}

error response if email / password did not match in database
{
    msg: 'email / password is wrong'
}
```

```
POST | http://localhost:3000/gauth

success response
{
    token: ...
}

error reponse {
    google error / connection error
}
```

```
POST | http://localhost:3000/users

request
{
    name: String (required),
    email: String (should be correct email format)
    password: String (minimum length is 5))
}

success response
{
    _id: "...", 
    name: "...", 
    email: "...", 
    password: "hashed pasword"
    projectsInvitation: [], 
}

error response if email format is wrong 
{
    msg: 'Please fill a valid email address'
}

error response if email has beed used
{
    msg: 'Email has been used'   
}

error response if password length is less than 5
{
    msg: 'min password length are 5 character'
}
```



```
POST | http://localhost:3000/users/:id

success response {
    _id: "...", 
    projectsInvitation: [], 
    name: "...", 
    email: "...", 
    password: "hashed pasword"
}

error response if user not found
{
    ...
}
```

List of Authenticated Task Routes

| Route | HTTP | Header(s) | Body | Description |
|---|---|---|---|---|
| /tasks | GET | token | none | get all task from authenticated user |
| /tasks | POST | token | title:String ***(REQUIRED)*** , description:String,status:String, dueDate:String | create a new authenticated users task |
| /tasks/:id | GET | token | get a single authenticated users task
| /tasks/:id | PUT | token | title:String ***(REQUIRED)*** , description:String,status:String, dueDate:String | update a single authenticated users task |
| /tasks/:id | DELETE | token | deletea a single authentcated userts task |

```
GET | http://localhost:3000/tasks

request
{
    headers: {
        token: [USER_TOKEN]
    }
}

success response
{
    [
        {
            _id: "...", 
            userId: [], 
            description: "...", 
            dueDate: "...", 
            status: "..."
        },
        {
            _id: "...", 
            userId: [], 
            description: "...", 
            dueDate: "...", 
            status: "..."
        },
        ...
    ]
}

error if no user token
{
    msg: 'Not authorize'
}
```

```
POST | http://localhost:3000/tasks

request
{
    data: {
        title: String,
        description: String,
        dueDate: Date
    },
    headers: {
        token: [USER_TOKEN]
    }
}

success response
{
    _id: "...", 
    userId: [], 
    description: "...", 
    dueDate: "...", 
    status: "...",
    created_At: "...",
    updated_At: "..."   
}

error response if no user token
{
    msg: 'Not authorize'
}
```

```
GET | http://localhost:3000/tasks/:id

request
{
    headers: {
        token: [USER_TOKEN]
    }
}

success response
{
    _id: "...", 
    userId: [], 
    description: "...", 
    dueDate: "...", 
    status: "...",
    created_At: "...",
    updated_At: "..."   
}

error response if no user token
{
    msg: 'Not authorize'
}
```

```
PUT | http://localhost:3000/tasks/:id

request
{
    data: {
        title: String,
        description: String,
        dueDate: Date
    },
    headers: {
        token: [USER_TOKEN]
    }
}

success response
{
    _id: "...", 
    userId: [], 
    description: "...", 
    dueDate: "...", 
    status: "...",
    created_At: "...",
    updated_At: "..."   
}

error response if no user token
{
    msg: 'Not authorize'
}
```

```
DELETE | http://localhost:3000/tasks/:id

success response
{
    _id: "...", 
    userId: [], 
    description: "...", 
    dueDate: "...", 
    status: "...",
    created_At: "...",
    updated_At: "..."   
}

error response if no user token
{
    msg: 'Not authorize'
}
```


List of Project Routes

| Route | HTTP | Header(s) | Body | Description |
|---|---|---|---|---|
| /projects | GET | token | none | get authenticated users project |
| /projects | POST | token | name:String ***(REQUIRED)*** | create a new project |
| /projects/invitation | POST | token | none | invite authenticated user to join project |
| /projects/:id | GET | token | none | get single project data |
| /projects/:id | PATCH | token | none | add new authenticated member to project |
| /projects/remove-member/:id | PATCH | token | none | remove authenticated member from a project |
| /projects/:id | DELETE | token | none | delete a project |


```
GET | http://localhost:3000/projects/

request
{
    headers: {
        token: [USER_TOKEN]
    }
}

success response
{
    _id: "...",
    ownerName: "...",
    ownerId: "...",
    members: [],
    name: "...",
    createdAt: "...",
    updatedAt: "..."
}

error response if no user token
{
    msg: 'Not authorize'
}
```

```
POST | http://localhost:3000/projects/

request
{
    headers: {
        token: [USER_TOKEN]
    },
    data: {
        name: String
    }
}

success response
{
    _id: "...",
    ownerName: "...",
    ownerId: "...",
    members: [],
    name: "...",
    createdAt: "...",
    updatedAt: "..."
}

error response if no user token
{
    msg: 'Not authorize'
}
```

```
POST | http://localhost:3000/projects/invitation


```

```
GET | http://localhost:3000/projects/:id

request
{
    headers: {
        token: [USER_TOKEN]
    }
}

success response
{
    _id: "...",
    ownerName: "...",
    ownerId: "...",
    members: [],
    name: "...",
    createdAt: "...",
    updatedAt: "..."
}

error response if no user token
{
    msg: 'Not authorize'
}
```

```
PATCH | http://localhost:3000/projects/:id

request
{
    headers: {
        token: [USER_TOKEN]
    },
    data: {
        email: String
    }
}

success response
{
    msg: 'success send invitation'
}

error response if no user token
{
    msg: 'Not authorize'
}

error response if user has already invited
{
    msg: 'this user is already invited'
}

error response if user has already joined project
{
    msg: 'user already joined this project'
}

```

```
PATCH | http://localhost:3000/projects/remove-member/:id

request
{
    headers: {
        token: [USER_TOKEN]
    }
}

success response
{
    _id: "...",
    ownerName: "...",
    ownerId: "...",
    members: [],
    name: "...",
    createdAt: "...",
    updatedAt: "..."
}

error response if no user token
{
    msg: 'Not authorize'
}
```

```
DELETE | http://localhost:3000/projects/:id

request
{
    headers: {
        token: [USER_TOKEN]
    }
}

success response
{
    _id: "...",
    ownerName: "...",
    ownerId: "...",
    members: [],
    name: "...",
    createdAt: "...",
    updatedAt: "..."
}

error response if no user token
{
    msg: 'Not authorize'
}
```


List of Project Task Routes

| Route | HTTP | Header(s) | Body | Description |
|---|---|---|---|---|
| /projecttasks | GET | token | none | get all project task from a project |
| /projecttasks | POST | token | projectId:String ***(REQUIRED)*** , title:String ***(REQUIRED)*** , description:String,status:String, dueDate:String | update a project task document |
| /projecttasks/:id | GET | token | none | get a single project task
| /projecttasks | PUT | token | title:String ***(REQUIRED)*** , description:String, dueDate:String | update a project task document |
| /projecttasks | DELETE | token | none | delete a project task |   

```
GET | http://localhost:3000/projecttasks/

request
{
    headers: {
        token: [USER_TOKEN]
    }
}

success response
{
    [
        {
            _id: "...", 
            userId: [], 
            description: "...", 
            dueDate: "...", 
            status: "..."
        },
        {
            _id: "...", 
            projectId: [], 
            description: "...", 
            dueDate: "...", 
            status: "..."
        },
        ...
    ]
}

error if no user token
{
    msg: 'Not authorize'
}
```

```
POST | http://localhost:3000/projecttasks

request
{
    data: {
        title: String,
        description: String,
        dueDate: Date
    },
    headers: {
        token: [USER_TOKEN]
    }
}

success response
{
    _id: "...", 
    projectId: [], 
    description: "...", 
    dueDate: "...", 
    status: "...",
    created_At: "...",
    updated_At: "..."   
}

error response if no user token
{
    msg: 'Not authorize'
}
```

```
GET | http://localhost:3000/projecttasks/:id

request
{
    headers: {
        token: [USER_TOKEN]
    }
}

success response
{
    _id: "...", 
    projectId: [], 
    description: "...", 
    dueDate: "...", 
    status: "...",
    created_At: "...",
    updated_At: "..."   
}

error response if no user token
{
    msg: 'Not authorize'
}
```

```
PUT | http://localhost:3000/projecttasks/:id

request
{
    headers: {
        token: [USER_TOKEN]
    },
    data: {
        title: String,
        description: String,
        dueDate: Date
    }
}

success response
{
    _id: "...", 
    projectId: [], 
    description: "...", 
    dueDate: "...", 
    status: "...",
    created_At: "...",
    updated_At: "..."   
}

error response if no user token
{
    msg: 'Not authorize'
}
```

```
DELETE | http://localhost:3000/projecttasks/:id

request
{
    headers: {
        token: [USER_TOKEN]
    }
}

success response
{
    _id: "...", 
    projectId: [], 
    description: "...", 
    dueDate: "...", 
    status: "...",
    created_At: "...",
    updated_At: "..."   
}

error response if no user token
{
    msg: 'Not authorize'
}
```

```
POST | http://localhost:3000/weathers/

request
{
    headers: {
        token: [USER_TOKEN]
    },
    data: {
        city: String
    }
}

success response
{
    [
        {
            "dt": 1549692000,
            "main": {
                "temp": 305.68,
                "temp_min": 303.626,
                "temp_max": 305.68,
                "pressure": 1023.22,
                "sea_level": 1023.71,
                "grnd_level": 1023.22,
                "humidity": 85,
                "temp_kf": 2.05
            },
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                }
            ],
            "clouds": {
                "all": 36
            },
            "wind": {
                "speed": 4.06,
                "deg": 296
            },
            "rain": {
                "3h": 0.07
            },
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2019-02-09 06:00:00"
        }
    ]
}

error response if no user token
{
    msg: 'Not authorize'
}
```
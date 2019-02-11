# fancy-todo

>## User Route
| Route | HTTP | Header(s) | Body | Description |
| ----- | ---- | --------- | ---- | ----------- |
| /verify_account | **POST** | token | none | Verify & login account if user login via Google
| /sign_up | **POST** | none | fullname:String(**required**) <br> email:String (**required**) <br> password:String(**required**) | Create a new user
| /login | **POST** | token | email:String(**required**) <br> password:String(**required**) | Verify & login account if user login via registered account

>## Task Routes
| Route | HTTP | Header(s) | Body | Description |
| ----- | ---- | --------- | ---- | ----------- |
| /tasks | **POST** | token | title:String(**required**) <br> description:String(**required**) <br> due_date:String(**required**) | Create a new task |
| /tasks | **GET** | token | title:String(**required**) <br> description:String(**required**) <br> due_date:String(**required**) | Read all task |
| /tasks | **PUT** | token | title:String(**required**) <br> description:String(**required**) <br> due_date:String(**required**) | Update a task |
| /tasks | **DELETE** | token | title:String(**required**) <br> description:String(**required**) <br> due_date:String(**required**) | Delete a task |

>## Usage

|    command   |
|--------------|
| $npm install |
| $npm start   |
| $live-server |

### Access apps via http://localhost:8080
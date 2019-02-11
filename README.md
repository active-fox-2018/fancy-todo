

## API DOCUMENTATION
- - - -

| Title      | URL | Method | Request Body | Request Header | Response Success | Response Error | Descriptions |
| ---------- | --- | ------ | ------------ | -------------- | ---------------- | -------------- | ------------ |
| users login| /users/login | POST | email<br>password | none | jwtToken | **500 : internal server error** | name(string)<br>email(string)<br>password(string) |
| create task | /todo/create | POST | name<br>description<br>date | none | name<br>description<br>date<br>status<br> | **500 : internal server error**
|display all task| /todo/todo_list| GET | none | none | array of object: <br>name<br>description<br>date<br>status<br> | **500 : internal server error**
|update task| /todo/update/:id | UPDATE | none | none | **Your task has been successfully updated** | **500 : internal server error**
|delete task| /todo/delete/:id | DELETE | none | none | **Your task has yet been deleted** | **500 : internal server error**


<br>

# fancy-todo
Fancy Todo
Buatlah aplikasi Todo menggunakan Client-server model dengan spesifikasi sebagai berikut:

API Documentation yang meliputi : 


URLs, HTTP method, request, response (success dan error case)

CRUD endpoints untuk Todo (name, description, status, due date)

Register

Login menggunakan email & password (menggunakan JWT)

Sign in with 3rd APIs (Google/Twitter/Facebook/GitHub)
Validasi sehingga hanya authenticated user yang bisa melakukan CRUD Todo, baik dari sisi client maupun server

NO alert();! (Client)

Make it fancy! Tambahkan 1 fitur atau lebih yang akan menjadikan aplikasi todo kamu menjadi unik dan berbeda. Misal, integrasikan dengan Google Calendar. (Ingat, tambahkan fitur seunik mungkin)

Extras:

Authenticated user bisa membuat project, dan invite member ke project tersebut.
User dapat membuat todo di project yang sudah dipilih
Todo yang ada di suatu project hanya bisa di read/write (CRUD) oleh project members.
Kompetensi Backend:

API Documentation

API CRUD Todo + Authentication

MongoDB + Mongoose

Kompetensi Client:

jQuery + AJAX

SPA (Single Page Application)

Deadline:

Week 2 - Senin 09:00

Submission:

Fork dari organization, lalu open pull request dengan title NAMA LENGKAP KAMU (ex: Dimitri Wahyudiputra) jika sudah selesai. Tambahkan comment yang berisi environment variables yang dipakai (beserta valuenya), link deploy (jika ada), fitur uniknya apa dan kendala saat mengerjakan.
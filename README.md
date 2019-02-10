# fancy-todo


## API DOCUMENTATION
- - - -

| Title      | URL | Method | Request Body | Request Header| Sucsess Response | Error Response | notes|
| :---     |:---| :---  |   :---:   |  :---     |       ---     |     :---     |   ---|
|Create Users| /users | POST |  none  |  none  | <ol> attributes <li> name(String) </li> <li> email(String) </li> <li> password(String) </li> <li> register_type <br>(String) </li>  </ol>  |  500 : **internal server error**  | register_type has enum ``auto`` for 3rd party registration and ``manual`` |
|Login for manual user | /users/login | POST | <ol><li>Email(string)</li><li>Password</li></ol>|none| <ol><li>id(String)</li><li>token(String)</li><li>name(String)</li></ol> | <ol><li>``404 : User Not Found`` </li><li>``401 : Unauthorized``</li><li>``500 : Internal server error``</li></ol> | |
|login for 3rdParty(google)| /users/google | POST | <ol><li>Email(string)</li><li>Password</li></ol>|none| <ol><li>id(String)</li><li>token(String)</li><li>name(String)</li></ol> | <ol><li>``404 : User Not Found`` </li><li>``401 : Unauthorized``</li><li>``500 : Internal server error``</li></ol> | |
|Get Data User | /todos/:userId | GET | none | `token` from login | array of Object Todo<br> <ol> <li> name(String) </li> <li> description(String) </li> <li> status(String) </li> <li> due_date(String) </li> <li> userId(String) </li>   </ol>   | ``500 : Internal server error`` | status has enum ``complete`` and ``uncomplete`` |
|create Todo | /todos | POST |  <ol> <li> name(String) </li> <li> description(String) </li> <li> due_date(String) </li> <li> userId(String) </li> </ol> |  `token` from login | Object Todo<br> <ol> <li> name(String) </li> <li> description(String) </li> <li> status(String, `defaul value uncomplete`) </li> <li> due_date(String) </li> <li> userId(String) </li></ol>  | ``500 : Internal server error`` | 
|complete/uncomplete Task | /todos | PATCH|  <ol> <li> name(String) </li> <li> description(String) </li> <li> due_date(String) </li> <li> userId(String) </li> </ol> | `token` from login |  <ol> <li> name(String) </li> <li> description(String) </li> <li> due_date(String) </li> <li> userId(String) </li> </ol> | ``500 : Internal server error`` | Updated Object Todo|
|delete Todo | /todos | DELETE |   userId(String)  | `token` from login |  <ol> <li> name(String) </li> <li> description(String) </li> <li> due_date(String) </li> <li> userId(String) </li> </ol> | ``500 : Internal server error`` | response : Deleted Object Todo|
|update Todo | /todos | UPDATE |  <ol> <li> name(String) </li> <li> description(String) </li> <li> due_date(String) </li> <li> userId(String) </li> </ol> | `token` from login |  <ol> <li> name(String) </li> <li> description(String) </li> <li> due_date(String) </li> <li> userId(String) </li> </ol> | ``500 : Internal server error`` | response : Updated Object Todo|
get weather | /weather | GET | none | none | Object Weather : https://openweathermap.org/current | | | |





<br><br><br>

## DESCRIPTION CHALLENGE :
- - - -
 ### Buatlah aplikasi Todo menggunakan Client-server model dengan spesifikasi sebagai berikut:

- [] **API Documentation** yang meliputi : URLs, HTTP method, request, response (success dan error case)

- [X] **CRUD** 
  endpoints untuk Todo (name, description, status, due date)

- [X] **Register**
  - Login menggunakan email & password (menggunakan JWT)
  - Sign in with 3rd APIs (Google/Twitter/Facebook/GitHub)
  - Validasi sehingga hanya authenticated user yang bisa melakukan CRUD Todo, baik dari sisi client maupun server

  - NO alert();! (Client)

  - Make it fancy! Tambahkan 1 fitur atau lebih yang akan menjadikan aplikasi todo kamu menjadi unik dan berbeda.      Misal, integrasikan dengan Google Calendar. (Ingat, tambahkan fitur seunik mungkin)




- Extras:
  Authenticated user bisa membuat project, dan invite member ke project tersebut.
  User dapat membuat todo di project yang sudah dipilih
  Todo yang ada di suatu project hanya bisa di read/write (CRUD) oleh project members.

<br><br><br>
***Kompetensi Backend:***

  - API Documentation

  - API CRUD Todo + Authentication

  - MongoDB + Mongoose

***Kompetensi Client:***

  - jQuery + AJAX

  - SPA (Single Page Application)

Deadline:

Week 2 - Senin 09:00

Submission:

Fork dari organization, lalu open pull request dengan title NAMA LENGKAP KAMU (ex: Dimitri Wahyudiputra) jika sudah selesai. Tambahkan comment yang berisi environment variables yang dipakai (beserta valuenya), link deploy (jika ada), fitur uniknya apa dan kendala saat mengerjakan.



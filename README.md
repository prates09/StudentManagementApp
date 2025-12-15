# Student Management System (Angular + ASP.NET Core Web API)

A simple **Student Management System** built with **Angular** (frontend) and **ASP.NET Core Web API** (backend) featuring **JWT Authentication** and **Students CRUD** (Create, Read, Update, Delete).

---

## Features

### Authentication (JWT)
- Register new user
- Login and receive JWT token
- Token stored in `localStorage`
- Protected Students API (requires `Authorization: Bearer <token>`)

### Students (CRUD)
- View students list
- Add a student
- Edit a student
- Delete a student
- UI updates immediately after actions

---

## Tech Stack

- **Frontend:** Angular
- **Backend:** ASP.NET Core Web API
- **Auth:** ASP.NET Core Identity + JWT
- **Database:** SQL Server (EF Core)

---

## Screenshots

Add your screenshots in a folder named **`Screenshots/`** and reference them like this:

- **Login Page**
  - `Screenshots/01_Login_Page.png`
- **Register Page**
  - `Screenshots/02_Register_Page.png`
- **Students Dashboard (List + Add Form)**
  - `Screenshots/03_Students_Dashboard.png`
- **Add Student Result**
  - `Screenshots/04_Add_Student_Success.png`
- **Edit Student Result**
  - `Screenshots/05_Edit_Student_Success.png`
- **Delete Student Result**
  - `Screenshots/06_Delete_Student_Success.png`

## Project Structure
```
StudentManagementApp/
├─ StudentApi/ # ASP.NET Core Web API (Backend)
│ ├─ Controllers/
│ ├─ Data/
│ ├─ Models/
│ ├─ appsettings.json
│ └─ Program.cs
│
└─ student-portal/ # Angular App (Frontend)
├─ src/
│ ├─ app/
│ │ ├─ components/
│ │ ├─ services/
│ │ └─ app.routes.ts
│ └─ main.ts
├─ angular.json
└─ package.json
```
## How to Run
### 1) Run Backend (ASP.NET Core API)

Open terminal in the backend folder:

cd StudentApi


Restore packages:

dotnet restore


Run the API:

dotnet run


Open Swagger:

http://localhost:5127/swagger

If your backend runs on a different port, update the Angular API URL accordingly.

###2) Run Frontend (Angular)

Open a new terminal in the frontend folder:

cd student-portal


Install dependencies:

npm install


Start Angular:

ng serve -o


Open in browser:

http://localhost:4200



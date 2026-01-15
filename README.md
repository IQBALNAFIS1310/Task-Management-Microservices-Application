# Task Management Microservices Application

A **Task Management Microservices Application** built with **ASP.NET Core Web API** and **React (Vite)**. The system is composed of multiple backend services that are **logically separated but maintained in a single solution (monorepo)**.

This application demonstrates **clean service-layer architecture**, **separation of concerns**, and **inter-service communication** suitable for real-world enterprise systems.

---

## ✨ Key Features

### 🔐 Role-Based Task Management

* **Admin**

  * Create and assign tasks to users
  * Update task title and description
  * Delete tasks

* **User**

  * View assigned tasks
  * Mark tasks as completed or reopened
  * Add comments when updating task status

### 🧾 Activity Logging (Audit Trail)

* Every important action is logged via a **dedicated Activity Service**
* Logged actions include:

  * Task assignment
  * Task updates
  * Task completion / reopening
  * Task deletion

### ⚙️ Technical Highlights

* ASP.NET Core Web API
* Entity Framework Core
* Clean Architecture (Controller → Service → Data)
* Asynchronous programming (`async / await`)
* Microservices-ready (logical separation)
* RESTful API design

---

## 📂 Solution Structure

```
Task-Management-Microservices-Application/
│
├── TaskManagement.sln
│
├── ActivityService/
│   ├── Controllers/
│   │   └── ActivitiesController.cs
│   ├── Data/
│   │   └── ActivityDbContext.cs
│   ├── Migrations/
│   ├── Models/
│   │   └── ActivityModel.cs
│   ├── Services/
│   │   ├── IActivityService.cs
│   │   └── ActivityService.cs
│   ├── appsettings.json
│   ├── Program.cs
│   └── ActivityService.http
│
├── TaskService/
│   ├── Controllers/
│   │   └── TasksController.cs
│   ├── Data/
│   │   └── TaskDbContext.cs
│   ├── Migrations/
│   ├── Models/
│   │   └── TaskModel.cs
│   ├── Services/
│   │   ├── ITaskService.cs
│   │   └── TaskService.cs
│   ├── appsettings.json
│   ├── Program.cs
│   └── TaskService.http
│
├── UsersService/
│   ├── Controllers/
│   ├── Data/
│   │   └── UsersDbContext.cs
│   ├── Migrations/
│   ├── Models/
│   │   └── UserModel.cs
│   ├── Services/
│   │   ├── IUserService.cs
│   │   └── UserService.cs
│   ├── appsettings.json
│   ├── Program.cs
│   └── UsersService.http
│
├── frontend-management/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
├── README.md
```

---

## 🚀 Getting Started

### 1️⃣ Prerequisites

* .NET 8 SDK
* Node.js (>= 18)
* PostgreSQL
* Git

---

### 2️⃣ Backend Setup

Run each service in **separate terminals**:

```bash
#Database Migration -> Add to folder migration
add-migration Initial-Migration

#Database Update -> add database to postgreSQL
update-database

# Activity Service
dotnet run --project ActivityService

# Task Service
dotnet run --project TaskService

# Users Service
dotnet run --project UsersService
```

Default ports:

* TaskService → `http://localhost:5094`
* ActivityService → `http://localhost:5148`
* UsersService → `http://localhost:5261`

---

### 3️⃣ Frontend Setup

```bash
cd frontend-management
pnpm install
pnpm run dev
```

Frontend available at:

```
http://localhost:5173
```

---

## 🔗 API Overview (Task Service)

| Method | Endpoint                  | Description               |
| ------ | ------------------------- | ------------------------- |
| GET    | `/api/task`               | Get all tasks             |
| GET    | `/api/task/{id}`          | Get task by ID            |
| GET    | `/api/task/user/{userId}` | Get tasks by user         |
| POST   | `/api/task`               | Create task (Admin)       |
| PUT    | `/api/task/{id}`          | Update task data (Admin)  |
| PUT    | `/api/task/{id}/status`   | Update task status (User) |
| DELETE | `/api/task/{id}`          | Delete task (Admin)       |

---

## 🧪 Activity Log Example

```json
{
  "userId": 3,
  "action": "Complete Task",
  "entity": "Task",
  "entityId": 12,
  "comment": "Task completed successfully"
}
```

---

## 🛡️ Best Practices Applied

* Separation of concerns (Controller / Service / Data)
* Business rules enforced in Service layer
* Asynchronous database operations
* Dedicated audit logging service
* Monorepo structure for related microservices

---

## 📌 Future Improvements

* JWT Authentication & Authorization
* API Gateway
* Docker & Docker Compose
* Centralized logging & monitoring
* CI/CD pipeline

---

## 👤 Author

**Iqbal Nafis**
Backend / Fullstack Developer

---

## 📄 License

This project is intended for **learning, demonstration, and portfolio purposes**.

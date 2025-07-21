# 🧑‍🎓 Student Management API (Express.js MVC)

A simple RESTful API built using **Node.js** and **Express.js** following the **MVC (Model-View-Controller)** architecture.

This project allows basic CRUD operations on a list of students (stored in-memory), making it a perfect learning example for beginners in backend development.

---

## 🚀 Features

- Get all students
- Get a student by ID
- Add a new student
- Update an existing student
- Delete a student

---

## 📁 Project Structure

```
├── controller
│   └── studentController.js
├── data
│   └── students.js
├── router
│   └── studentRouter.js
├── app.js
```

- `controller/`: Business logic for handling requests
- `router/`: API route definitions
- `data/`: Static data source (students)
- `app.js`: Entry point of the application

---

## 📦 Technologies Used

- Node.js
- Express.js

---

## 📌 API Endpoints

| Method | Endpoint            | Description             |
|--------|---------------------|-------------------------|
| GET    | `/api/students`     | Get all students        |
| GET    | `/api/students/:id` | Get student by ID       |
| POST   | `/api/students`     | Add new student         |
| PUT    | `/api/students/:id` | Update student by ID    |
| DELETE | `/api/students/:id` | Delete student by ID    |

---

## 🧪 Sample POST Body

```json
{
  "name": "Alice",
  "grade": "A"
}
```

---

## 🛠 How to Run Locally

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/student-api.git
   cd student-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   node app.js
   ```

4. Server will run on [http://localhost:5001](http://localhost:5001)

---

## 📜 License

This project is for educational purposes and is open to anyone to use and modify.

---

## 🙌 Author

**Sairam S**

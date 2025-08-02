# Student Management API

A simple RESTful API for managing students, built with **Node.js**, **Express.js**, and **MongoDB** using the **MVC (Model-View-Controller)** architecture.

This project demonstrates basic CRUD operations on a student collection, making it ideal for learning backend development and working with databases.

---

## 🚀 Features

- Retrieve all students (with filtering, sorting, and pagination)
- Get a student by ID
- Add a new student
- Update an existing student
- Delete a student

---

## 📁 Project Structure

```
├── controller
│   └── studentController.js      # Business logic for student operations
├── middleware
│   └── errorHandling.js          # Centralized error handling middleware
├── Error
│   └── customError.js            # Custom error class for application errors
├── Model
│   └── schema.js                 # Mongoose schema/model for students
├── router
│   └── studentRouter.js          # API route definitions
├── app.js                        # Application entry point
```

---

## 📦 Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose

---

## 📌 API Endpoints

| Method | Endpoint            | Description                        |
|--------|---------------------|------------------------------------|
| GET    | `/api/students`     | Get all students (with filters)    |
| GET    | `/api/students/:id` | Get student by ID                  |
| POST   | `/api/students`     | Add new student                    |
| PUT    | `/api/students/:id` | Update student by ID               |
| DELETE | `/api/students/:id` | Delete student by ID               |

### Query Parameters for GET `/api/students`

- `grade` — Filter by grade (e.g., `?grade=A`)
- `sort` — Sort by fields (e.g., `?sort=name,grade`)
- `limit` — Limit number of results (e.g., `?limit=5`)
- `page` — Pagination (e.g., `?page=2`)

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

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/student-api.git
   cd student-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MongoDB**
   - Make sure MongoDB is running locally or provide a connection string in your environment variables.

4. **Start the server**
   ```bash
   node app.js
   ```

5. The server will run on [http://localhost:5001](http://localhost:5001)

---

## 📜 License

This project is for educational purposes and is open to anyone to use and modify.

---

## 🙌 Author

**Sairam S**

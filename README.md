# Student Management API

A RESTful API for managing students and users, built with **Node.js**, **Express.js**, and **MongoDB** using the **MVC (Model-View-Controller)** architecture.

This project demonstrates CRUD operations, authentication, error handling, and modular code structure, making it ideal for learning backend development and working with databases.

---

## 🚀 Features

- Student CRUD operations (Create, Read, Update, Delete)
- User registration and authentication
- Filtering, sorting, and pagination for students
- Centralized error handling
- Modular and scalable project structure

---

## 📁 Project Structure

```
├── controller
│   ├── studentController.js                       # Business logic for student operations
│   └── userController.js                          # Business logic for user operations
├── middleware
│   ├── authentication.js                          # Authentication middleware
│   ├── errorHandling.js                           # Centralized error handling middleware
|   ├── notFound.js                                # 404 handler middleware
│   └── ratelimiting.js                            # middleware to handling rate limiting
├── Error
│   ├── allErrors.js                               # Aggregates all custom errors
│   ├── badRequestError.js                         # Bad request error class
│   ├── customError.js                             # Base custom error class
│   ├── notFoundError.js                           # Not found error class
│   └── unauthenticated.js                         # Unauthenticated error class
├──Test
│   ├── test-deleteStudentById.js                  # unit testing for deleteStudentById
│   ├── test-getStudents.js                        # unit testing for getStudents
│   ├── test-getStudentById.js                     # unit testing for getStudentById
│   ├── test-postLogin.js                          # unit testing for postLogin
│   ├── test-postRegister.js                       # unit testing for postRegister
|   ├── test-postStudents.js                       # unit testing for postStudents
│   └── test-updateStudentById.js                  # unit testing for updateStudentById
├── Model
│   ├── studentSchema.js                           # Mongoose schema/model for students
│   └── userSchema.js                              # Mongoose schema/model for users
├── Database
│   └── connect.js                                 # MongoDB connection logic
├── router
│   ├── studentRouter.js                           # Student API route definitions
│   └── userRouter.js                              # User API route definitions
├── app.js                                         # Application entry point
├── populate.js                                    # To add default data to the DB
├── data.js                                        # sample data for student db
├── Student management API.postman_collection.json # postman collection
└── student-management-api-v1.yaml                 # Open API specification 
```

---

## 📦 Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (for authentication, if implemented)
- dotenv (for environment variables)

---

## 📌 API Endpoints

### Student Endpoints

| Method | Endpoint            | Description                        |
|--------|---------------------|------------------------------------|
| GET    | `/api/students`     | Get all students (with filters)    |
| GET    | `/api/students/:id` | Get student by ID                  |
| POST   | `/api/students`     | Add new student                    |
| PUT    | `/api/students/:id` | Update student by ID               |
| DELETE | `/api/students/:id` | Delete student by ID               |

#### Query Parameters for GET `/api/students`

- `grade` — Filter by grade (e.g., `?grade=A`)
- `sort` — Sort by fields (e.g., `?sort=name,grade`)
- `limit` — Limit number of results (e.g., `?limit=5`)
- `page` — Pagination (e.g., `?page=2`)

### User Endpoints

| Method | Endpoint            | Description                        |
|--------|---------------------|------------------------------------|
| POST   | `/api/users/register` | Register a new user              |
| POST   | `/api/users/login`    | User login (returns token)        |

---

## 🧪 Sample Student POST Body

```json
{
  "name": "Alice",
  "grade": "A"
}
```

---

## 🧪 Sample User Registration Body

```json
{
  "username": "alice123",
  "password": "yourpassword"
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
   - Make sure MongoDB is running locally or provide a connection string in your environment variables (e.g., in a `.env` file).

4. **Start the server**
   ```bash
   node app.js
   ```

5. The server will run on [http://localhost:5001](http://localhost:5001) by default.

---

## 📜 License

This project is for educational purposes and is open to anyone to use and modify.

---

## 🙌 Author

**Sairam S**

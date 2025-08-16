# Student Management API

A robust and secure RESTful API for managing students and users, built with **Node.js**, **Express.js**, and **MongoDB**. This project follows the **MVC (Model-View-Controller)** architecture and includes features like authentication, rate limiting, and a full CI/CD pipeline.

This project is an excellent example of a modern, scalable, and well-tested backend application, suitable for both educational purposes and as a foundation for a production system.

---

## Features
* **Student Management:** Full CRUD (Create, Read, Update, Delete) operations for students.
* **User Authentication:** Secure user registration and login with JSON Web Tokens (JWT).
* **Advanced Filtering:** Filter students by grade, sort by multiple fields, and paginate results.
* **Robust Error Handling:** Centralized error handling for consistent and informative error responses.
* **Security:**
    * **Authentication:** Secure endpoints with JWT authentication.
    * **Rate Limiting:** Protect the API from brute-force attacks with rate limiting.
    * **Security Headers:** Use Helmet to set various HTTP headers for added security.
* **CI/CD Pipeline:** Automated build, test, and deployment pipeline using GitHub Actions and Docker.
* **Unit Tested:** Comprehensive unit tests for all major functionalities using Mocha and Chai.
* **API Documentation:** OpenAPI (Swagger) specification for clear and interactive API documentation.
---

## Project Structure

```
├── .github/workflows
│   └── build.yaml                  # GitHub Actions CI/CD pipeline
├── controller
│   ├── studentController.js        # Business logic for student operations
│   └── userController.js           # Business logic for user operations
├── db
│   └── connect.js                  # MongoDB connection logic
├── errors
│   ├── allErrors.js                # Aggregates all custom errors
│   ├── badRequestError.js          # Bad request error class
│   ├── customError.js              # Base custom error class
│   ├── notFoundError.js            # Not found error class
│   └── unauthenticated.js          # Unauthenticated error class
├── middleware
│   ├── authentication.js           # Authentication middleware
│   ├── errorHandling.js            # Centralized error handling middleware
│   ├── notFound.js                 # 404 handler middleware
│   └── rateLimiting.js             # Rate limiting middleware
├── model
│   ├── studentSchema.js            # Mongoose schema/model for students
│   └── userSchema.js               # Mongoose schema/model for users
├── router
│   ├── studentRouter.js            # Student API route definitions
│   └── userRouter.js               # User API route definitions
├── test
│   ├── test-deleteStudentById.js   # Unit tests for deleting students
│   ├── test-getStudents.js         # Unit tests for getting students
│   ├── test-getStudentById.js      # Unit tests for getting a student by ID
│   ├── test-postLogin.js           # Unit tests for user login
│   ├── test-postRegister.js        # Unit tests for user registration
│   ├── test-postStudents.js        # Unit tests for creating students
│   └── test-updateStudentById.js   # Unit tests for updating students
├── .dockerignore                   # Files to ignore in the Docker build
├── .gitignore                      # Files to ignore in Git
├── app.js                          # Application entry point
├── Dockerfile                      # Dockerfile for building the application image
├── package.json                    # Project dependencies and scripts
├── populate.js                     # Script to populate the database with sample data
├── README.md                       # Project documentation
└── student-management-api-v1.yaml  # OpenAPI (Swagger) specification
```

---

## Technologies Used

* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose
* **Authentication:** JWT (JSON Web Tokens)
* **Testing:** Mocha, Chai, Sinon
* **CI/CD:** Docker, GitHub Actions
* **Other:**
    * `dotenv` for environment variables
    * `helmet` for security headers
    * `express-rate-limit` for rate limiting
    * `express-async-errors` for handling async errors in Express

---

## API Endpoints

### Student Endpoints

All student endpoints require a valid JWT token in the `Authorization` header.

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

| Method | Endpoint              | Description                        |
|--------|-----------------------|------------------------------------|
| POST   | `/api/users/register` | Register a new user                |
| POST   | `/api/users/login`    | User login (returns token)         |

---

## Sample Student POST Body

### Create a New Student

**POST** `/api/students`

```json
{
  "name": "Sairam",
  "grade": "A"
}
```

---

## Sample User Registration Body

**POST** `/api/user/register`

```json
{
  "name": "sairam",
  "email": "sai@example.com",
  "password": "yourpassword"
}
```

---

## Sample User Login

**POST** `/api/user/login`

```json
{
  "email": "sai@example.com",
  "password": "yourpassword"
}
```

---

## How to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/student-management-api.git
   cd student-management-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a .env file in the root of the project and add the following variables:

   ```
   URL=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   JWT_EXP=<your-jwt-expiration-time>
   PORT=<your-port-number>
   ```

4. **Start the server**
   ```bash
   node app.js
   ```

5. The server will run on [http://localhost:5001](http://localhost:5001) by default.

---

## 🧪 Running Tests

To run the unit tests:

```bash
npm test
```

---

## License

This project is for educational purposes and is open to anyone to use and modify.

---

## Author

**Sairam S**
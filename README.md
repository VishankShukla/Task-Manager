# Task Manager

A task management backend built using **Node.js, Express.js, and MongoDB**. This project allows users to manage their tasks, organize them into parent and child tasks, and track their progress securely.

## Features

### Authentication
- User registration
- User login and logout
- JWT-based authentication
- HTTP-only cookie-based token storage
- Password hashing using bcryptjs
- Token blacklist for logout
- Get logged-in user details

### Task Management
- Create new tasks
- Fetch all parent tasks
- Fetch child tasks of a parent task
- Update task title, description, and status
- Delete tasks
- Automatically delete nested child tasks when deleting a parent task
- User-specific task access

### Task Status

- `pending`
- `in-progress`
- `completed`

## Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Backend runtime |
| Express.js | REST API |
| MongoDB | Database |
| Mongoose | MongoDB ODM |
| JWT | Authentication |
| bcryptjs | Password hashing |
| dotenv | Environment variables |
| cookie-parser | Cookie handling |

## Project Structure

```text
Task-Manager/
│
├── Backend/
│   ├── src/
│   │   ├── controller/
│   │   │   ├── auth.controllers.js
│   │   │   └── task.controllers.js
│   │   │
│   │   ├── db/
│   │   │   └── config.js
│   │   │
│   │   ├── middleware/
│   │   │   └── auth.middleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── task.model.js
│   │   │   ├── tokenblacklist.model.js
│   │   │   └── user.model.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── task.routes.js
│   │   │
│   │   └── app.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .gitignore
│
└── README.md
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/VishankShukla/Task-Manager.git
```

### 2. Navigate to Backend

```bash
cd Task-Manager/Backend
```

### 3. Install Dependencies

```bash
npm install
npm install cookie-parser
```

### 4. Configure Environment Variables

Create a `.env` file inside the `Backend` folder.

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Replace the placeholder values with your actual MongoDB connection string and JWT secret.

### 5. Start the Server

```bash
node server.js
```

Server URL:

```text
http://localhost:3000
```

## API Documentation

Base URL:

```text
http://localhost:3000/api
```

### Authentication Routes

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/auth/register` | Register a new user | No |
| POST | `/auth/login` | Login user | No |
| POST | `/auth/logout` | Logout user | No |
| GET | `/auth/getme` | Get logged-in user details | Yes |

### Task Routes

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/task/createTask` | Create a task | Yes |
| GET | `/task/gpt` | Get all parent tasks | Yes |
| GET | `/task/gct/:id` | Get child tasks | Yes |
| PATCH | `/task/updateTask/:id` | Update a task | Yes |
| DELETE | `/task/deleteTask/:id` | Delete a task and its child tasks | Yes |

### Example Task Object

```json
{
  "title": "Learn Node.js",
  "discription": "Complete backend development",
  "status": "pending",
  "parentTask": null
}
```

**Available status values:**

- `pending`
- `in-progress`
- `completed`

## Future Improvements

- Frontend development and integration
- Gemini AI integration
  - AI-based task priority suggestions
  - AI-generated task comments
  - Overall task analysis
- AI Task Agent
  - Smart task organization
  - Automatic subtask suggestions
  - Daily task planning
  - User-approved task creation and updates

## Author

**Vishank Shukla**

GitHub: [VishankShukla](https://github.com/VishankShukla)

---

If you find this project interesting, feel free to explore the repository and give it a ⭐.
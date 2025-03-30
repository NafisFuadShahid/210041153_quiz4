# Secure Task Management System (TMS)
A full-stack web application that allows users to securely manage tasks.

---

## Features

### User Authentication
- **Registration with Email Verification:** Users can register with their details and receive a verification email (check your spam folder if not visible).
- **Role Management:** Supports different user roles (e.g., admin, regular user) using a role field in the user model.
- **JWT-Based Login:** Secure login implemented using JSON Web Tokens (JWT) to protect routes.
- **Password Hashing:** Passwords are hashed with bcrypt before storage, ensuring secure password management.

### Task Management
- **Task Creation:** Users can create tasks with details including title, description, due date, priority, and category.
- **CRUD Operations:** Full support for creating, reading, updating, and deleting tasks.
- **Task List & Filters:** Displays tasks in a responsive grid with filtering options by priority and status. Inline editing is available for updating task status directly on task cards.
- **Task Details:** Detailed view for each task that allows editing of task details, marking tasks as completed, or deleting tasks.
- **Task Categories & Search:** Tasks include a category field for organization, and basic search/filter functionality is provided.

---

## Technologies Used

- **Backend:**
  - Node.js & Express.js
  - MongoDB with Mongoose
  - JWT for authentication
  - bcrypt for password hashing
  - Nodemailer for sending verification emails

- **Frontend:**
  - React
  - Bootstrap for UI styling

---

## Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or later)
- A MongoDB database (MongoDB Atlas is recommended or a local MongoDB instance)

### Backend Setup
1. **Navigate to the backend folder:**
   ```bash
   cd backend
   npm install
2. **Create a .env file in the backend folder and add the following:**
   ```bash
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xyz.mongodb.net/secure-tms?retryWrites=true&w=majority
   JWT_SECRET=your_generated_jwt_secret
   EMAIL_USER=your.email@gmail.com
   EMAIL_PASS=your_app_specific_password
   PORT=5000
- Replace username, password, and other placeholders with your actual credentials.
- For Gmail, enable 2FA, generate an app-specific password

4. **Start the backend server:**
   ```bash
   npm run dev
-(If you don't have a "dev" script, run: node server.js)

---

### Frontend Setup
1. **Navigate to the frontend folder:**
   ```bash
   cd ../frontend
2. **Install dependencies:**
   ```bash
   npm install
3. **Start the frontend development server:**
  ```bash
   npm start
-The React application will open at http://localhost:3000
   

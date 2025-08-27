# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:


## Employee Dashboard

This is a full-stack employee dashboard application built with React (TypeScript) for the frontend, Express.js for the backend, and PostgreSQL for data storage. It provides secure authentication, employee management, time tracking, and task management features.

---

### Features

- **JWT Authentication:** Secure login and session management using JSON Web Tokens.
- **OTP Password Reset:** Password reset via email OTP using Nodemailer.
- **Employee Time Tracking:** Track employee work hours and attendance.
- **Task Management:** Assign, update, and monitor tasks for employees.
- **Robust Validation:** Uses React Hook Form and Zod for frontend form validation.
- **Modular Architecture:** Scalable codebase with clear separation of concerns.

---

### Tech Stack

- **Frontend:** React (TypeScript), React Hook Form, Zod, Axios, React Router DOM
- **Backend:** Express.js, Node.js, PostgreSQL
- **Auth & Security:** JWT, Nodemailer

---

### Folder Structure

- `src/` — Frontend source code (components, pages, styles)
- `backend/` — Backend API (Express server, routes, middleware)
- `database/` — PostgreSQL data files

---

### Getting Started

#### Prerequisites
- Node.js & npm
- PostgreSQL

#### Setup
1. **Clone the repository:**
  ```bash
  git clone https://github.com/d1vv1/emp-dash.git
  cd app
  ```
2. **Install dependencies:**
  ```bash
  npm install
  cd backend && npm install
  ```
3. **Configure environment variables:**
  - Edit `backend/.env` for database and email credentials.
4. **Start PostgreSQL server** and ensure connection details match `.env`.
5. **Run the backend server:**
  ```bash
  cd backend
  npm start
  ```
6. **Run the frontend app:**
  ```bash
  cd ..
  npm run dev
  ```

---

### Usage

- Register/login as an employee.
- Track time and manage tasks from the dashboard.
- Reset password via OTP email if needed.

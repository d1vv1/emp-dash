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
  git clone <repo-url>
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

---

### Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

### License

This project is licensed under the MIT License.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

# 🛒 Inventory Management Web App (MERN Stack)

## [Click Here to Access](https://inventoryapp-ob0s.onrender.com/login)

## 📌 Overview

This project is a full-stack inventory management application built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to securely manage inventory items by creating, viewing, updating, and deleting products through a modern, responsive web interface.

This application was developed as part of my Computer Science capstone to demonstrate full-stack development, authentication, database integration, and user experience design.

---

## 🚀 Features

### 🔐 Authentication

* User registration with validation (username, email, password)
* Secure login using JWT (JSON Web Tokens)
* Password hashing using bcrypt
* Persistent login using localStorage
* Protected routes (only logged-in users can access the app)

### 📦 Product Management

* Create new inventory items
* View all products in a responsive grid layout
* Update products via modal form
* Delete products with instant UI updates
* Prevent duplicate product names and bin locations

### 🔎 Search & Sorting

* Search products by name or bin location
* Sort products by:

  * Name (A-Z / Z-A)
  * Price (Low → High / High → Low)
  * Bin Location

### 🎨 User Interface

* Built with Chakra UI
* Light/Dark mode toggle
* Responsive design for multiple screen sizes
* Toast notifications for user feedback
* Clean and modern layout

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Chakra UI
* Zustand (State Management)
* React Router

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose

### Authentication & Security

* JSON Web Tokens (JWT)
* bcryptjs

---

## 📂 Project Structure

```
inventoryApp/
│
├── backend/
│   ├── config/         # Database connection
│   ├── controllers/    # Business logic
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API endpoints
│   └── server.js       # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/ # UI components
│   │   ├── pages/      # App pages
│   │   ├── store/      # Zustand state management
│   │   └── App.jsx     # Main app
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/BrachoDev/inventoryApp.git
cd inventoryApp
```

### 2. Install backend dependencies

```bash
npm install
```

### 3. Install frontend dependencies

```bash
cd frontend
npm install
```

### 4. Set up environment variables

Create a `.env` file in the **backend** folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---

## ▶️ Running the Application

### Run backend

```bash
npm run dev
```

### Run frontend

```bash
cd frontend
npm run dev
```

### Open in browser

```
http://localhost:5173
```

---

## 🌐 Deployment

This project is deployed using Render (backend) and can serve the frontend in production mode.

⚠️ Note: On free hosting tiers, the server may "sleep," causing a delay when first loading the app.

---

## 🔒 API Endpoints

### Products

* `GET /api/products` → Get all products
* `POST /api/products` → Create product
* `PUT /api/products/:id` → Update product
* `DELETE /api/products/:id` → Delete product

### Users

* `POST /api/users` → Register user
* `POST /api/users/login` → Login
* `GET /api/users/me` → Get current user

---

## 🎯 Learning Outcomes

This project demonstrates:

* Full-stack application development using MERN
* RESTful API design and integration
* Secure authentication and authorization
* State management using Zustand
* Responsive UI design and user experience improvements
* Data validation and error handling

---

## 👨‍💻 Author

**Carlos Bracho**
🔗 [GitHub](https://github.com/BrachoDev)

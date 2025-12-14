# Hall Booking Project

## Project Overview

This project is a **Hall Booking Management System** developed as part of a company assignment. It allows users to:

* View all hall bookings
* Create a new booking
* Update an existing booking
* Delete a booking

The project is built using **React.js** for the frontend and **Node.js (Express) with Sequelize ORM** for the backend. The database used is **PostgreSQL**.

---

##  Tech Stack

### Frontend

* React.js
* HTML, CSS, JavaScript
* Axios (for API calls)

### Backend

* Node.js
* Express.js
* Sequelize ORM
* PostgreSQL
* dotenv (for environment variables)

---

##  Project Structure

```
hall-booking-project/
│
├── backend/
│   ├── models/
│   │   └── booking.js
│   ├── db.js
│   ├── server.js
│   ├── package.json
│   └── .env (not pushed to GitHub)
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── frontend-basic/ (initial/basic version)
```

---

##  Backend Setup Instructions

1. Go to backend folder:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file **outside the project or locally (not pushed to GitHub)**:

   ```env
   DB_NAME=your_database_name
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_DIALECT=postgres
   PORT=5000
   ```

4. Start the backend server:

   ```bash
   node server.js
   ```

Backend will run on:

```
http://localhost:5000
```

---

##  Frontend Setup Instructions

1. Go to frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the React app:

   ```bash
   npm start
   ```

Frontend will run on:

```
http://localhost:3000
```

---

##  Features Implemented

*  Display list of hall bookings
*  Create new booking
*  Update existing booking
*  Delete booking
*  Backend APIs using Node.js & Express
*  Database operations using Sequelize ORM
*  Environment variables used for configuration (no hardcoding)

---

##  Loom Video

A Loom video explaining:

* Project setup
* Backend & frontend execution
* Features demonstration

 **(Loom video link to be added here)**

---

##  Notes

* `.env` file is not included in the repository for security reasons.
* Database credentials are managed using environment variables.

---

##  Developed By

Anudhi Mishra

---

 This project fulfills all the objectives mentioned in the assignment.



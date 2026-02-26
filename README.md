# Habits Tracker

A habit-tracking application developed to analyze and compare two distinct backend architectures (**Express.js** and **Flask**) integrated with an **Angular** frontend.



## About the Project
This project consists of a frontend and two interchangeable REST API servers. Both backends (Express and Flask) implement the same business logic, providing a comparison of **Node.js** and **Python** environments.

### Core Tech Stack:
* **Frontend:** Angular 
* **Backend A:** Node.js + Express.js
* **Backend B:** Python + Flask
* **Database:** MySQL

---

## Project Structure
* `/client` – Angular client-side application.
* `/server_express` – REST API built with Express.js.
* `/server_flask` – REST API built with Flask.
* `habits.sql` – MySQL database schema and initial data.

---

## Getting Started

### 1. Database Configuration
1. Ensure a MySQL server is running (e.g., via XAMPP or local MySQL instance).
2. Create a new database.
3. Import the `habits.sql` file to set up the required tables and relational structure.

### 2. Launching the Backend

#### **Important: API Port Selection**
The Angular frontend must be configured to point to the active backend. Update the API URL in `client/projekt/src/app/habit.service.ts`:

| Backend Technology | Port | API Endpoint URL |
| :--- | :--- | :--- |
| **Express.js** | 3000 | `http://localhost:3000` |
| **Flask** | 4000 | `http://localhost:4000` |

> *Note: If you encounter a "Connection Refused" error, verify that the frontend port matches the running backend server.*

#### Option A: Express.js (Node.js)
```bash
cd server_express
npm install
npm start
```
#### Option B: Flask (Python)
```bash

cd server_flask
# Optional: create virtual environment
# python -m venv venv
pip install -r requirements.txt
python app.py
```
### 3. Frontend Setup (Angular)
```bash

cd client/projekt
npm install
ng serve
```
---
The application will be accessible at: http://localhost:3001

#### Key Functionalities
- Habit Management: Seamlessly add new habits to the tracking dashboard.

- Task Tracking: Log daily progress and mark tasks as completed.

- Data Persistence: Full CRUD operations with a MySQL database.

- Backend Interoperability: Ability to swap the entire backend engine (Python vs. Node.js) with a simple port change.

#### Author
Project developed by Oliwia Spaleniak.

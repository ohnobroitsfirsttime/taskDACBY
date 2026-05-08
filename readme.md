# MERN Hacker News Scraper App

A full-stack MERN application that scrapes the top stories from Hacker News, stores them in MongoDB, and allows authenticated users to bookmark stories.

This project was built as part of a Full Stack Developer (MERN) assignment.

---

# Live Demo

## Frontend

```bash
https://task-dacby.vercel.app
```

## Backend API

```bash
https://task-backend-dgea.onrender.com
```

---

# Features

## Backend Features

- JWT Authentication
- User Registration & Login
- Password Hashing using bcrypt
- Protected Routes Middleware
- Hacker News Web Scraper
- Automatic Scraping on Server Start
- Manual Scraping API
- MongoDB Integration
- Bookmark Stories
- RESTful API Design
- Pagination Support

## Frontend Features

- React + Vite
- React Router DOM
- Context API State Management
- Protected Routes
- Login/Register Pages
- Story Listing Page
- Bookmark Stories
- Bookmarks Page
- Persistent Authentication
- Responsive UI

---

# Tech Stack

## Frontend

- React.js
- Vite
- Axios
- React Router DOM
- Context API

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- Axios
- Cheerio

---

# Project Structure

```bash
mern-hn-scraper/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── scraper/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env
│   ├── package.json
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── package.json
│   └── .gitignore
│
└── README.md
```

---

# Installation & Setup

## Clone Repository

```bash
git clone https://github.com/ohnobroitsfirsttime/taskDACBY.git
```

```bash
cd taskDACBY
```

---

# Backend Setup

## Navigate to backend

```bash
cd backend
```

## Install dependencies

```bash
npm install
```

## Create .env file

```env
PORT=port
ORIGIN=
MONGO_URI=mongodb+srv://<Username>:<Password>@cluster0.lyymtur.mongodb.net/task_management?retryWrites=true&w=majority
JWT_SECRET=jwt_secret
JWT_EXPIRES_IN=7d or 1d
```

## Start backend server

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:PORT
```

---

# Frontend Setup

## Navigate to frontend

```bash
cd frontend
```

## Install dependencies

```bash
npm install
```

## Create .env file

```env
VITE_API_BASE_URL=http://localhost:PORT/api
```

## Start frontend server

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:3000
```

---

# API Endpoints

# Authentication APIs

## Register User

### POST

```bash
/api/auth/register
```

### Request Body

```json
{
  "name": "Rahul",
  "email": "rahul@example.com",
  "password": "123456"
}
```

---

## Login User

### POST

```bash
/api/auth/login
```

### Request Body

```json
{
  "email": "rahul@example.com",
  "password": "123456"
}
```

---

# Scraper API

## Trigger Scraper

### POST

```bash
/api/scrape
```

This scrapes the top 10 stories from Hacker News and stores them in MongoDB.

---

# Story APIs

## Get All Stories

### GET

```bash
/api/stories
```

### Pagination Example

```bash
/api/stories?page=1&limit=10
```

---

## Get Single Story

### GET

```bash
/api/stories/:id
```

---

## Toggle Bookmark

### POST

```bash
/api/stories/:id/bookmark
```

### Headers

```bash
Authorization: Bearer YOUR_TOKEN
```

---

## Get Bookmarked Stories

### GET

```bash
/api/stories/bookmarks/all
```

### Headers

```bash
Authorization: Bearer YOUR_TOKEN
```

---

# Authentication Flow

1. User registers or logs in
2. Backend generates JWT token
3. Token is stored in localStorage
4. Axios interceptor automatically attaches token
5. Protected routes validate JWT token

---

# Scraper Workflow

1. Server starts
2. Scraper fetches Hacker News homepage
3. Top 10 stories are extracted
4. Data is stored in MongoDB
5. Manual scraping can also be triggered via API

---

# Database Models

# User Model

```js
{
  name,
  email,
  password,
  bookmarks
}
```

# Story Model

```js
{
  title,
  url,
  points,
  author,
  postedAt
}
```

---

# Deployment

## Frontend Deployment

- Vercel

## Backend Deployment

- Render

---

# Future Improvements

- Better UI using Tailwind CSS
- Dark/Light Mode
- Search & Filter
- Infinite Scroll
- User Profile Page
- Bookmark Categories
- Scheduled Cron Scraping

---

# Screenshots

Add project screenshots here.

Example:

<p align="center">
  <img src="https://ik.imagekit.io/ay6bdp4tm/Home.png" width="800"/>
</p>

---

# Loom Video

Add Loom walkthrough link here.

```bash
https://www.loom.com/share/d7baee0442d144dd88ceece79dd80478
```

---

# Author

## Rahul Kumar

Full Stack MERN Developer

---

# License

This project is built for educational and assignment purposes.
# MERN URL Shortener

A full-stack URL shortener built with React, Express, MongoDB, and Node.js.

## Project Structure

```text
mern-url-shortener/
├── backend/
└── frontend/
    └── vite_project/
```

## Features

- Shortens long URLs into shareable links
- Redirects short links to the original destination
- Stores links and click counts in MongoDB
- Uses a React frontend with a Node/Express backend

## Setup

### Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
BASE_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5173
```

Run the backend:

```bash
npm run dev
```

### Frontend

```bash
cd frontend/vite_project
npm install
```

Create `frontend/vite_project/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Run the frontend:

```bash
npm run dev
```

Open `http://localhost:5173/`.

# TaskFlow

TaskFlow is a minimal task tracker with an Express + MongoDB backend and a Create React App frontend. It lets you create, toggle, and delete tasks through a REST API that the React UI consumes.

## Stack

- Backend: Node 18+, Express 5, Mongoose 9
- Frontend: React 19 (CRA), axios
- Database: MongoDB (local or Atlas)

## Project layout

- backend/ — Express server, Mongo connection, task routes
- frontend/ — React app bootstrapped with Create React App

## Prerequisites

- Node.js 18+ and npm
- MongoDB available at `mongodb://127.0.0.1:27017` (local install) or a MongoDB Atlas URI
- Docker (optional) if you prefer running MongoDB in a container

## Quick start

1) Start MongoDB

PowerShell (installed as Windows service):

```powershell
net start MongoDB
```

Docker:

```powershell
docker run -d -p 27017:27017 --name taskflow-mongo mongo:6.0
```

2) Configure the backend

```powershell
cd "C:\Users\anees\Desktop\Aneesh\PERSONAL\Projects\Task-Flow\backend"
npm install
copy NUL .env
echo MONGO_URI=mongodb://127.0.0.1:27017/taskflow >> .env
node server.js
```

The API will be available at http://localhost:5000/api/tasks.

3) Start the frontend

```powershell
cd "C:\Users\anees\Desktop\Aneesh\PERSONAL\Projects\Task-Flow\frontend"
npm install
npm start
```

The React dev server runs on http://localhost:3000 and proxies API calls to the backend.

## API reference

- GET /api/tasks — list all tasks
- POST /api/tasks — create a task (body: `{ "title": "Buy milk" }`)
- PUT /api/tasks/:id — update completion status (body: `{ "completed": true }`)
- DELETE /api/tasks/:id — remove a task

Responses are JSON. Errors return `{ "error": "message" }` with an appropriate HTTP status code.

## Development notes

- Environment: only `MONGO_URI` is required by the backend; default port is hardcoded to 5000.
- CORS: enabled for all origins for simplicity while developing the React app.
- Data model: `Task` has `title` (string, required) and `completed` (boolean, default false) with created/updated timestamps.

## Troubleshooting

- Cannot connect to MongoDB: ensure Mongo is running locally or update `MONGO_URI` in backend/.env to a reachable Atlas URI.
- CRA dev server errors: if modules look stale, remove `node_modules`, reinstall, and retry `npm start` in frontend/.
- Backend not restarting on changes: use a watcher like `nodemon` if you want live reload (`npm install -g nodemon` then `nodemon server.js`).

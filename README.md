# TaskFlow

TaskFlow is a simple task manager with a Node/Express + MongoDB backend and a Create React App frontend.

## Project structure

- `backend/` — Express server and API routes
- `frontend/` — React app (Create React App)

## Prerequisites

- Node.js (v16+ recommended)
- npm (comes with Node.js)
- MongoDB running locally on `mongodb://127.0.0.1:27017` or Docker
- (optional) Docker if you prefer running MongoDB in a container

## Quick start (recommended)

1. Start MongoDB

PowerShell (Windows service):

```powershell
# If MongoDB is installed as a Windows service named 'MongoDB'
net start MongoDB
```

Or with Docker:

```powershell
docker run -d -p 27017:27017 --name taskflow-mongo mongo:6.0
```

2. Start the backend

```powershell
cd "C:\Users\anees\Desktop\Aneesh\PERSONAL\Projects\TaskFlow\backend"
npm install
node server.js
```

The backend listens on port `5000` by default. API base: `http://localhost:5000/api/tasks`.

3. Start the frontend

```powershell
cd "C:\Users\anees\Desktop\Anees\PERSONAL\Projects\TaskFlow\frontend"
npm install
npm start
```

The frontend dev server runs on `http://localhost:3000` and proxies API calls to the backend.

## Troubleshooting

- Error: `MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017`
  - Cause: MongoDB is not running or not reachable.
  - Fix: Start MongoDB locally (see Quick start) or point `backend/server.js` to a reachable MongoDB URI.

- Error: "'import' and 'export' may appear only with 'sourceType: module'"
  - Cause: `package.json` contained a `"type": "commonjs"` which forces Node/webpack to treat `.js` as CommonJS and may break Create React App tooling.
  - Fix: Ensure `frontend/package.json` does not set `type` to `commonjs`. The repo's `frontend/package.json` has been adjusted to remove that field.

- If CRA dev server still fails after changes:

```powershell
cd "C:\Users\anees\Desktop\Aneesh\PERSONAL\Projects\TaskFlow\frontend"
rd /s /q node_modules
npm install
npm start
```

## Useful commands

- Test the backend API with curl:

```powershell
curl.exe -i http://localhost:5000/api/tasks
```

- Add and commit changes locally:

```powershell
cd "C:\Users\anees\Desktop\Aneesh\PERSONAL\Projects\TaskFlow"
git add frontend/package.json backend/routes/tasks.js README.md
git commit -m "Fix frontend package.json; improve backend error handling; add project README"
```

## Notes

- I updated `frontend/package.json` to remove a `type` entry that interfered with CRA's module parsing, and added better error handling to `backend/routes/tasks.js` so API failures return useful messages.
- If you'd like the backend to start even when MongoDB is down (for development), I can add retry logic or a mock fallback — tell me which behavior you prefer.

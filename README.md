# HireSync

**Better interviews, in sync.**

HireSync is a developer-first technical interview platform for running
collaborative coding interviews. Interviewers and candidates can work through
programming problems together in a browser-based coding workspace with live
video, chat, and code execution.

## Problem Statement

Technical interviews often rely on a collection of disconnected tools: video
calls, chat, coding environments, and problem descriptions. Switching between
them interrupts collaboration and makes it harder for interviewers and
candidates to focus on problem-solving.

## Target Users

- **Interviewers and hiring teams** conducting technical screens or coding
  interviews.
- **Candidates** participating in collaborative programming interviews.
- **Developers and learners** practicing programming problems and checking
  their solutions.

## Solution

HireSync brings the interview workflow into one web application. Users can
choose a problem, create or join a live interview room, discuss the problem
over video and chat, and run JavaScript, Python, or Java code from the
workspace. Session, user, and participation data is stored in MongoDB.

## Key Features

- Clerk sign-in and protected application routes.
- Dashboard with active interview rooms and recent completed sessions.
- Create and join one-on-one interview sessions based on curated problems.
- Problem statements, examples, constraints, difficulty labels, and starter
  code.
- Monaco-based editor with JavaScript, Python, and Java selections.
- Server-mediated code execution through OnlineCompiler.io.
- Stream video calling and chat in interview rooms.
- Session completion and participant controls.
- Responsive dark interface with HireSync's emerald-and-teal brand styling.

## Tech Stack

| Area | Technologies |
| --- | --- |
| Frontend | React, Vite, JavaScript, Tailwind CSS, DaisyUI |
| Editor and interface | Monaco Editor, Lucide, React Resizable Panels |
| Authentication | Clerk |
| API | Node.js, Express |
| Database | MongoDB Atlas, Mongoose |
| Video and chat | Stream Video, Stream Chat |
| Code execution | OnlineCompiler.io Piston-compatible API |
| Data fetching | TanStack Query, Axios |
| Hosting | Vercel (frontend), Render (backend) |

## Architecture

```text
Browser
  ├── React/Vite frontend hosted on Vercel
  ├── Clerk authentication
  ├── Stream Video and Chat clients
  └── HTTPS API requests with Clerk session tokens
        │
        ▼
Node.js / Express API hosted on Render
  ├── /api/sessions  — create, list, join, and end interview sessions
  ├── /api/chat      — authenticated Stream token
  ├── /api/code      — authenticated code execution proxy
  └── /api/inngest   — user lifecycle event functions
        │
        ├── MongoDB Atlas — users and interview sessions
        ├── Stream        — server-side user, video, and chat operations
        └── OnlineCompiler.io — sandboxed code execution
```

The backend creates or updates a user's MongoDB and Stream records when an
authenticated API request arrives, so normal sign-in does not depend on an
Inngest user-created event being delivered first. The OnlineCompiler API key is
kept in the backend environment and is never sent to the browser.

## Local Setup

### Prerequisites

- Node.js and npm
- MongoDB Atlas database and connection string
- Clerk application with publishable and secret keys
- Stream application with API key and API secret
- OnlineCompiler.io REST API key for code execution

### 1. Configure the backend

From the repository root in PowerShell:

```powershell
if (-not (Test-Path backend\.env)) {
  Copy-Item backend\.env.example backend\.env
}
```

Edit `backend\.env` and replace the placeholders with your own values. The
backend must have valid MongoDB, Clerk, and Stream credentials. Set
`ONLINECOMPILER_API_KEY` to an active OnlineCompiler REST API key to enable code
execution.

### 2. Configure the frontend

```powershell
if (-not (Test-Path frontend\vite-project\.env)) {
  Copy-Item frontend\vite-project\.env.example frontend\vite-project\.env
}
```

Edit `frontend\vite-project\.env` and set your Clerk publishable key and Stream
API key. For local development, set:

```env
VITE_API_URL=http://localhost:3000/api
```

Vite reads its environment file from `frontend/vite-project/`, not from its
`src/` directory.

### 3. Install dependencies

Open two PowerShell terminals at the repository root.

Terminal 1 — backend:

```powershell
cd backend
npm install
npm run dev
```

Terminal 2 — frontend:

```powershell
cd frontend
npm install
npm run dev
```

Open the Vite URL printed in the frontend terminal, usually
`http://localhost:5173`. Running `npm run dev` in `frontend` starts only the
frontend; the backend must be started in its own terminal. The backend connects
to MongoDB before it starts listening. Its health endpoint is
`http://localhost:3000/health`.

### Useful frontend checks

From the repository root:

```powershell
npm --prefix frontend\vite-project run lint
npm --prefix frontend\vite-project run build
```

## Environment Variables

Copy the example files and provide your own values. **Do not commit `.env`
files, API keys, passwords, or connection strings.** Never add server secrets
to frontend variables prefixed with `VITE_`; Vite embeds those values in the
browser build.

### Backend: `backend/.env`

| Variable | Required | Description |
| --- | --- | --- |
| `NODE_ENV` | Yes | Runtime mode; use `development` locally and `production` on Render. |
| `PORT` | Yes | Local API port, typically `3000`. Render provides its own port. |
| `CLIENT_URL` | Yes | Frontend origin allowed by backend CORS; for local development, `http://localhost:5173`. |
| `DB_URL` | Yes | MongoDB connection URI, including the database name. |
| `CLERK_SECRET_KEY` | Yes | Server-side secret for the Clerk application. |
| `STREAM_API_KEY` | Yes | Stream application key. |
| `STREAM_API_SECRET` | Yes | Server-side Stream secret. |
| `ONLINECOMPILER_API_KEY` | For code execution | Server-side OnlineCompiler REST API key. |
| `INNGEST_EVENT_KEY` | If using Inngest | Inngest event key. |
| `INNGEST_SIGNING_KEY` | If using Inngest | Inngest signing key. |

### Frontend: `frontend/vite-project/.env`

| Variable | Required | Description |
| --- | --- | --- |
| `VITE_CLERK_PUBLISHABLE_KEY` | Yes | Clerk publishable key for the same Clerk application as the backend secret. |
| `VITE_STREAM_API_KEY` | Yes | Stream API key for the same Stream application as the backend. |
| `VITE_API_URL` | Yes | Backend API base URL, including `/api`; locally `http://localhost:3000/api`. |

## Deployment

The live application is available at:

- **Frontend:** [https://hire-sync-d2om-woad.vercel.app/](https://hire-sync-d2om-woad.vercel.app/)
- **Backend health check:** [https://hiresync-pgur.onrender.com/health](https://hiresync-pgur.onrender.com/health)

The frontend is hosted on Vercel and the API on Render. For deployment steps,
Render environment configuration, Vercel build settings, and service
integration, see [DEPLOYMENT.md](./DEPLOYMENT.md).

Production configuration reminders:

- Set Vercel's `VITE_API_URL` to
  `https://hiresync-pgur.onrender.com/api`, then redeploy the frontend after
  changing it.
- Set Render's `CLIENT_URL` to the stable Vercel production origin, with no
  trailing slash and no `/api`.
- Configure `ONLINECOMPILER_API_KEY` only in the Render backend environment.
- Configure the Vercel domain in the Clerk application's allowed domains.
- Allow the Render service to connect to MongoDB Atlas.


## Demo Video - [https://drive.google.com/file/d/1vwuW3cbn-QTdUgZqAhYIMpu-3YkeAFZ_/view?usp=sharing](https://drive.google.com/file/d/1vwuW3cbn-QTdUgZqAhYIMpu-3YkeAFZ_/view?usp=sharing)

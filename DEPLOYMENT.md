# HireSync: local development and deployment

HireSync uses Clerk for authentication, MongoDB for application data, Stream for
video/chat, and OnlineCompiler.io for code execution. The frontend and backend
are separate services. **Nothing in this guide has been deployed.**

## Run locally

### 1. Prepare the services and credentials

Create accounts (or use existing projects) with:

- [Clerk](https://clerk.com) for sign-in
- [MongoDB Atlas](https://www.mongodb.com/atlas) for the database
- [Stream](https://getstream.io) for video and chat

In Clerk, create an application and copy its publishable key and secret key. In
MongoDB Atlas, create a database user, allow your development IP in Network
Access, and copy the application connection string. In Stream, create an app and
copy its API key and secret.

Create an OnlineCompiler.io account and generate a REST API key in its API Keys
page. Keep the key private: it belongs on the backend only, never in a `VITE_`
variable or browser code. If an API key has been posted publicly, revoke it and
create a replacement before using it.

### 2. Configure the backend

From the repository root, copy the backend template if you do not already have
a backend `.env` file:

```powershell
if (-not (Test-Path backend\.env)) { Copy-Item backend\.env.example backend\.env }
```

Edit `backend\.env` and replace the placeholders. Set `DB_URL` to your Atlas
connection string, including the database name, and set the Clerk and Stream
credentials. Keep these secrets private. Inngest keys are only needed when
using the Inngest integration; user records are also synced automatically on
the first authenticated API request.

### 3. Configure the frontend

```powershell
if (-not (Test-Path frontend\vite-project\.env)) {
  Copy-Item frontend\vite-project\.env.example frontend\vite-project\.env
}
```

Set `VITE_CLERK_PUBLISHABLE_KEY` and `VITE_STREAM_API_KEY` to the matching
Clerk and Stream values. For local use, `VITE_API_URL` should be
`http://localhost:3000/api`.
Vite reads this file from `frontend/vite-project`; it does not load
environment files placed inside `src`.

The frontend sends code to the authenticated HireSync backend. The backend uses
`ONLINECOMPILER_API_KEY` to call OnlineCompiler's Piston-compatible execution
endpoint. Never put this key in frontend environment variables.

### 4. Start both services

Open two terminals at the repository root.

Terminal 1:

```powershell
cd backend
npm install
npm run dev
```

Terminal 2:

```powershell
cd frontend
npm install
npm run dev
```

Open the URL printed by Vite, usually `http://localhost:5173`. `npm run dev` in
the `frontend` directory starts only the frontend; start the backend separately
as shown above. The backend connects to MongoDB before it starts listening.
Check `http://localhost:3000/health` for its health response.

If session creation still fails, confirm both terminals are running, the
frontend points to `http://localhost:3000/api`, the backend `DB_URL` is valid,
MongoDB Atlas permits your current IP, and both Clerk keys belong to the same
Clerk application. For code execution, set `ONLINECOMPILER_API_KEY` in
`backend\.env` to your active OnlineCompiler REST API key and restart the
backend.

## Deploy the backend to Render

### 1. Create accounts and prepare the repository

1. Create a [GitHub](https://github.com) account if you do not already have one.
2. Push this project to a GitHub repository. Do not commit either `.env` file.
3. Create a [Render](https://render.com) account and sign in with GitHub.
4. Make sure your MongoDB Atlas database is accessible from Render (Atlas
   Network Access may require allowing `0.0.0.0/0`; use this only if you accept
   the tradeoff, and protect the database with a strong database-user password).

### 2. Create the Render web service

1. In the Render dashboard, select **New +** > **Blueprint**.
2. Connect the GitHub repository containing `render.yaml`.
3. Review the service settings. The blueprint uses `backend` as its root,
   `npm install` as its build command, and `npm start` as its start command.
4. Enter the secret environment values when Render prompts you:
   `DB_URL`, `CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `STREAM_API_KEY`,
   `STREAM_API_SECRET`, `ONLINECOMPILER_API_KEY`, `INNGEST_EVENT_KEY`,
   `INNGEST_SIGNING_KEY`, and `CLIENT_URL`. Use the frontend's Vercel URL for
   `CLIENT_URL`; you can update it after creating the Vercel project.
5. Select **Apply** to create and deploy the backend. Render will show its
   service URL, such as `https://hiresync-backend.onrender.com`.
6. Check `https://<your-render-service>.onrender.com/health`. A healthy API
   returns a JSON response with `"status": "ok"`.

You can instead create a **New +** > **Web Service** manually, select the
repository, set the root directory to `backend`, choose the Node environment,
and enter the same build command, start command, and environment variables.

## Deploy the frontend to Vercel

1. Create a [Vercel](https://vercel.com) account and sign in with GitHub.
2. In the Vercel dashboard, select **Add New** > **Project**, then import the
   HireSync repository.
3. Set **Root Directory** to `frontend/vite-project`.
4. Choose the **Vite** framework preset. The build command should be
   `npm run build`, and the output directory should be `dist`.
5. Add these project environment variables:
   - `VITE_CLERK_PUBLISHABLE_KEY`: the publishable key for your Clerk app
   - `VITE_STREAM_API_KEY`: the API key for your Stream app
   - `VITE_API_URL`: `https://<your-render-service>.onrender.com/api`
6. Select **Deploy** and wait for the build to finish. Vercel will provide the
   frontend URL.

The `vercel.json` rewrite keeps client-side routes working when opened directly.

## Connect and verify the services

1. In Render, set `CLIENT_URL` to the exact Vercel origin, with no trailing
   slash, then redeploy the backend service.
2. In Clerk, add the Vercel domain to the application's allowed domains/origins.
3. Confirm the frontend's Clerk publishable key and backend's Clerk secret key
   belong to that same Clerk application and environment (test or production).
4. Confirm the frontend and backend Stream keys belong to the same Stream app.
5. Sign in through the Vercel site, create a session, and check that a user and
   session record appear in the expected MongoDB database.

Do not put `CLERK_SECRET_KEY`, `STREAM_API_SECRET`, `ONLINECOMPILER_API_KEY`, or
`DB_URL` in Vercel environment variables; those secrets belong only on the
backend. Never publish or commit environment files.

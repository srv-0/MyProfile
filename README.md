# Candidate Profile Playground (Me-API)

A very basic full-stack playground app that stores **my candidate profile** in a database and exposes it through a small API + minimal frontend to run queries.

---

## Live URLs

- **Frontend (UI):** https://YOUR-FRONTEND-VERCEL-URL
- **Backend (API):** https://YOUR-BACKEND-RENDER-URL

---

## Features

### Backend + API
- Store and serve candidate profile data from a database
- Profile contains:
  - name, email, education, work
  - skills[]
  - projects[] (title, description, links)
  - links (github, linkedin, portfolio)

### Endpoints implemented
Health Check  
- `GET /health`
Profile CRUD  
- `GET /profile`
- `POST /profile`
- `PUT /profile`
Query Endpoints  
- `GET /projects?skill=java`
- `GET /skills/top`
- `GET /search?q=robot`

---

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** SQLite
- **Frontend:** HTML, CSS, JavaScript
- **Hosting:** Render (backend), Vercel (frontend)

---

## Architecture

- `backend/` → Express API + SQLite database
- `frontend/` → Simple UI that calls backend endpoints using Fetch API

---

## Database Schema

The project uses SQLite with the following tables:

- `profiles`
- `skills`
- `projects`

Schema file: `backend/schema.sql`

---

## Local Setup

### 1) Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/candidate-playground.git
cd candidate-playground

# AbleSpace Task Manager — Full Stack Assessment

A responsive AbleSpace-style task management system built for the Full Stack Developer (Fresher) technical assessment.

## Assessment requirements covered

The supplied assessment asks for Next.js + Tailwind on the frontend, NestJS APIs, TypeScript, a database, design fidelity, theme persistence, Guest Login, reusable components, validation, responsive behavior and good project structure. The repository now contains both the frontend and a NestJS/SQLite backend foundation.

## Implemented

### Frontend
- Next.js App Router
- TypeScript + Tailwind CSS
- AbleSpace-style workspace sidebar
- Tasks and Projects navigation
- To Do, Doing and Completed task groups
- Task table with priority, members, due date and actions
- Add Task modal with validation
- Move tasks between statuses
- Delete tasks
- Task search
- Light/dark theme toggle persisted across refreshes
- Responsive desktop, tablet and mobile layout
- Mobile navigation drawer
- Profile / Guest workspace UI
- Accessible labels, dialog semantics and keyboard-friendly controls
- Local persistence for a reliable demo experience

### Backend
Located in `backend/`:
- NestJS REST API
- TypeScript
- SQLite + TypeORM
- DTO validation using `class-validator`
- CRUD endpoints for tasks
- Search and status filtering
- Guest Login endpoint
- CORS and global validation pipe

### Part 2
`PART2.md` contains the requested Caseload → Take Data workflow explanation and UX/UI improvement ideas based on the supplied assessment screenshot.

## API endpoints

When the backend is running on port 4000:

- `POST /api/auth/guest` — Guest Login
- `GET /api/tasks` — list tasks
- `GET /api/tasks/:id` — get one task
- `POST /api/tasks` — create a task
- `PATCH /api/tasks/:id` — update a task
- `DELETE /api/tasks/:id` — delete a task
- `GET /api/tasks?search=login` — search tasks
- `GET /api/tasks?status=Doing` — filter by status

## Run the frontend

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Run the backend

```bash
cd backend
npm install
npm run start:dev
```

The API starts on `http://localhost:4000` by default. SQLite creates `ablespace.sqlite` automatically.

## Production builds

Frontend:

```bash
npm run build
npm start
```

Backend:

```bash
cd backend
npm run build
npm run start:prod
```

## Project structure

```text
ablespace-task-manager/
├── app/                  # Next.js App Router UI
├── public/               # Static assets
├── backend/
│   └── src/
│       ├── auth/         # Guest Login API
│       └── tasks/        # Task entity, DTOs, controller and service
├── PART2.md              # Part 2 submission write-up
└── README.md
```

## Design notes

The implementation follows the supplied assessment direction and the AbleSpace task-management visual style. Small implementation deviations are intentional where they improve accessibility, responsiveness or make the prototype usable without external services. The original assessment screenshot is used as the reference for the Caseload → Take Data workflow in Part 2.

## Submission checklist

Before submitting, verify:

- [x] Public GitHub repository
- [x] Multiple meaningful commits
- [x] README
- [x] Part 2 write-up
- [x] Frontend build locally
- [ ] Deploy the frontend to a working public URL
- [ ] Keep the deployment accessible for at least 45 days
- [ ] Add final live URL to this README

The assessment states that a working deployed URL is required and non-working URLs are rejected. Deployment must therefore be tested before the final submission.

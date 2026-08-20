# AbleSpace Task Manager

A responsive task-management dashboard built for the AbleSpace assessment task using Next.js, React, TypeScript and Tailwind CSS.

## Implemented

- AbleSpace-style workspace sidebar with Tasks and Projects navigation
- Responsive desktop and mobile layout
- Task groups: To Do, Doing and Completed
- Task table with priority, member, due date and actions
- Add Task modal with validation
- Move tasks between statuses
- Delete tasks
- Task search by name, priority, member or due date
- Light/dark theme toggle
- Profile menu and feedback notifications
- Local persistence using browser localStorage
- Projects overview cards and progress indicators
- Accessible labels, buttons and dialog semantics

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
npm start
```

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4

## Notes

The current assessment implementation is a frontend-first prototype. Tasks persist in the browser with `localStorage`; there is no remote database, authentication service, or external task API in the repository yet. Those pieces should only be added if the assessment guideline explicitly requires a backend.

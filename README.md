# AbleSpace Task Manager — Full Stack Assessment

A responsive task management system built for the **AbleSpace Full Stack Developer (Fresher) Technical Assessment**.

The application is designed to demonstrate frontend development, backend API development, responsive UI, reusable components, validation, theme persistence, and product understanding.

## Live Demo

https://ablespace-task-manager-gules.vercel.app

## GitHub Repository

https://github.com/KamalThirpola/ablespace-task-manager

---

# Assessment Requirements

The assessment requires:

- Next.js frontend
- Tailwind CSS
- NestJS backend
- TypeScript
- Database integration
- High design fidelity
- Theme support with persistence
- Guest Login
- Reusable components
- Clean APIs
- Validation
- Responsive design
- Part 2 product understanding
- Public GitHub repository
- Working deployed URL

This project implements these requirements using a Next.js frontend and a separate NestJS backend.

---

# Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Next.js App Router

## Backend

- NestJS
- TypeScript
- TypeORM
- SQLite
- class-validator

## Development Tools

- Git
- GitHub
- Visual Studio Code
- GitHub Actions
- Vercel

---

# Features

## Task Management

- View tasks
- Create tasks
- Update task status
- Move tasks between statuses
- Delete tasks
- Search tasks
- Filter tasks by status
- Task priority
- Task members
- Due dates
- Task actions

## Task Statuses

The application supports:

- To Do
- Doing
- Completed

Tasks can be moved between these statuses through the user interface.

---

# Guest Login

The application includes a Guest Login experience.

The Guest Login API is provided by the NestJS backend:

```text
POST /api/auth/guest

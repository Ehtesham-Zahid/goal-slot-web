# GoalSlot Web


**GoalSlot** is a goal-driven productivity web application. It connects your **goals**, **weekly schedule**, **time tracking**, **tasks**, **notes**, and **reports** in one place—so you can see whether your time actually matches your intentions.


## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## About the Project

Most people use several disconnected tools: a todo app for tasks, a calendar for scheduling, Toggl for time tracking, Notion for notes, and spreadsheets for reports. **GoalSlot** unifies that workflow:

1. Define **goals** with deadlines and progress.
2. Block **recurring time** on a weekly schedule for each goal.
3. **Track time** with a live timer (linked to schedule blocks).
4. Review **analytics** to see where your hours went.
5. Capture **notes** with a rich editor and link them to goals.
6. **Share** progress for accountability.


## Features

| Module | Description |
|--------|-------------|
| **Goal Boards** | Kanban-style goals with deadlines, progress, and linked tasks |
| **Weekly Schedule** | Recurring time blocks (e.g. Deep Work, Learning) tied to goals |
| **Time Tracker** | Live timer and manual entries linked to schedule blocks |
| **Tasks** | Daily task lists connected to goals |
| **Notes** | TipTap-based rich editor with slash commands |
| **Reports** | Charts and exports (daily / weekly / monthly focus) |
| **Sharing** | Share goals/reports with others |
| **Auth** | Email/password login, registration, token refresh, optional SSO |
| **Admin** | User management, feedback, release notes (role-based) |
| **PWA** | Installable progressive web app (production builds) |
| **Analytics** | PostHog integration for product analytics |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 16]
| UI | [React 19], [Tailwind CSS]
| Language | [TypeScript]
| State | [Zustand], [TanStack Query]
| HTTP | [Axios]
| Editor | [TipTap]
| Charts | [Recharts]
| UI primitives | [Radix UI]
|


## Architecture

```
┌─────────────────┐         HTTP (REST)          ┌──────────────────────┐
│  goal-slot-web  │  ─────────────────────────►  │  GoalSlot Backend    │
│  (this repo)    │   NEXT_PUBLIC_API_URL        │  (separate repo)     │
│  Port: 3010     │   e.g. http://localhost:4000 │  Port: 4000 (default)│
└─────────────────┘                              └──────────────────────┘
         │
         │  Optional: PostHog, SSO platform
         ▼
```

## Prerequisites

Install the following **before** cloning:

| Tool | Version | Purpose |
|------|---------|---------|
| **Node.js** | 18.18+ or **20.x LTS** (recommended) | Runtime |
| **npm** | 9+ (comes with Node) | Package manager |
| **Git** | Latest | Clone and contribute |
| **GoalSlot Backend** | As per backend README | API, auth, database |
| **Code editor** | VS Code / Cursor (optional) | Development |

Verify installations:

```bash
node -v    # should be v18.18+ or v20+
npm -v
git --version
```

---

## Getting Started

Follow these steps from a clean machine.

### 1. Clone the repository

```bash
git clone  `git repo url`
cd pathname
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values


### 5. Start the web app

```bash
npm run dev
```

Open in your browser:

```text
http://localhost:3010
```

### 6. Create an account or log in

- **Sign up:** [http://localhost:3010/signup](http://localhost:3010/signup)
- **Log in:** [http://localhost:3010/login](http://localhost:3010/login)
- **Dashboard:** [http://localhost:3010/dashboard](http://localhost:3010/dashboard)

---


## Running the Project

### Development

```bash
npm run dev
```

- URL: **http://localhost:3010**
- Hot reload enabled

### Production build

```bash
npm run build
npm run start
```

---


## Project Structure

```text
goal-slot-web/
├── public/                 # Static assets, PWA icons, marketing images
├── src/
│   ├── app/                # Next.js App Router pages & layouts
│   │   ├── dashboard/      # Authenticated app (goals, schedule, reports, …)
│   │   ├── login/          # Auth pages
│   │   └── signup/
│   ├── components/         # Shared UI (buttons, dialogs, block editor, …)
│   ├── content/            # MDX/Markdown guides
│   ├── features/           # Feature modules (goals, time-tracker, reports, …)
│   ├── hooks/              # Shared React hooks
│   └── lib/                # API client, stores, utilities
├── .env.example            # Environment template
├── next.config.js          # Next.js, PWA, PostHog, API rewrites
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

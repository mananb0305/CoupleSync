# TwoDo - Couple Synchronization App

A synced productivity app for couples to manage goals, tasks, and shared events, built with NestJS (Backend) and React Native (Frontend).

## Prerequisites

- **Node.js** (v18+)
- **Docker Desktop** (for PostgreSQL)
- **Android Studio** (for Android Emulator)
  - Ensure "Android SDK Command-line Tools" and "Android SDK Platform-Tools" are installed.
  - Set `JAVA_HOME` environment variable.
  - Set `ANDROID_HOME` or `ANDROID_SDK_ROOT`.

## Getting Started

### 1. Backend Setup

The backend uses NestJS and PostgreSQL.

```bash
cd backend

# Install dependencies
npm install

# Start PostgreSQL Database
# Ensure Docker Desktop is running first!
cd ..
docker compose up -d
cd backend

# Run the server
npm run start:dev
```
Server runs at `http://localhost:3000`.

### 2. Frontend Setup

The frontend is a React Native app.

```bash
cd frontend

# Install dependencies
npm install

# Start Metro Bundler
npx react-native start

# Run on Android Emulator 
# (Make sure Emulator is running via Android Studio Device Manager)
npx react-native run-android
```

## Features Implemented

- **Authentication**: JWT-based auth with Login/Register.
- **Couple Pairing**: Invite partner via email to link accounts.
- **Dashboard**: Overview of shared tasks and goals.
- **Goals**: Create and track personal/shared goals with progress bars.
- **Tasks**: Shared todo list with points system.
- **Calendar**: Shared events view.
- **Affection**: Send "Hearts" or "Kisses" to your partner.

## Troubleshooting

- **`adb` not found**: Install Android Studio and set up PATH variables.
- **Backend crash (crypto)**: Fixed by polyfilling `crypto` in `main.ts` (Node 18 compatibility).
- **Docker connection**: Ensure Docker Desktop is running and port 5432 is free.

## Tech Stack
- **Backend**: NestJS, TypeORM, PostgreSQL
- **Frontend**: React Native, React Native Paper, Axios, React Navigation

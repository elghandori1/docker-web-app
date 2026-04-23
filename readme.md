# Dockerized Todo Web Application

This project is a full-stack Todo application built with a React frontend, a Node.js and Express backend, and a MySQL database.

The full app runs with Docker Compose, so you can start everything with one command.

## Project Overview

This application allows users to:

- View all tasks
- Add a new task
- Delete a task

The goal of this project is to demonstrate how to build and run a complete web app with separate frontend, backend, and database services in containers.

## Architecture

The app uses 3 services:

- Frontend: React application running in development mode
- Backend: Express API server connected to MySQL
- Database: MySQL 8 container with persistent volume

High-level flow:

1. User opens the frontend in the browser.
2. Frontend sends API requests to the backend.
3. Backend reads and writes task data in MySQL.
4. Backend returns JSON responses to the frontend.

## Features

- Create task
- List tasks
- Delete task
- CORS enabled for frontend-backend communication
- Dockerized development setup
- Persistent MySQL storage with Docker volume

## Technologies Used

## Image Architecture 

![Todo application](/mermaid-Architecture.png)


Frontend:

- React
- JavaScript
- React Scripts

Backend:

- Node.js
- Express
- mysql2
- cors

Database:

- MySQL 8

DevOps and Tools:

- Docker
- Docker Compose

## Project Structure

	docker-web-app/
	├── docker-compose.yml
	├── .env
	├── backend/
	│   ├── Dockerfile
	│   ├── package.json
	│   └── server.js
	└── frontend/
		├── Dockerfile
		├── package.json
		├── public/
		└── src/

## Environment Variables

Create or update a .env file in the project root with values like:

	MYSQL_ROOT_PASSWORD=1234
	MYSQL_DATABASE=testdb
	DB_PORT=3307
	BACKEND_PORT=3001
	FRONTEND_PORT=3000
	REACT_APP_API_URL=http://localhost:3001

## How to Run

1. Make sure Docker Desktop is installed and running.
2. Open a terminal in the project root.
3. Run:

	docker compose up --build

4. Open the app in your browser:

	http://localhost:3000

## API Endpoints

- GET /tasks
  Returns all tasks.

- POST /tasks
  Adds a new task.

- DELETE /tasks/:id
  Deletes a task by id.

## check backend API

  http://localhost:3001/tasks

## Useful Commands

Start services:

	docker compose up --build

Stop services:

	docker compose down

Stop and remove database volume (reset data):

	docker compose down -v

## What We Built

In this project we:

- Built a React frontend for task management
- Built a Node.js and Express API for task operations
- Integrated a MySQL database for persistent storage
- Connected all services with Docker Compose
- Configured environment variables for flexible local setup

## Future Improvements

- Add update and complete task endpoints
- Add task status and due dates
- Add authentication and user accounts
- Add frontend form validation and notifications
- Add automated tests for backend and frontend
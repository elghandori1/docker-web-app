# Dockerized Full-Stack Web Application

This project is a full-stack web application consisting of a React-based frontend and a Node.js backend. Both applications are containerized using Docker to ensure consistent deployment and development environments across different machines.

## 📁 Project Structure

The repository is divided into two main components:

```text
docker-web-app/
├── backend/                # Backend Node.js API
│   ├── Dockerfile          # Docker configuration for the backend
│   ├── index.js            # Main entry point for the backend server
│   ├── package.json        # Backend dependencies and scripts
│   └── README.md           # Backend-specific documentation
├── frontend/               # Frontend React Application
│   ├── Dockerfile          # Docker configuration for the frontend
│   ├── package.json        # Frontend dependencies and scripts
│   ├── public/             # Static public assets (HTML, icons, manifests)
│   ├── src/                # React source code (components, styles, tests)
│   └── README.md           # Frontend-specific documentation
└── readme.md               # Main project documentation (this file)
└── docker-compose.yml      # Multi-container configuration
```

## ⚙️ Docker Compose Setup

### 📄 docker-compose.yml

```YAML
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
```

## ⚙️ How It Works

* React runs on port 3000
* Express backend runs on port 5000
* Docker Compose connects both using an internal network

## ⚙️ Run the Application

### ▶️ Start everything

```bash
docker compose up --build
```

### 🌐 Open in browser

👉 http://localhost:3000

You should see:

React + Docker
Hello from Backend!

### 🛑 Stop everything

Stop everything: Press Ctrl + C  or run docker-compose down

### Why use "proxy": "http://backend:5000" in React In frontend/package.json

1. Simplifies Code (Relative Paths)
It allows the React frontend to communicate with the API without hardcoding the full URL. Instead of writing fetch("http://localhost:5000/api/data"), you simply use:
fetch("/api/data")
React automatically forwards this request to http://backend:5000/api/data.

2. Bridges the Docker Network
Inside the Docker Compose network, backend is the service name (internal DNS). However, your browser (which is outside Docker) doesn't know what "backend" means—it only understands localhost. The proxy acts as a middle layer that lives inside the network and forwards your browser's requests to the correct internal container.

3. Bypasses CORS Issues
Browsers often block requests when a frontend (Port 3000) tries to talk to a backend (Port 5000). By using a proxy, the browser thinks the request is staying on Port 3000, while the development server secretly handles the jump to Port 5000, preventing "Cross-Origin" security errors.
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
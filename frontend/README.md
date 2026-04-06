# React Web App with Docker 🐳

This project is a fundamental exploration of containerizing a React.js frontend application. It demonstrates how to transition a standard web environment into a portable, isolated Docker container.

## 🚀 Overview
The goal of this project was to learn the **Containerization Workflow** by wrapping a React application (bootstrapped with `create-react-app`) inside a Docker image. This ensures that the application runs identically on any machine, regardless of the local Node.js version.

## 🛠️ Tech Stack
* **Frontend:** React.js
* **Containerization:** Docker
* **Runtime:** Node.js (v18)

## 🏗️ Docker Implementation

```bash
mkdir docker-web-app
cd docker-web-app

npx create-react-app frontend
cd frontend
```
* Create a Dockerfile inside the /frontend directory:

```dockerfile
# Use Node 18 as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port React runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
```

### The Dockerfile
The project uses a `Dockerfile` to automate the environment setup:
1.  **Base Image:** Uses `node:18` as the operating system layer.
2.  **Environment:** Sets `/app` as the working directory.
3.  **Dependencies:** Copies `package.json` and runs `npm install` inside the container.
4.  **Source Code:** Moves the React source code into the image.
5.  **Networking:** Exposes port `3000` for browser access.


## 🚦 How to work

### Build the Image

```bash
docker build -t react-app .
```

### Run the container with port mapping
```bash
docker run -p 3000:3000 react-app
```

### Test: 👉 http://localhost:3000
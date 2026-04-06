# Express Backend with Docker 🐳

This project demonstrates the containerization of a Node.js Express API. It focuses on creating a lightweight, isolated backend service that communicates seamlessly with a frontend.

## 🚀 Overview
The goal of this project was to learn how to containerize a backend REST API. By using Docker, we ensure that the server environment, including all dependencies like Express and CORS, is consistent across all development and production stages without requiring a local Node.js installation.

## 🛠️ Tech Stack
* **Backend:** Node.js & Express
* **Middleware:** CORS (Cross-Origin Resource Sharing)
* **Containerization:** Docker
* **Runtime:** Node.js (v18)

## 🏗️ Docker Implementation

```bash
mkdir backend
cd backend

# Note: These generate the metadata needed for the Docker build
npm init -y
npm install express cors
```

* create index.js file with content:

```JavaScript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/api/data', (req, res) => {
  res.json({ message: "Hello from Backend!" });
});

app.listen(5000, '0.0.0.0', () => {
  console.log('Backend running on port 5000');
});
```

* dockerfile with content:

```dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "index.js"]
```

## 🚦 How to work

### Build the Image

```bash
docker build -t backend-app .
```

### Run the container with port mapping
```bash
docker run -p 5000:5000 backend-app
```

### Test: 👉 http://localhost:5000/api/data

### Note on Networking: 
We use 0.0.0.0 as the host in app.listen() to ensure the Express server accepts connections from outside the container. If set to localhost or 127.0.0.1, the container will reject any requests sent from your browser or frontend.
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
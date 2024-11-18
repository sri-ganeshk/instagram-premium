const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());

const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Endpoint to handle login requests
app.post('/login', (req, res) => {
    console.log('Received request:', req.body);
  
    res.json({ success: true, message: 'HTTP request received successfully!' });
  });
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

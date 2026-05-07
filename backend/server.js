const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
// connectDB(); // Disabled for testing without local mongo

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('../frontend')); // Serve frontend static files

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/careers', require('./routes/careerRoutes'));
app.use('/api/quiz', require('./routes/quizRoutes'));

// Root endpoint for testing API
app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to the Career Advisor API' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

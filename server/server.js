const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const volunteerRoutes = require('./routes/volunteer');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.log('Continuing without database connection...');
    // process.exit(1); // Keep server running for static files
  }
};

// Connect to Database
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

// Middleware
app.use(express.json()); // Body parser
app.use(cors()); // Enable CORS
app.use(helmet({
  contentSecurityPolicy: false // Disabled for simplicity with existing scripts/styles
}));
app.use(xss()); // Prevent XSS attacks
app.use(morgan('dev')); // Logging

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api', volunteerRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

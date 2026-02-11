const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const morgan = require('morgan');
const path = require('path');
const compression = require('compression');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const volunteerRoutes = require('./routes/volunteer');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB (Serverless-friendly)
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      dbName: 'aditya_campaign'
    };

    cached.promise = mongoose.connect(process.env.MONGO_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log(`MongoDB Connected: ${cached.conn.connection.host}`);
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};

// Middleware
app.use(compression()); // Compress all responses
app.use(express.json()); // Body parser
app.use(cors()); // Enable CORS
app.use(helmet({
  contentSecurityPolicy: false // Disabled for simplicity with existing scripts/styles
}));
app.use(xss()); // Prevent XSS attacks
app.use(morgan('dev')); // Logging

// Serve static files with caching
app.use(express.static(path.join(__dirname, '../public'), {
  maxAge: '1d',
  etag: true
}));

// Connect to DB before handling requests
app.use(async (req, res, next) => {
  if (req.path.startsWith('/api')) {
    try {
      await connectDB();
    } catch (error) {
      console.error('Database Connection Error:', error);
      return res.status(500).json({
        success: false,
        message: 'Database connection failed. Please try again later.'
      });
    }
  }
  next();
});

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

// Start Server (Only if not in serverless environment)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
}

module.exports = app;

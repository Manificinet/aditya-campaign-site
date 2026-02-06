const rateLimit = require('express-rate-limit');

const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // Limit each IP to 5 submissions per hour
  message: {
    success: false,
    message: 'Too many submissions from this IP, please try again after an hour'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = formLimiter;

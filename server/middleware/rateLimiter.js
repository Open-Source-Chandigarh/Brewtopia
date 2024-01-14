const { rateLimit } = require("express-rate-limit");

const UserLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  limit: 10, // Limit each IP to 10 requests per `window` (here, per 1 minute).
  message: "Too many user requests from this IP, please try again later",
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false,
});

const orderLimiter = rateLimit({
  windowMs: 60 * 1000, 
  limit: 10,
  message: "Too many order requests from this IP, please try again later",
  standardHeaders: "draft-7", 
  legacyHeaders: false,
});

const paymentLimiter = rateLimit({
  windowMs: 60 * 1000, 
  limit: 10,
  message: "Too many payment requests from this IP, please try again later",
  standardHeaders: "draft-7", 
  legacyHeaders: false,
});

const cartLimiter = rateLimit({
  windowMs: 60 * 1000, 
  limit: 15,
  message: "Too many cart requests from this IP, please try again later",
  standardHeaders: "draft-7", 
  legacyHeaders: false,
});

module.exports = { UserLimiter, orderLimiter, paymentLimiter, cartLimiter };

const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db.js");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDb();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS configuration
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://brewtopia.netlify.app");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// Routes
const userRouter = require("./routes/user.js");
const cartRouter = require("./routes/cart.js");
const paymentRouter = require("./routes/payment.js");
const ordersRouter = require("./routes/orders.js");
const keysRouter = require("./routes/keys.js");

app.use(userRouter);
app.use(cartRouter);
app.use(paymentRouter);
app.use(ordersRouter);
app.use(keysRouter);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

//requiring all the modules
const express = require("express");
const app = express();
const cors = require("cors");

const connectDb = require("./config/db.js")

const userRouter = require("./routes/user.js")
const cartRouter = require("./routes/cart.js")
const paymentRouter = require("./routes/payment.js")
const ordersRouter = require("./routes/orders.js")
const keysRouter = require("./routes/keys.js")

require("dotenv").config();

connectDb();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
//for json stringify
app.use(express.json());

//for cross site accessing
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(userRouter);

app.use(cartRouter);

app.use(paymentRouter);

app.use(ordersRouter);

app.use(keysRouter);

//server will be listening at port 5000
app.listen( process.env.PORT, () => {
  console.log(`server is listening on ${process.env.PORT}`);
});

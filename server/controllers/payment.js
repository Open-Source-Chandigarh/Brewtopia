const UserModel = require("../models/Users");
const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();

//making instance for razorpay which has key and secret
var instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

const checkout = async (req, res) => {
  //making some options for razorpay
  try {
    const options = {
      amount: Number(req.body.amount * 100), // converting amount to number and changing to paise
      currency: "INR",
    };

    //creating an order with razorpay method
    const order = await instance.orders
      .create(options)
      .catch((err) => console.log("here", err));
    //sending true status to app and order also
    //to make it access there because request window will be made there
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Error creating Razorpay order",
    });
  }
};

const paymentverification = async (req, res) => {
  //getting payment details
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  let body = razorpay_order_id + "|" + razorpay_payment_id;

  //here its making expected signature
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  //if server side expected signature match signatures
  const isMatched = expectedSignature === razorpay_signature;
  if (isMatched) {
    //fetching payment details from server by payment_id
    await instance.payments
      .fetch(razorpay_payment_id)
      .then(async (payment) => {
        //destructuring the needed data from payment object
        const { amount, order_id, method, created_at } = payment;

        //to reset cart and total on mongoose database
        const cart = [];
        const total = 0;
        const { username } = req.query;

        //formatting the date gotten from created_At
        const date = new Date(created_at * 1000); // Multiply by 1000 to convert seconds to milliseconds

        const time = date.toLocaleString("en-IN", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          timeZoneName: "short",
        });

        // making order_details object
        const order_details = { amount, order_id, method, time };

        //updating orders and making cart empty
        const data = await UserModel.findOneAndUpdate(
          { username: username },
          {
            cart: cart,
            cartTotal: total,
            $push: { AllOrders: { $each: [order_details] } },
          },
          { new: true }
        );
      })
      .catch((error) => {
        console.log(error);
      });

    //redirecting to success payment page with payment_id
    res.redirect(
      `${process.env.ACCESS_URL}/paymentsuccess?reference=${razorpay_payment_id}`
    );
  } else {
    //if not matched we will give error
    res.status(400).json({
      success: false,
      error: "Signature mismatch",
    });
  }
};

module.exports = { checkout, paymentverification };

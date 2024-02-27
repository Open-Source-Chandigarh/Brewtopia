const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cart: [
      {
        name: { type: String },
        photo: { type: String },
        price: { type: Number },
        count: { type: Number },
      },
    ],
    cartTotal: {
      type: Number,
    },
    AllOrders: [
      {
        order_id: { type: String },
        amount: { type: Number },
        method: { type: String },
        time: { type: String },
      },
    ],
  },
  { validateBeforeSave: true }
);

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;

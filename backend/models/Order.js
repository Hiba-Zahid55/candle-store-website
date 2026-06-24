const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  products: Array,
  total: Number,

  customer: {
    name: String,
    email: String,
    phone: String,
    address: String
  },

  status: {
    type: String,
    default: "COD Pending"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", OrderSchema);
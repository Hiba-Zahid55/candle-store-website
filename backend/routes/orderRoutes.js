const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const order = await Order.create(req.body);
  res.json(order);
  console.log("ORDER ROUTE LOADED");
});

module.exports = router;
const router = require("express").Router();
const Product = require("../models/Product");
const admin = require("../middleware/admin");


// ✅ GET ALL PRODUCTS (PUBLIC)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});


// ✅ CREATE PRODUCT (ADMIN ONLY)
router.post("/", admin, async (req, res) => {
  try {
    const { name, price, image, description } = req.body;

    if (!name || !price || !image) {
      return res.status(400).json("All fields required");
    }

    const product = await Product.create({
      name,
      price,
      image,
      description
    });

    res.json(product);

  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});


// ✅ UPDATE PRODUCT (ADMIN ONLY)
router.put("/:id", admin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(product);

  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});


// ✅ DELETE PRODUCT (ADMIN ONLY)
router.delete("/:id", admin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
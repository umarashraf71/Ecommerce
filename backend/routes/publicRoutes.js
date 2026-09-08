const express = require("express");

const {
  getProducts,
  getCategories
} = require("../controllers/publicController.js");

const router = express.Router();
router.get("/health", (req, res) => {
  res.status(200).json({ message: "API is healthy" });
});

// /products
router.get("/getProducts", getProducts);
router.get("/getCategories", getCategories);


module.exports = router;
const express = require("express");

const {
  getProducts,
  getCategories
} = require("../controllers/publicController.js");

const router = express.Router();


// /products
router.get("/getProducts", getProducts);
router.get("/getCategories", getCategories);


module.exports = router;
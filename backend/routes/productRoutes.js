const express = require("express");

const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  updateStatus,
  deleteProduct,
} = require("../controllers/productController.js");

const router = express.Router();


// /products
router.get("/", getProducts);

router.post("/", addProduct);

// Keep this ABOVE "/:id" so "updateStatus" is not read as an id
router.post("/updateStatus", updateStatus);

router.get("/:id", getProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);


module.exports = router;
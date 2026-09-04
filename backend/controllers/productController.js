const Product = require("../models/Products.js");
const Category = require("../models/Category.js");


// Get all products
const getProducts = async (req, res) => {

  try {

    const products = await Product.find()
                                .populate({
                                    path: "category",
                                    select: "_id name",
                                })
                                .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      products,
    });

  } catch (error) {

    console.log("Get Products Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load products",
    });

  }
};


// Get single product
const getProduct = async (req, res) => {

  try {

    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {

    console.log("Get Product Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load product",
    });

  }
};


// Add product
const addProduct = async (req, res) => {

  try {

    const {
      name,
      category,
      image,
      price,
      rating,
      reviews,
      onSale,
      status,
    } = req.body;

    if (!name || !category || !image || price === undefined || price === "") {
      return res.status(400).json({
        success: false,
        message: "Name, category, image and price are required",
      });
    }

    // Category must exist
    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
      return res.status(400).json({
        success: false,
        message: "Selected category does not exist",
      });
    }

    // Name must be unique
    const productExists = await Product.findOne({
      name: name.trim(),
    });

    if (productExists) {
      return res.status(400).json({
        success: false,
        message: "Product with this name already exists",
      });
    }

    const product = await Product.create({
      name: name.trim(),
      category,
      image: image.trim(),
      price: Number(price),
      rating: Number(rating) || 0,
      reviews: Number(reviews) || 0,
      onSale: onSale === true || onSale === "true",
      status: status === undefined ? true : status === true || status === "true",
    });

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });

  } catch (error) {

    console.log("Add Product Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add product",
    });

  }
};


// Update product
const updateProduct = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      name,
      category,
      image,
      price,
      rating,
      reviews,
      onSale,
      status,
    } = req.body;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (category) {

      const categoryExists = await Category.findById(category);

      if (!categoryExists) {
        return res.status(400).json({
          success: false,
          message: "Selected category does not exist",
        });
      }
    }

    // Another product should not have the same name
    if (name) {

      const nameTaken = await Product.findOne({
        name: name.trim(),
        _id: { $ne: id },
      });

      if (nameTaken) {
        return res.status(400).json({
          success: false,
          message: "Product with this name already exists",
        });
      }
    }

    product.name = name ? name.trim() : product.name;
    product.category = category || product.category;
    product.image = image ? image.trim() : product.image;
    product.price = price !== undefined && price !== "" ? Number(price) : product.price;
    product.rating = rating !== undefined && rating !== "" ? Number(rating) : product.rating;
    product.reviews = reviews !== undefined && reviews !== "" ? Number(reviews) : product.reviews;

    if (onSale !== undefined) {
      product.onSale = onSale === true || onSale === "true";
    }

    if (status !== undefined) {
      product.status = status === true || status === "true";
    }

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });

  } catch (error) {

    console.log("Update Product Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update product",
    });

  }
};


// Activate / Deactivate product
const updateStatus = async (req, res) => {

  try {

    const { id, status } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product id is required",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.status = status === true || status === "true";

    await product.save();

    return res.status(200).json({
      success: true,
      message: product.status
        ? "Product activated successfully"
        : "Product deactivated successfully",
      product,
    });

  } catch (error) {

    console.log("Update Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update product status",
    });

  }
};


// Delete product
const deleteProduct = async (req, res) => {

  try {

    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {

    console.log("Delete Product Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });

  }
};


module.exports = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  updateStatus,
  deleteProduct,
};
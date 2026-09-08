const Product = require("../models/Products.js");
const Category = require("../models/Category.js");


// Get all products
const getProducts = async (req, res) => {

  try {

    const products = await Product.aggregate([
                            {
                                $match: {
                                    status: true,
                                },
                            },
                            {
                                $lookup: {
                                    from: "categories",
                                    localField: "category",
                                    foreignField: "_id",
                                    as: "category",
                                },
                            },
                            {
                                $unwind: "$category",
                            },
                            {
                                $match: {
                                    "category.status": true,
                                },
                            },
                            {
                                $sort: {
                                    createdAt: -1,
                                },
                            },
                        ]);

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


const getCategories = async (req, res) => {
  try {

    const categories = await Category.find({ status: true }).sort({ _id: -1 });


    res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });

  } catch (error) {

    console.log(
      "Get Categories Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to get categories",
      error: error.message,
    });
  }
};





module.exports = {
  getProducts,
  getCategories
};
const Category = require("../models/Category");


// CREATE CATEGORY
const createCategory = async (req, res) => {
  try {

    const {
      name,
      status,
    } = req.body;



    // Check if category already exists
    const existingCategory = await Category.findOne({
      name,
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }


    const category = await Category.create({
      name,
      status,
    });


    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });

  } catch (error) {

    console.log(
      "Create Category Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to create category",
      error: error.message,
    });
  }
};



// GET ALL CATEGORIES
const getCategories = async (req, res) => {
  try {

    const categories = await Category.find()
      .sort({ _id: -1 });


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



// GET SINGLE CATEGORY
const getCategoryById = async (req, res) => {
  try {

    const category = await Category.findById(
      req.params.id
    );


    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }


    res.status(200).json({
      success: true,
      category,
    });

  } catch (error) {

    console.log(
      "Get Category Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to get category",
      error: error.message,
    });
  }
};


const updateCategoryStatus = async (req, res) => {
  try { 

    const category = await Category.findById(req.body.id);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    category.status = req.body.status === 'activate' ? true : false;
    await category.save();

    res.status(200).json({
      success: true,
      message: "Category status updated successfully",
      category,
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    
  }
  catch (error) {

    console.log(
      "Update Category Status Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to update category status",
      error: error.message,
    });
  }

}


// UPDATE CATEGORY
const updateCategory = async (req, res) => {
  try {

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );


    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }


    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });

  } catch (error) {

    console.log(
      "Update Category Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to update category",
      error: error.message,
    });
  }
};



// DELETE CATEGORY
const deleteCategory = async (req, res) => {
  try {

    const category = await Category.findByIdAndDelete(
      req.params.id
    );


    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }


    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });

  } catch (error) {

    console.log(
      "Delete Category Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to delete category",
      error: error.message,
    });
  }
};



module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  updateCategoryStatus
};
const Order = require("../models/Order");
const Product = require("../models/Products");

const placeOrder = async (req, res) => {
  try {
    const {
      products: cartProducts,
      checkoutDetails,
      paymentMethod,
    } = req.body;

    // =========================================
    // 1. VALIDATE CART
    // =========================================

    if (!cartProducts || !Array.isArray(cartProducts)) {
      return res.status(400).json({
        success: false,
        message: "Products are required",
      });
    }

    if (cartProducts.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty",
      });
    }

    // =========================================
    // 2. VALIDATE CHECKOUT DETAILS
    // =========================================

    if (!checkoutDetails) {
      return res.status(400).json({
        success: false,
        message: "Checkout details are required",
      });
    }

    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "postalCode",
    ];

    for (const field of requiredFields) {
      if (!checkoutDetails[field]?.trim()) {
        return res.status(400).json({
          success: false,
          message: `${field} is required`,
        });
      }
    }

    // =========================================
    // 3. VALIDATE PAYMENT METHOD
    // =========================================

    if (!["cod", "card"].includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method",
      });
    }

    // =========================================
    // 4. VALIDATE CART ITEMS
    // =========================================

    for (const item of cartProducts) {
      if (!item.product) {
        return res.status(400).json({
          success: false,
          message: "Product ID is required",
        });
      }

      const quantity = Number(item.quantity);

      if (!Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({
          success: false,
          message: "Invalid product quantity",
        });
      }
    }

    // =========================================
    // 5. GET PRODUCT IDS
    // =========================================

    const productIds = cartProducts.map(
      (item) => item.product
    );

    // =========================================
    // 6. GET ACTIVE PRODUCTS
    // =========================================

    const dbProducts = await Product.find({
      _id: { $in: productIds },
      status: true,
    }).populate({
      path: "category",
      select: "_id name status",
      match: {
        status: true,
      },
    });

    // =========================================
    // 7. CHECK ALL PRODUCTS EXIST
    // =========================================

    if (dbProducts.length !== productIds.length) {
      return res.status(400).json({
        success: false,
        message:
          "One or more products are unavailable",
      });
    }

    // =========================================
    // 8. CHECK ACTIVE CATEGORIES
    // =========================================

    const invalidProduct = dbProducts.find(
      (product) => !product.category
    );

    if (invalidProduct) {
      return res.status(400).json({
        success: false,
        message:
          "One or more products have an unavailable category",
      });
    }

    // =========================================
    // 9. CREATE ORDER PRODUCTS
    // =========================================

    const orderProducts = cartProducts.map((cartItem) => {
      const product = dbProducts.find(
        (item) =>
          item._id.toString() ===
          cartItem.product.toString()
      );

      return {
        product: product._id,

        name: product.name,

        image: product.image,

        price: product.price,

        quantity: Number(cartItem.quantity),

        category: {
          _id: product.category._id,
          name: product.category.name,
        },
      };
    });

    // =========================================
    // 10. CALCULATE SUBTOTAL
    // =========================================

    const subtotal = orderProducts.reduce(
      (total, item) => {
        return total + item.price * item.quantity;
      },
      0
    );

    // =========================================
    // 11. CALCULATE SHIPPING
    // =========================================

    const shipping = subtotal >= 100 ? 0 : 10;

    // =========================================
    // 12. CALCULATE TOTAL
    // =========================================

    const total = subtotal + shipping;

    // =========================================
    // 13. CREATE ORDER
    // =========================================

    const order = await Order.create({
      user: req.user,

      products: orderProducts,

      checkoutDetails: {
        firstName: checkoutDetails.firstName,
        lastName: checkoutDetails.lastName,
        email: checkoutDetails.email,
        phone: checkoutDetails.phone,
        address: checkoutDetails.address,
        apartment: checkoutDetails.apartment || "",
        city: checkoutDetails.city,
        state: checkoutDetails.state,
        postalCode: checkoutDetails.postalCode,
      },

      paymentMethod,

      subtotal,

      shipping,

      total,

      status: "pending",
    });

    // =========================================
    // 14. RESPONSE
    // =========================================

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Place Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while placing order",
      error: error.message,
    });
  }
};

module.exports = {
  placeOrder,
};
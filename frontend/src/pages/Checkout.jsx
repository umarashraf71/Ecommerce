import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../utils/api.js";
import { useCart } from "../context/CartContext";

function Checkout() {
  const navigate = useNavigate();

  const {
    cartItems,
    clearCart,
  } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderError, setOrderError] = useState("");

  // --------------------------------
  // Calculate Order Summary
  // --------------------------------

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal >= 100 ? 0 : 10;

  const total = subtotal + shipping;

  // --------------------------------
  // Handle Input Change
  // --------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // --------------------------------
  // Handle Payment Method
  // --------------------------------

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
  };

  // --------------------------------
  // Place Order
  // --------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    setOrderError("");

    // Check cart
    if (cartItems.length === 0) {
      setOrderError("Your cart is empty.");
      return;
    }

    // Basic frontend validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.postalCode
    ) {
      setOrderError("Please fill in all required fields.");
      return;
    }

    try {
      setPlacingOrder(true);

      // --------------------------------
      // Only send important product data
      // --------------------------------

      const orderData = {
        products: cartItems.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),

        checkoutDetails: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
        },

        paymentMethod,
      };

      console.log("Order Request:", orderData);

      const response = await api.post("/orders/place-order",
        orderData
      );

      console.log("Order Response:", response.data);

      if (response.data.success) {
        // Clear cart
        clearCart();

        // Show success message
        alert("Order placed successfully!");

        // Redirect to orders page
        navigate("/dashboard");
      } else {
        setOrderError(
          response.data.message || "Failed to place order."
        );
      }
    } catch (error) {
      console.error("Place Order Error:", error);

      if (error.response) {
        setOrderError(
          error.response.data?.message ||
            "Failed to place order."
        );
      } else {
        setOrderError(
          "Unable to connect to the server. Please try again."
        );
      }
    } finally {
      setPlacingOrder(false);
    }
  };

  // --------------------------------
  // Empty Cart
  // --------------------------------

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="empty-cart">
          <h2>Your cart is empty</h2>

          <p>
            Please add some products before proceeding to checkout.
          </p>

          <Link to="/products" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">

      {/* =================================
          Page Header
      ================================= */}

      <div className="checkout-header">
        <div className="container">

          <div className="breadcrumb">
            <Link to="/">Home</Link>

            <span>/</span>

            <Link to="/cart">Cart</Link>

            <span>/</span>

            <span>Checkout</span>
          </div>

          <h1>Checkout</h1>

        </div>
      </div>


      {/* =================================
          Checkout Content
      ================================= */}

      <div className="container">

        <form
          className="checkout-layout"
          onSubmit={handleSubmit}
        >

          {/* =================================
              LEFT SIDE
          ================================= */}

          <div className="checkout-left">

            {/* -------------------------------
                Contact Information
            -------------------------------- */}

            <div className="checkout-section">

              <div className="section-header">
                <h2>Contact Information</h2>
              </div>

              <div className="form-group">

                <label htmlFor="email">
                  Email Address *
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />

              </div>

              <div className="form-group">

                <label htmlFor="phone">
                  Phone Number *
                </label>

                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />

              </div>

            </div>


            {/* =================================
                Shipping Information
            ================================= */}

            <div className="checkout-section">

              <div className="section-header">
                <h2>Shipping Information</h2>
              </div>


              {/* First / Last Name */}

              <div className="form-row">

                <div className="form-group">

                  <label htmlFor="firstName">
                    First Name *
                  </label>

                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    required
                  />

                </div>


                <div className="form-group">

                  <label htmlFor="lastName">
                    Last Name *
                  </label>

                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    required
                  />

                </div>

              </div>


              {/* Address */}

              <div className="form-group">

                <label htmlFor="address">
                  Address *
                </label>

                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street address"
                  required
                />

              </div>


              {/* Apartment */}

              <div className="form-group">

                <label htmlFor="apartment">
                  Apartment, Suite, etc.
                </label>

                <input
                  type="text"
                  id="apartment"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleChange}
                  placeholder="Apartment, suite, unit, etc."
                />

              </div>


              {/* City / State */}

              <div className="form-row">

                <div className="form-group">

                  <label htmlFor="city">
                    City *
                  </label>

                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                  />

                </div>


                <div className="form-group">

                  <label htmlFor="state">
                    State *
                  </label>

                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    required
                  />

                </div>

              </div>


              {/* Postal Code */}

              <div className="form-group">

                <label htmlFor="postalCode">
                  Postal Code *
                </label>

                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="Postal code"
                  required
                />

              </div>

            </div>


            {/* =================================
                Payment Information
            ================================= */}

            <div className="checkout-section">

              <div className="section-header">
                <h2>Payment Method</h2>
              </div>


              {/* -------------------------------
                  Cash On Delivery
              -------------------------------- */}

              <div
                className={`payment-option ${
                  paymentMethod === "cod"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  handlePaymentMethod("cod")
                }
              >

                <div className="payment-option-header">

                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() =>
                      handlePaymentMethod("cod")
                    }
                  />

                  <div>
                    <h3>Cash on Delivery</h3>

                    <p>
                      Pay when your order is delivered.
                    </p>
                  </div>

                </div>

              </div>


              {/* -------------------------------
                  Card
              -------------------------------- */}

              <div
                className={`payment-option ${
                  paymentMethod === "card"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  handlePaymentMethod("card")
                }
              >

                <div className="payment-option-header">

                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={() =>
                      handlePaymentMethod("card")
                    }
                  />

                  <div>
                    <h3>Credit / Debit Card</h3>

                    <p>
                      Pay securely using your card.
                    </p>
                  </div>

                </div>


                {/* Card UI */}

                {paymentMethod === "card" && (
                  <div className="card-payment-info">

                    <div className="form-group">

                      <label>
                        Card Number
                      </label>

                      <input
                        type="text"
                        placeholder="XXXX XXXX XXXX XXXX"
                        disabled
                      />

                    </div>


                    <div className="form-row">

                      <div className="form-group">

                        <label>
                          Expiry Date
                        </label>

                        <input
                          type="text"
                          placeholder="MM/YY"
                          disabled
                        />

                      </div>


                      <div className="form-group">

                        <label>
                          CVV
                        </label>

                        <input
                          type="password"
                          placeholder="CVV"
                          disabled
                        />

                      </div>

                    </div>

                    <p className="payment-note">
                      Card payments will be handled through a
                      secure payment gateway.
                    </p>

                  </div>
                )}

              </div>

            </div>


            {/* =================================
                Error Message
            ================================= */}

            {orderError && (
              <div className="checkout-error">
                {orderError}
              </div>
            )}


            {/* =================================
                Place Order
            ================================= */}

            <button
              type="submit"
              className="place-order-btn"
              disabled={placingOrder}
            >

              {placingOrder
                ? "Placing Order..."
                : "Place Order"}

            </button>

          </div>


          {/* =================================
              RIGHT SIDE - ORDER SUMMARY
          ================================= */}

          <div className="checkout-right">

            <div className="order-summary">

              <h2>Order Summary</h2>


              {/* -------------------------------
                  Cart Items
              -------------------------------- */}

              <div className="summary-items">

                {cartItems.map((item) => (

                  <div
                    className="summary-item"
                    key={item._id}
                  >

                    <div className="summary-item-image">

                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <span className="item-quantity">
                        {item.quantity}
                      </span>

                    </div>


                    <div className="summary-item-details">

                      <h3>{item.name}</h3>

                      <p>
                        {item.category?.name}
                      </p>

                    </div>


                    <div className="summary-item-price">

                      $
                      {(item.price * item.quantity).toFixed(2)}

                    </div>

                  </div>

                ))}

              </div>


              {/* -------------------------------
                  Price Summary
              -------------------------------- */}

              <div className="summary-calculation">

                <div className="summary-row">

                  <span>Subtotal</span>

                  <span>
                    ${subtotal.toFixed(2)}
                  </span>

                </div>


                <div className="summary-row">

                  <span>Shipping</span>

                  <span>
                    {shipping === 0
                      ? "Free"
                      : `$${shipping.toFixed(2)}`}
                  </span>

                </div>


                {shipping === 0 && (
                  <p className="free-shipping-message">
                    You qualify for free shipping.
                  </p>
                )}


                <div className="summary-total">

                  <span>Total</span>

                  <strong>
                    ${total.toFixed(2)}
                  </strong>

                </div>

              </div>


              {/* -------------------------------
                  Back To Cart
              -------------------------------- */}

              <Link
                to="/cart"
                className="back-to-cart"
              >
                ← Back to Cart
              </Link>

            </div>

          </div>

        </form>

      </div>

    </div>
  );
}

export default Checkout;
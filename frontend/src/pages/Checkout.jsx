import React, { useState } from "react";
import { Link } from "react-router";
import { useCart } from "../context/CartContext";


function Checkout() {

  const {cartItems} = useCart();
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal >= 100 ? 0 : 10;

  const total = subtotal + shipping;

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Checkout Data:", {
      customer: formData,
      paymentMethod,
      cartItems,
      subtotal,
      shipping,
      total,
    });

    alert("Order placed successfully!");
  };

  return (
    <div className="checkout-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <section className="checkout-page-header">

        <div className="checkout-header-content">

          <p className="section-subtitle">
            SECURE CHECKOUT
          </p>

          <h1>Checkout</h1>

          <p>
            Complete your information to place your order.
          </p>

        </div>

      </section>


      {/* =====================================================
          CHECKOUT SECTION
      ===================================================== */}

      <section className="checkout-section">

        <form
          className="checkout-layout"
          onSubmit={handleSubmit}
        >

          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <div className="checkout-form">


            {/* =============================================
                CONTACT INFORMATION
            ============================================= */}

            <div className="checkout-card">

              <div className="checkout-card-header">

                <span className="checkout-number">
                  01
                </span>

                <div>
                  <h2>Contact Information</h2>

                  <p>
                    How can we contact you?
                  </p>
                </div>

              </div>


              <div className="form-grid">

                <div className="form-group">

                  <label>
                    First Name
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    Last Name
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    Email Address
                    <span>*</span>
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    Phone Number
                    <span>*</span>
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+92 300 1234567"
                    required
                  />

                </div>

              </div>

            </div>


            {/* =============================================
                SHIPPING INFORMATION
            ============================================= */}

            <div className="checkout-card">

              <div className="checkout-card-header">

                <span className="checkout-number">
                  02
                </span>

                <div>
                  <h2>Shipping Address</h2>

                  <p>
                    Where should we deliver your order?
                  </p>
                </div>

              </div>


              <div className="form-grid">

                <div className="form-group form-full">

                  <label>
                    Street Address
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House number and street name"
                    required
                  />

                </div>


                <div className="form-group form-full">

                  <label>
                    Apartment, Suite, etc.
                    <small>(Optional)</small>
                  </label>

                  <input
                    type="text"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleChange}
                    placeholder="Apartment, suite, unit, etc."
                  />

                </div>


                <div className="form-group">

                  <label>
                    City
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    State / Province
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter state"
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    Postal Code
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="Postal code"
                    required
                  />

                </div>

              </div>

            </div>


            {/* =============================================
                PAYMENT METHOD
            ============================================= */}

            <div className="checkout-card">

              <div className="checkout-card-header">

                <span className="checkout-number">
                  03
                </span>

                <div>
                  <h2>Payment Method</h2>

                  <p>
                    Choose your preferred payment method.
                  </p>
                </div>

              </div>


              <div className="payment-options">


                {/* COD */}

                <label
                  className={`payment-option ${
                    paymentMethod === "cod"
                      ? "selected"
                      : ""
                  }`}
                >

                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                  />

                  <div className="payment-option-content">

                    <div className="payment-icon">
                      💵
                    </div>

                    <div>
                      <strong>
                        Cash on Delivery
                      </strong>

                      <p>
                        Pay when your order arrives.
                      </p>
                    </div>

                  </div>

                </label>


                {/* CARD */}

                <label
                  className={`payment-option ${
                    paymentMethod === "card"
                      ? "selected"
                      : ""
                  }`}
                >

                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                  />

                  <div className="payment-option-content">

                    <div className="payment-icon">
                      💳
                    </div>

                    <div>
                      <strong>
                        Credit / Debit Card
                      </strong>

                      <p>
                        Secure online card payment.
                      </p>
                    </div>

                  </div>

                </label>


                {/* CARD DETAILS */}

                {paymentMethod === "card" && (

                  <div className="card-payment-details">

                    <div className="form-group form-full">

                      <label>
                        Card Number
                        <span>*</span>
                      </label>

                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                      />

                    </div>


                    <div className="form-grid">

                      <div className="form-group">

                        <label>
                          Expiry Date
                          <span>*</span>
                        </label>

                        <input
                          type="text"
                          placeholder="MM / YY"
                        />

                      </div>


                      <div className="form-group">

                        <label>
                          CVV
                          <span>*</span>
                        </label>

                        <input
                          type="text"
                          placeholder="123"
                        />

                      </div>

                    </div>

                  </div>

                )}

              </div>

            </div>

          </div>


          {/* =================================================
              RIGHT SIDE - ORDER SUMMARY
          ================================================= */}

          <aside className="checkout-summary">

            <div className="checkout-summary-card">

              <div className="checkout-summary-header">

                <h2>Your Order</h2>

                <Link to="/cart">
                  Edit Cart
                </Link>

              </div>


              {/* CART ITEMS */}

              <div className="checkout-items">

                {cartItems.map((item) => (

                  <div
                    className="checkout-item"
                    key={item.id}
                  >

                    <div className="checkout-item-image">

                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <span>
                        {item.quantity}
                      </span>

                    </div>


                    <div className="checkout-item-info">

                      <h3>
                        {item.name}
                      </h3>

                      <p>
                        ${item.price.toFixed(2)}
                      </p>

                    </div>


                    <strong>
                      $
                      {(item.price * item.quantity).toFixed(
                        2
                      )}
                    </strong>

                  </div>

                ))}

              </div>


              {/* SUMMARY */}

              <div className="checkout-summary-details">

                <div className="summary-row">

                  <span>
                    Subtotal
                  </span>

                  <strong>
                    ${subtotal.toFixed(2)}
                  </strong>

                </div>


                <div className="summary-row">

                  <span>
                    Shipping
                  </span>

                  <strong>
                    {shipping === 0
                      ? "FREE"
                      : `$${shipping.toFixed(2)}`}
                  </strong>

                </div>

              </div>


              <div className="summary-divider"></div>


              <div className="checkout-total">

                <span>
                  Total
                </span>

                <strong>
                  ${total.toFixed(2)}
                </strong>

              </div>


              {/* PLACE ORDER */}

              <button
                type="submit"
                className="place-order-button"
              >
                Place Order
                <span>→</span>
              </button>


              <div className="checkout-security">

                <span>🔒</span>

                <p>
                  Your payment and personal information
                  are securely protected.
                </p>

              </div>

            </div>

          </aside>

        </form>

      </section>

    </div>
  );
}

export default Checkout;


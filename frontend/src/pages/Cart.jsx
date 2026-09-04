import React, { useState } from "react";
import { Link } from "react-router";
import {useCart} from "../context/CartContext";


function Cart() {

  const {cartItems,increaseQuantity, decreaseQuantity, removeFromCart, subtotal } = useCart();


  // Free shipping over $100
  const shipping = subtotal >= 100 || subtotal === 0 ? 0 : 10;

  const total = subtotal + shipping;

  return (
    <div className="cart-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <section className="cart-page-header">
        <div className="cart-header-content">

          <p className="section-subtitle">
            YOUR SHOPPING BAG
          </p>

          <h1>Shopping Cart</h1>

          <p>
            Review your items and proceed to checkout.
          </p>

        </div>
      </section>


      {/* =====================================================
          CART CONTENT
      ===================================================== */}

      <section className="cart-section">

        {cartItems.length > 0 ? (

          <div className="cart-layout">

            {/* =================================================
                CART ITEMS
            ================================================= */}

            <div className="cart-items-container">

              <div className="cart-items-header">

                <h2>
                  Your Items
                  <span>
                    ({cartItems.length})
                  </span>
                </h2>

              </div>


              {cartItems.map((item) => (

                <div
                  className="cart-item"
                  key={item._id}
                >

                  {/* Product image */}

                  <div className="cart-item-image">
                    <img
                      src={item.image}
                      alt={item.name}
                    />
                  </div>


                  {/* Product information */}

                  <div className="cart-item-details">

                    <p className="cart-item-category">
                      {item.category ? item.category.name : "Uncategorized"}
                    </p>

                    <h3>{item.name}</h3>

                    <p className="cart-item-price">
                      ${item.price.toFixed(2)}
                    </p>

                  </div>


                  {/* Quantity */}

                  <div className="cart-quantity">

                    <button
                      onClick={() =>
                        decreaseQuantity(item._id)
                      }
                    >
                      −
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={()=>increaseQuantity(item._id)}
                    >
                      +
                    </button>

                  </div>


                  {/* Item subtotal */}

                  <div className="cart-item-subtotal">

                    <strong>
                      $
                      {(item.price * item.quantity).toFixed(
                        2
                      )}
                    </strong>

                  </div>


                  {/* Remove */}

                  <button
                    className="remove-cart-item"
                    onClick={() =>
                     removeFromCart(item._id)
                    }
                    title="Remove item"
                  >
                    ×
                  </button>

                </div>

              ))}


              {/* Continue shopping */}

              <div className="cart-actions">

                <Link
                  to="/products"
                  className="continue-shopping"
                >
                  ← Continue Shopping
                </Link>

              </div>

            </div>


            {/* =================================================
                ORDER SUMMARY
            ================================================= */}

            <aside className="cart-summary">

              <h2>Order Summary</h2>


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


              {subtotal > 0 && subtotal < 100 && (
                <p className="shipping-message">
                  Add $
                  {(100 - subtotal).toFixed(2)} more
                  to get free shipping.
                </p>
              )}


              <div className="summary-divider"></div>


              <div className="summary-total">

                <span>
                  Total
                </span>

                <strong>
                  ${total.toFixed(2)}
                </strong>

              </div>


              <Link
                to="/checkout"
                className="checkout-button"
              >
                Proceed to Checkout
                <span>→</span>
              </Link>


              <div className="secure-checkout">

                <span>🔒</span>

                <p>
                  Secure checkout
                  <br />
                  Your information is protected
                </p>

              </div>

            </aside>

          </div>

        ) : (

          /* =================================================
             EMPTY CART
          ================================================= */

          <div className="empty-cart">

            <div className="empty-cart-icon">
              🛒
            </div>

            <h2>Your Cart is Empty</h2>

            <p>
              Looks like you haven't added anything
              to your cart yet.
            </p>

            <Link
              to="/products"
              className="primary-button"
            >
              Start Shopping →
            </Link>

          </div>

        )}

      </section>

    </div>
  );
}

export default Cart;

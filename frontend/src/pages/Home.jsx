import React from "react";
import { Link } from "react-router";

const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 89.99,
    oldPrice: 119.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    category: "Electronics",
  },
  {
    id: 2,
    name: "Classic White Sneakers",
    price: 59.99,
    oldPrice: 79.99,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    category: "Shoes",
  },
  {
    id: 3,
    name: "Smart Watch Series 5",
    price: 129.99,
    oldPrice: 159.99,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
    category: "Accessories",
  },
  {
    id: 4,
    name: "Leather Backpack",
    price: 74.99,
    oldPrice: 99.99,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
    category: "Bags",
  },
  {
    id: 5,
    name: "Modern Sunglasses",
    price: 39.99,
    oldPrice: 54.99,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600",
    category: "Fashion",
  },
  {
    id: 6,
    name: "Minimalist Backpack",
    price: 64.99,
    oldPrice: 84.99,
    image:
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600",
    category: "Bags",
  },
];

function Home() {
  return (
    <div className="home-page">
     
      {/* ================= HERO SECTION ================= */}
      <section className="hero-section">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <p className="hero-small-text">ShopEase 2026</p>

          <h1>
            Discover Products
            <br />
            You'll Love
          </h1>

          <p className="hero-description">
            Explore our latest collection of premium products at prices
            you'll love.
          </p>

          <Link to="/products" className="primary-button">
            Shop Now
            <span>→</span>
          </Link>
        </div>

        <div className="hero-badge">
          <strong>30%</strong>
          <span>OFF</span>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="features-section">
        <div className="feature-item">
          <div className="feature-icon">🚚</div>

          <div>
            <h3>Free Shipping</h3>
            <p>On orders over $50</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-icon">🔒</div>

          <div>
            <h3>Secure Payment</h3>
            <p>100% secure checkout</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-icon">↩️</div>

          <div>
            <h3>Easy Returns</h3>
            <p>30 day return policy</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-icon">💬</div>

          <div>
            <h3>24/7 Support</h3>
            <p>We're here to help</p>
          </div>
        </div>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <section className="products-section">
        <div className="section-heading">
          <div>
            <p className="section-subtitle">OUR COLLECTION</p>

            <h2>Featured Products</h2>
          </div>

          <Link to="/products" className="view-all-link">
            View All Products →
          </Link>
        </div>

        <div className="home-products-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />

                <span className="sale-badge">SALE</span>
              </div>

              <div className="product-card-content">
                <p className="product-category">{product.category}</p>

                <h3>{product.name}</h3>

                <div className="product-rating">
                  <span>★★★★★</span>
                  <small>(24)</small>
                </div>

                <div className="product-price">
                  <strong>${product.price}</strong>

                  <span>${product.oldPrice}</span>
                </div>

                <button className="add-cart-button">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PROMOTIONAL BANNER ================= */}
      <section className="promo-section">
        <div className="promo-content">
          <p className="promo-small-text">LIMITED TIME OFFER</p>

          <h2>
            Upgrade Your
            <br />
            Everyday Life
          </h2>

          <p>
            Get up to 40% off selected products.
            Don't miss out on these amazing deals.
          </p>

          <Link to="/products" className="secondary-button">
            Explore Deals →
          </Link>
        </div>

        <div className="promo-image">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000"
            alt="Shopping collection"
          />
        </div>
      </section>

      {/* ================= NEWSLETTER ================= */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <p className="section-subtitle">STAY UPDATED</p>

          <h2>Get 10% Off Your First Order</h2>

          <p>
            Subscribe to our newsletter and receive exclusive deals,
            new product updates and special offers.
          </p>

          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email address"
            />

            <button type="submit">
              Subscribe
            </button>
          </form>
        </div>
      </section>

    
    </div>
  );
}

export default Home;
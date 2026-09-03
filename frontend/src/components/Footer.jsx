import React from "react";
import { Link, useNavigate } from "react-router";

function Footer() {

  const navigate = useNavigate();
    
  return (
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-column footer-about">
            <Link to="/" className="footer-logo">
              Shop<span>Ease</span>
            </Link>

            <p>
              Your trusted destination for quality products,
              amazing deals and an exceptional shopping experience.
            </p>

            <div className="social-links">
              <a href="#facebook">f</a>
              <a href="#instagram">◎</a>
              <a href="#twitter">𝕏</a>
              <a href="#youtube">▶</a>
            </div>
          </div>

          <div className="footer-column">
            <h3>Shop</h3>

            <Link to="/products">All Products</Link>
            <Link to="/products">New Arrivals</Link>
            <Link to="/products">Best Sellers</Link>
            <Link to="/products">Special Offers</Link>
          </div>

          <div className="footer-column">
            <h3>Customer Service</h3>

            <Link to="/contact">Contact Us</Link>
            <a href="#shipping">Shipping Information</a>
            <a href="#returns">Returns & Refunds</a>
            <a href="#faq">FAQs</a>
          </div>

          <div className="footer-column">
            <h3>Contact</h3>

            <p>📍 123 Main Street, City</p>
            <p>📞 +1 234 567 890</p>
            <p>✉️ support@shopease.com</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 ShopEase. All rights reserved.</p>

          <div>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms & Conditions</a>
          </div>
        </div>
      </footer>
  );
}

export default Footer;

     
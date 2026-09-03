import React from "react";
import { NavLink, useNavigate } from "react-router";
import { useCart } from "../context/CartContext.jsx";

function Navbar() {

  const navigate = useNavigate();
  const {cartItems} = useCart();

  let navlink = <NavLink to="/login">
              Login
            </NavLink>;
  
  const token = localStorage.getItem("token");

  if(token)
  {
    navlink = <NavLink to="/dashboard">
              Dashboard
            </NavLink>;
  }

    
  return (
  <nav className="navbar">
        <div className="navbar-container">
          <NavLink to="/" className="navbar-logo">
            Shop<span>Ease</span>
          </NavLink>

          <div className="navbar-links">
            <NavLink to="/">
              Home
            </NavLink>

            <NavLink to="/products">
              Products
            </NavLink>


            {navlink}
            
          </div>

          <NavLink to="/cart" className="cart-button">
            <span className="cart-icon">🛒</span>
            <span className="cart-count">{cartItems.length}</span>
          </NavLink>
        </div>
     </nav>
  );
}

export default Navbar;

     
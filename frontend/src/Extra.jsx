
import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import Dashboard2 from "./pages/Profile";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import PublicLayout from "./layouts/PublicLayout";
import PrivateLayout from "./layouts/PrivateLayout";
import AuthLayout from "./layouts/AuthLayout";
import Profile from "./pages/Profile";
import Tasks from "./pages/Tasks";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

// import {
//   createBrowserRouter,
//   Navigate,
//   RouterProvider,
// } from "react-router";


import "./App.css";

function App() {

  
  return (
   
      <Routes>  
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
      </Routes>
  );
}

export default App;
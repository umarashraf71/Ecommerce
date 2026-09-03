import React from "react";
import { Outlet, Navigate } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function PublicLayout() {

    //  const token = localStorage.getItem("token");

    // If token does not exist,
    // redirect user to login page
    // if (token) {
    //     return <Navigate to="/dashboard" replace />;
    // }

  return (
    <div className="public-layout">
      <Navbar />
        <Outlet />
      <Footer />
    </div>
  );
}

export default PublicLayout;
import React from "react";
import { Outlet, Navigate } from "react-router";
import Sidebar from "../components/admin/Sidebar";
import Navbar from "../components/admin/Navbar";

function PrivateLayout() {

    const token = localStorage.getItem("token");

    // If token does not exist,
    // redirect user to login page
    if (!token) {
        return <Navigate to="/login" replace />;
    }

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="main-section">
        <Navbar />

        <main className="main-content">
          <Outlet />
        </main>
      </div>

    </div>
  );
}

export default PrivateLayout;
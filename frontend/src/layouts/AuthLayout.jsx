import React from "react";
import { Outlet } from "react-router";


function AuthLayout() {

    //  const token = localStorage.getItem("token");

    // // If token does not exist,
    // // redirect user to login page
    // if (token) {
    //     return <Navigate to="/dashboard" replace />;
    // }

  return (
    <div className="public-layout">
        <Outlet />
    </div>
  );
}

export default AuthLayout;
import React from "react";
import api from "../../utils/api.js";
import { useAuth } from "../../context/AuthContext.jsx";

function Dashboard() {

  const { user } = useAuth();

  return (
    <div className="dashboard-content">
      <h1>Dashboard</h1>

      <div className="dashboard-card">
        <h3>Welcome to {user?.name}</h3>
        <p>
          This is your main dashboard area. You can replace this
          content with your actual dashboard.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
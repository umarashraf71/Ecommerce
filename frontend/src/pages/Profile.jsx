import React from "react";

function Profile() {
  return (
    <div className="profile-page">

      <h1>Profile</h1>

      <p className="profile-subtitle">
        View your account information.
      </p>

      <div className="profile-card">

        <div className="profile-header">
          <div className="profile-avatar">
            U
          </div>

          <div>
            <h2>User Name</h2>
            <p>user@example.com</p>
          </div>
        </div>

        <div className="profile-info">

          <div className="profile-info-item">
            <span>Name</span>
            <strong>User Name</strong>
          </div>

          <div className="profile-info-item">
            <span>Email</span>
            <strong>user@example.com</strong>
          </div>

        </div>

        <button className="primary-button">
          Edit Profile
        </button>

      </div>

    </div>
  );
}

export default Profile;
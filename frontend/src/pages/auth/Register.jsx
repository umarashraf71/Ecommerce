import React, { useState } from "react";
import { Link } from "react-router";
import axios from "axios";

function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      console.log("Register Response:", response.data);

      alert("Registration successful!");

    } catch (error) {
      console.log("Register Error:", error);

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">

        {/* LEFT SIDE */}
        <div className="register-brand">
          <div className="register-brand-content">

            <Link to="/" className="register-logo">
              Shop<span>Ease</span>
            </Link>

            <p className="register-brand-label">
              JOIN SHOPEASE
            </p>

            <h1>
              Shopping made
              <br />
              simple,
              <br />
              just for you.
            </h1>

            <p className="register-brand-description">
              Create your account and enjoy a faster,
              easier and more personalized shopping
              experience.
            </p>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="register-form-container">
          <div className="register-form-wrapper">

            {/* Mobile Logo */}
            <div className="register-mobile-logo">
              <Link to="/" className="register-logo">
                Shop<span>Ease</span>
              </Link>
            </div>

            {/* Heading */}
            <div className="register-heading">
              <h2>Create Account</h2>

              <p>
                Fill in your details to create your account.
              </p>
            </div>

            {/* FORM */}
            <form
              className="register-form"
              onSubmit={handleSubmit}
            >

              {/* NAME */}
              <div className="register-form-group">
                <label htmlFor="name">
                  Name
                  <span>*</span>
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>

              {/* EMAIL */}
              <div className="register-form-group">
                <label htmlFor="registerEmail">
                  Email Address
                  <span>*</span>
                </label>

                <input
                  id="registerEmail"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>

              {/* PASSWORD */}
              <div className="register-form-group">
                <label htmlFor="registerPassword">
                  Password
                  <span>*</span>
                </label>

                <div className="register-password-wrapper">

                  <input
                    id="registerPassword"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    minLength="6"
                    required
                  />

                  <button
                    type="button"
                    className="register-password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>

                </div>
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                className="register-submit-button"
              >
                Create Account
                <span>→</span>
              </button>

              {/* LOGIN */}
              <div className="register-login">
                <p>
                  Already have an account?
                </p>

                <Link to="/login">
                  Sign In
                </Link>
              </div>

            </form>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;


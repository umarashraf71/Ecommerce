import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import publicApi from "../../utils/publicApi.js";
import {useAuth} from "../../context/AuthContext.jsx";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setAuthData } = useAuth();


  const [formData, setFormData] = useState({
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
      const response = await publicApi.post(
        "/auth/login",
        formData
      );

      console.log("Login Response:", response.data);

      setAuthData(response.data.user, response.data.token, response.data.userRole);

      navigate("/dashboard");

    } catch (error) {
      console.log("Login Error:", error);

      alert(
        error.response?.data?.message ||
        "Login failed"
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
              <h2>Login</h2>

              <p>
                Enter your details to login.
              </p>
            </div>

            {/* FORM */}
            <form
              className="register-form"
              onSubmit={handleSubmit}
            >

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
                Login
                <span>→</span>
              </button>

              {/* LOGIN */}
              <div className="register-login">
                <p>
                  Dont have an account?
                </p>

                <Link to="/register">
                  Sign Up
                </Link>
              </div>

            </form>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;


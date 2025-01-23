// This page is largely taken from a previous project I did, there are some minor differences

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:82/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) { // Successfully logged in
        if (result.token) {
          localStorage.setItem("username", formData.username); // Store username
          localStorage.setItem("token", result.token); // Store JWT token
          navigate("/"); // Navigate to ShopList page
        } else {
          setError("Login failed, no token received.");
        }
      } else {
        setError(result.message || "Login failed, please check your details.");
      }
    } catch (err) {
      setError("An error occurred while logging in.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        <p>
          Don't have an account?{" "}
          <button onClick={() => navigate("/register")} className="link">
            Register
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;

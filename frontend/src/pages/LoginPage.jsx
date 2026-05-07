import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../api/axios";

import Navbar from "../components/Navbar";

import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post(
        "/auth/login",
        formData
      );

      login(
        response.data.user,
        response.data.token
      );

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div className="app-shell">
      <Navbar />

      <main className="main-content">
        <div className="container">
          <section className="auth-card">
            <div className="auth-header">
              <span className="eyebrow">Welcome back</span>
              <h1 className="page-title">Sign in to your account</h1>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <label className="form-group">
                <span className="form-label">Email</span>
                <input
                  className="form-input"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="form-group">
                <span className="form-label">Password</span>
                <input
                  className="form-input"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  onChange={handleChange}
                  required
                />
              </label>

              <div className="form-actions">
                <button className="btn btn-primary" type="submit">
                  Login
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
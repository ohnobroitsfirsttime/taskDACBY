import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../api/axios";

import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
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
        "/auth/register",
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
          "Registration failed"
      );
    }
  };

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/Login.css";
import { useSnackbar } from "notistack";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = loginInfo;
    if (!email || !password) {
      return enqueueSnackbar("Please input all fields", { variant: "warning" });
    }
    setLoading(true);
    try {
      //   const local_url = "http://localhost:8080/auth/login";
      const live_url = "https://mern-todoapp-backend-pi.vercel.app/auth/login";
      const result = await axios.post(live_url, loginInfo);
      console.log(result);
      const { success, message, jwtToken, name } = result.data;
      console.log(
        result.data.success,
        result.data.message,
        result.data.jwtToken,
        result.data.name
      );

      if (success) {
        setLoading(false);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setIsAuthenticated(true);
        enqueueSnackbar(`${message}`, { variant: "success" });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else if (!success) {
        setLoading(false);
        enqueueSnackbar(`${message}`, { variant: "error" });
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      const errorDetails =
        error.response.data.error?.details[0].message ||
        error.response.data.message;

      enqueueSnackbar(`${errorDetails}`, { variant: "error" });
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h1 className="login-title">Login</h1>
        <div className="login-input-group">
          <label htmlFor="email" className="login-input-label">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            className="login-input-field"
            onChange={handleInputChange}
            value={loginInfo.email}
          />
        </div>
        <div className="login-input-group">
          <label htmlFor="password" className="login-input-label">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            className="login-input-field"
            onChange={handleInputChange}
            value={loginInfo.password}
          />
        </div>
        <button className="login-button flex justify-center items-center">
          {loading ? "Logging In ..." : "Login"}
        </button>
        <span className="login-link-text">Don't have an account?</span>
        <Link to="/signup" className="login-link">
          Signup
        </Link>
      </form>
    </div>
  );
};

export default Login;

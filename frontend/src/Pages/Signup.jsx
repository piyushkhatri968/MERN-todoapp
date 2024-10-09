import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/Signup.css";
import { useSnackbar } from "notistack";

const Signup = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo({ ...signupInfo, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return enqueueSnackbar("Please input all fields", { variant: "warning" });
    }
    setLoading(true);
    try {
      //   const local_url = "http://localhost:8080/auth/signup";
      const live_url = "https://mern-todoapp-backend-pi.vercel.app/auth/signup";
      const result = await axios.post(live_url, signupInfo);
      console.log(result);
      const { success, message } = result.data;

      if (success) {
        setLoading(false);
        enqueueSnackbar(`${message}`, { variant: "success" });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else if (!success) {
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
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Signup</h2>
        <form className="signup-form" onSubmit={handleSignup}>
          <div className="signup-input-group">
            <label htmlFor="name" className="signup-input-label">
              Name:
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              value={signupInfo.name}
              onChange={handleInputChange}
              className="signup-input-field"
            />
          </div>
          <div className="signup-input-group">
            <label htmlFor="email" className="signup-input-label">
              Email:
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={signupInfo.email}
              onChange={handleInputChange}
              className="signup-input-field"
            />
          </div>
          <div className="signup-input-group">
            <label htmlFor="password" className="signup-input-label">
              Password:
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={signupInfo.password}
              onChange={handleInputChange}
              className="signup-input-field"
            />
          </div>
          <button className="signup-button" type="submit">
            {loading ? "Signing In ..." : "Signup"}
          </button>
        </form>
        <span className="signup-footer">
          Already have an account?{" "}
          <Link to="/login" className="signup-link">
            Login
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Signup;

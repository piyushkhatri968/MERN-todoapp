import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RefreshHandler = ({ setIsAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      // Navigate away from login/signup if authenticated
      if (location.pathname === "/login" || location.pathname === "/signup") {
        navigate("/", { replace: true });
      }
    }
  }, [location, navigate, setIsAuthenticated]); // Removed isAlreadyAuthenticated

  return null;
};

export default RefreshHandler;

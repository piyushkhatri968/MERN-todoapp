import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
const Logout = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

  const handleLogout = () => {
    setloading(true);
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
    enqueueSnackbar("User log out successfully", { variant: "success" });
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  return (
    <button
      className="bg-red-600 text-white font-semibold py-2 px-4 rounded shadow hover:bg-red-700 transition duration-300"
      onClick={handleLogout}
    >
      {loading ? "Logging Out ..." : "Logout"}
    </button>
  );
};

export default Logout;

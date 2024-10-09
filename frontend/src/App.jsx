import React, { useState } from "react";
import TodoForm from "./Pages/TodoForm";
import TodoList from "./Pages/TodoList";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import DeleteForm from "./Pages/DeleteForm";
import UpdateForm from "./Pages/UpdateForm";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import RefreshHandler from "../RefreshHandler";
import Logout from "./components/Logout";

const App = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const isAuthRoute =
    location.pathname === "/login" || location.pathname === "/signup";

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <div>
      <div className="flex justify-between items-center px-8 mt-6">
        <div className="text-center text-3xl font-bold mt-4">Todo App</div>
        {!isAuthRoute && (
          <div className="flex gap-8 justify-center items-center">
            <Logout />
            <Link to={"/create"}>
              <IoMdAddCircleOutline className="text-4xl text-green-600" />
            </Link>
          </div>
        )}
      </div>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<PrivateRoute element={<TodoList />} />} />
        <Route
          path="/create"
          element={<PrivateRoute element={<TodoForm />} />}
        />
        <Route
          path="/delete/:id"
          element={<PrivateRoute element={<DeleteForm />} />}
        />
        <Route
          path="/update/:id"
          element={<PrivateRoute element={<UpdateForm />} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
      </Routes>
    </div>
  );
};

export default App;

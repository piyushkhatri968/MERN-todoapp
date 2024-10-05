import React from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { IoMdAddCircleOutline } from "react-icons/io";

import { Routes, Route, Link } from "react-router-dom";
import DeleteForm from "./components/DeleteForm";
import UpdateForm from "./components/UpdateForm";

const App = () => {
  return (
    <div>
      <div className="flex  justify-between items-center px-8 mt-6">
        <div className="text-center text-3xl font-bold mt-4">Todo App</div>
        <Link to={"/create"}>
          <IoMdAddCircleOutline className="text-3xl text-green-600" />
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/create" element={<TodoForm />} />
        <Route path="/delete/:id" element={<DeleteForm />} />
        <Route path="/update/:id" element={<UpdateForm />} />
      </Routes>
    </div>
  );
};

export default App;

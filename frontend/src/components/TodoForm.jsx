import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import BackButton from "./BackButton";

const TodoForm = () => {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!task || !description) {
      enqueueSnackbar("Please fill both fields", { variant: "warning" });
      return;
    }
    const data = { task, description };

    try {
      const response = await axios.post(
        "https://mern-todoapp-backend-pi.vercel.app/todo",
        data
      );
      console.log(response);
      enqueueSnackbar("Task Added successfully", {
        variant: "success",
      });

      Navigate("/");
    } catch (error) {
      enqueueSnackbar("Some Error Accured", { variant: "error" });
    }
  };

  return (
    <div className="flex  justify-center items-center mt-8">
      <div className="w-[60vw] bg-[#1e1e1e] text-white p-8 rounded-lg shadow-lg">
        <BackButton />
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Add a New Task
        </h2>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-lg font-medium">
              Title:
            </label>
            <input
              type="text"
              value={task}
              placeholder="What's the task of your To Do?"
              className="p-3 rounded-md w-full text-black focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-lg font-medium">
              Description:
            </label>
            <textarea
              value={description}
              placeholder="What's the description of your To Do?"
              className="p-3 rounded-md w-full text-black focus:outline-none focus:ring-2 focus:ring-green-500 resize-none h-24"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            className="bg-green-600 hover:bg-green-700 transition-colors px-8 py-3 rounded-md font-semibold text-lg mt-4"
            type="submit"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;

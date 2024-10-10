import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import BackButton from "../components/BackButton";
import "../Styles/TodoForm.css";

const TodoForm = () => {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task || !description) {
      enqueueSnackbar("Please fill both fields", { variant: "warning" });
      return;
    }

    setLoading(true);

    const data = { task, description };

    // const local_url = "http://localhost:8080/todo";
    const live_url = "https://mern-todoapp-backend-pi.vercel.app/todo";
    const headers = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };

    try {
      const response = await axios.post(live_url, data, headers);
      console.log(response);
      enqueueSnackbar("Task Added successfully", {
        variant: "success",
      });

      Navigate("/");
    } catch (error) {
      setLoading(false);
      enqueueSnackbar("Some Error Accured", { variant: "error" });
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <BackButton />
        <h2 className="form-title">Add a New Task</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="title" className="input-label">
              Title:
            </label>
            <input
              type="text"
              value={task}
              placeholder="What's the task of your To Do?"
              className="input-field"
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="description" className="input-label">
              Description:
            </label>
            <textarea
              value={description}
              placeholder="What's the description of your To Do?"
              className="textarea-field"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button className="submit-button" type="submit">
            {loading ? "Adding task ..." : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;

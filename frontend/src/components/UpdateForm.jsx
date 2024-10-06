import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import BackButton from "./BackButton";
import Spinner from "../components/Spinner";
import "../Styles/UpdateForm.css";

const UpdateForm = () => {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const Navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [updateloading, SetUpdateloading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://mern-todoapp-backend-pi.vercel.app/todo/${id}`)
      .then((response) => {
        setTask(response.data.task);
        setDescription(response.data.description);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!task || !description) {
      enqueueSnackbar("Please fill both fields", { variant: "warning" });
      return;
    }
    SetUpdateloading(true);
    const data = { task, description };

    try {
      const response = await axios.put(
        `https://mern-todoapp-backend-pi.vercel.app/todo/${id}`,
        data
      );
      console.log(response);
      enqueueSnackbar("Task Updated successfully", {
        variant: "success",
      });

      Navigate("/");
    } catch (error) {
      enqueueSnackbar("Some Error Accured", { variant: "error" });
    }
  };

  return (
    <div className="container">
      {loading ? (
        <Spinner />
      ) : (
        <div className="edit-task-container">
          <div className="edit-task-card">
            <BackButton />
            <h2 className="edit-task-title">Edit the Task</h2>
            <form className="edit-task-form" onSubmit={handleUpdate}>
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
              <button className="update-button" type="submit">
                {updateloading ? "Updating ..." : "Update Task"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateForm;

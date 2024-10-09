import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import BackButton from "../components/BackButton";
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
    // const local_url = "http://localhost:8080/todo";
    const live_url = "https://mern-todoapp-backend-pi.vercel.app/todo";
    const headers = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };

    setLoading(true);
    try {
      axios
        .get(`${live_url}/${id}`, headers)
        .then((response) => {
          setTask(response.data.task);
          setDescription(response.data.description);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!task || !description) {
      enqueueSnackbar("Please fill both fields", { variant: "warning" });
      return;
    }
    SetUpdateloading(true);
    const data = { task, description };
    // const local_url = "http://localhost:8080/todo";
    const live_url = "https://mern-todoapp-backend-pi.vercel.app/todo";
    const headers = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    try {
      const response = await axios.put(`${live_url}/${id}`, data, headers);
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

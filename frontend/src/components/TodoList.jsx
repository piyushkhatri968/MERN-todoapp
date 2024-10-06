import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";
import axios from "axios";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
import { FaRegSadCry } from "react-icons/fa";
import "../Styles/TodoList.css";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    axios
      .get("https://mern-todoapp-backend-pi.vercel.app/todo")
      .then((response) => {
        setTasks(response.data.data);
        console.log(response.data.data);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
        setloading(false);
      });
  }, []);

  return (
    <div className="container">
      {loading ? (
        <Spinner />
      ) : (
        <div className="task-list-container">
          {tasks.length === 0 ? (
            <div className="no-task-message">
              <h1 className="no-task-title">No Any Task</h1>
              <FaRegSadCry className="no-task-icon" />
            </div>
          ) : (
            <div className="tasks-wrapper">
              {tasks.map((task, index) => (
                <div key={task._id} className="task-card">
                  <div>
                    <div className="task-title">{task.task}</div>
                    <div className="task-description">{task.description}</div>
                  </div>
                  <div className="task-actions">
                    <Link to={`/update/${task._id}`} className="edit-link">
                      <CiEdit className="edit-icon" />
                    </Link>
                    <Link to={`/delete/${task._id}`} className="delete-link">
                      <CiTrash className="delete-icon" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TodoList;

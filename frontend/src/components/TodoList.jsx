import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";
import axios from "axios";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
import { FaRegSadCry } from "react-icons/fa";

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
    <div className="flex justify-center items-center mt-8">
      {loading ? (
        <Spinner />
      ) : (
        <div className="space-y-6 w-full max-w-[60vw]">
          {tasks.length === 0 ? (
            <div className="flex justify-center items-center gap-2">
              <h1 className="text-3xl font-bold">No Any Task</h1>
              <FaRegSadCry className=" text-3xl text-yellow-600" />
            </div>
          ) : (
            <div>
              {tasks.map((task, index) => (
                <div
                  key={task._id}
                  className="bg-[#2b2d42] text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex justify-between items-center"
                >
                  <div>
                    <div className="text-[#8ecae6] text-2xl font-semibold mb-2">
                      {task.task}
                    </div>
                    <div className="text-[#edf2f4]">{task.description}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Link
                      to={`/update/${task._id}`}
                      className="hover:text-[#8ecae6] transition-colors"
                    >
                      <CiEdit className="text-3xl text-[#adb5bd] hover:text-[#8ecae6] transition-colors" />
                    </Link>
                    <Link
                      to={`/delete/${task._id}`}
                      className="text-[#ef233c] hover:text-[#d90429] transition-colors"
                    >
                      <CiTrash className="text-3xl" />
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

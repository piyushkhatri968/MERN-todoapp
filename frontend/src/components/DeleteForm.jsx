import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteForm = () => {
  const Navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleCancel = () => {
    Navigate("/");
  };
  const { id } = useParams();
  const handleDelete = async () => {
    try {
      const deleteTask = await axios.delete(`http://localhost:8080/todo/${id}`);
      enqueueSnackbar("Task Deleted Successfully", { variant: "success" });
      Navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[90vw] max-w-md p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Are you sure you want to delete this task?
        </h3>
        <p className="text-gray-600 mb-6">
          This action cannot be undone. Once deleted, the task will be
          permanently removed.
        </p>
        <div className="flex justify-end gap-4">
          <button
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
            onClick={handleDelete}
          >
            Yes, Delete it
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteForm;

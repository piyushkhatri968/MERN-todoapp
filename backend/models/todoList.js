const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

const Todo = new mongoose.model("Todo", todoSchema);

module.exports = Todo;

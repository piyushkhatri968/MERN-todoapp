const Todo = require("../models/todoList");

// Route for Get All Books from database
const getTodoRoute = async (req, res) => {
  try {
    const tasks = await Todo.find({ user: req.user._id }).sort({
      updatedAt: -1,
    });
    return res.status(201).send({ count: tasks.length, data: tasks });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ message: error.message });
  }
};

// Route for Save a new Book
const postTodoRoute = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(403).send({ message: "Unauthorized access" });
    }
    if (!req.body.task || !req.body.description) {
      return res.status(204).send({ message: "Send all required fields" });
    }
    const data = {
      task: req.body.task,
      description: req.body.description,
      user: req.user._id, // Associate the todo with the logged-in user
    };
    const insertData = await Todo.create(data);
    console.log(req);

    return res.status(201).send(insertData);
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ message: error.message });
  }
};

// Route for Get One Book from database by id
const getSingleTodoRoute = async (req, res) => {
  try {
    const { id } = req.params;
    const getSingleTask = await Todo.findOne({ _id: id, user: req.user._id });
    if (!getSingleTask) {
      return res.status(404).send({ message: "Task not found" });
    }
    return res.status(200).json(getSingleTask);
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ message: error.message });
  }
};

// Route for Delete a book
const deleteTodoRoute = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTask = await Todo.findOneAndDelete({
      id: _id,
      user: req.user._id,
    });
    if (!deleteTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).send({ message: "Todo deleted Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ message: error.message });
  }
};

// Route for Update a Book
const updateTodoRoute = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.body.task || !req.body.description) {
      return res.status(204).send({ message: "Send all required fields" });
    }
    const updateTask = await Todo.findOneAndUpdate(
      { _id: id, user: req.user._id },
      req.body,
      { new: true } // Return the updated document
    );

    if (!updateTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json(updateTask);
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ message: error.message });
  }
};

module.exports = {
  getTodoRoute,
  postTodoRoute,
  getSingleTodoRoute,
  deleteTodoRoute,
  updateTodoRoute,
};

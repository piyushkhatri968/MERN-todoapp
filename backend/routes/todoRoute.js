const express = require("express");
const router = express.Router();
const Todo = require("../models/todoList");

// Route for Get All Books from database
router.get("/", async (req, res) => {
  try {
    const tasks = await Todo.find();
    return res.status(201).send({ count: tasks.length, data: tasks });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ message: error.message });
  }
});

// Route for Save a new Book
router.post("/", async (req, res) => {
  try {
    if (!req.body.task || !req.body.description) {
      return res.status(204).send({ message: "Send all required fields" });
    }
    const data = {
      task: req.body.task,
      description: req.body.description,
    };
    const insertData = await Todo.create(data);
    return res.status(201).send(insertData);
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ message: error.message });
  }
});

// Route for Get One Book from database by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getSingleTask = await Todo.findById(id);
    if (!getSingleTask) {
      return res.status(404).send({ message: "Task not found" });
    }
    return res.status(200).json(getSingleTask);
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ message: error.message });
  }
});

// Route for Delete a book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTask = await Todo.findByIdAndDelete(id);
    if (!deleteTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).send({ message: "Todo deleted Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ message: error.message });
  }
});

// Route for Update a Book
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.body.task || !req.body.description) {
      return res.status(204).send({ message: "Send all required fields" });
    }
    const updateTask = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updateTask) {
      return res.status(404), express.json({ message: "Task not found" });
    }
    return res.status(200).json(updateTask);
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;

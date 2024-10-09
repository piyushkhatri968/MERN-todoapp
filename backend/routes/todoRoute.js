const express = require("express");
const router = express.Router();
const isAuthenticated = require("../MiddleWares/IsAuthenticated");
const {
  getTodoRoute,
  postTodoRoute,
  getSingleTodoRoute,
  deleteTodoRoute,
  updateTodoRoute,
} = require("../Controllers/TodoController");

// Route for Get All Books from database
router.get("/", isAuthenticated, getTodoRoute);

// Route for Save a new Book
router.post("/", isAuthenticated, postTodoRoute);-

// Route for Get One Book from database by id
router.get("/:id", isAuthenticated, getSingleTodoRoute);

// Route for Delete a book
router.delete("/:id", isAuthenticated, deleteTodoRoute);

// Route for Update a Book
router.put("/:id", isAuthenticated, updateTodoRoute);

module.exports = router;

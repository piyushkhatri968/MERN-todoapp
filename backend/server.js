require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const todoRoute = require("./routes/todoRoute");
const AuthRoute = require("./routes/AuthRoute");

app.use(express.json());
app.use(cors());

const mongoURL = process.env.MONGO_ATLAS_URL;
// const mongoURL = "mongodb://127.0.0.1:27017/todoweb";
// const port = process.env.PORT;

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("App connected to database");
    // app.listen(port, () => {
    //   console.log("App is listening on PORT", port);
    // });
    //! use this when you are making changes locally
  })
  .catch((error) => {
    console.log(error.message);
  });

app.get("/", (req, res) => {
  res.send("App is Running");
});

app.use("/todo", todoRoute);

app.use("/auth", AuthRoute);

module.exports = app; // Export the app instead of using app.listen()

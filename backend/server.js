require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const todoRoute = require("./routes/todoRoute");

app.use(express.json());
app.use(cors());

const mongoURL = process.env.MONGO_ATLAS_URL;
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

module.exports = app; // Export the app instead of using app.listen()

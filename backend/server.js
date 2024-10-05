require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const todoRoute = require("./routes/todoRoute");
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;
const mongoURL = process.env.MONGO_ATLAS_URL;

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}!`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

app.use("/todo", todoRoute);

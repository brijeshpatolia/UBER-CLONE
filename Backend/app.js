const dotenv = require("dotenv");

dotenv.config();

const cors = require("cors");

const express = require("express");

const app = express();
const connectToDatabase = require("./db/db");
const userRoutes = require("./routes/user.routes");


connectToDatabase();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use(express.json());

app.use("/users", userRoutes);

module.exports = app;

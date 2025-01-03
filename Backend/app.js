const dotenv = require("dotenv");

dotenv.config();

const cors = require("cors");

const express = require("express");

const app = express();

const cookieParser = require("cookie-parser");
const connectToDatabase = require("./db/db");
const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");

connectToDatabase();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use(express.json());

app.use("/users", userRoutes);
app.use("/captains", captainRoutes);
module.exports = app;

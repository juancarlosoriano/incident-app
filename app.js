const createError = require("http-errors");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const usersRouter = require("./routes/users");
const ticketsRouter = require("./routes/tickets");

// Database setup
let DB = require("./db");

/* point mongoose to the DB URI */
mongoose.connect(DB.URI);

let mongoDB = mongoose.connection;
mongoDB.on("error", console.error.bind(console, "Connection Error:"));
mongoDB.once("open", () => {
  console.log("Connected to MongoDB...");
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up routes
app.use("/users", usersRouter);
app.use("/tickets", ticketsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", {title: "Error"});
});

module.exports = app;

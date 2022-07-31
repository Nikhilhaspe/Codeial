const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/codeial_development");
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error Connecting to DB"));

db.once("open", () => {
  console.log("Connected to :: MongoDB");
});

module.exports = db;

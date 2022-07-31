const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const express = require("express");
const app = express();
const PORT = 8000;

// Set Express Layouts
app.use(expressLayouts);
// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// Static Files

// For Routing (Find by deault index.js)
app.use("/", require("./routes"));

app.listen(PORT, (err) => {
  if (err) console.log("Error In Server Startup :: ", err);
  console.log("Server Running :: ", PORT);
});

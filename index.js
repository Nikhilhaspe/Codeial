const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const express = require("express");
const app = express();
const db = require("./config/mongoose");
const cookieParser = require("cookie-parser");
const PORT = 8000;

app.use(express.urlencoded());

// Cookie Parser
app.use(cookieParser());

// Set Styles To Main Layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
// Static Files
app.use(express.static(path.join(__dirname, "assets")));
// Set Express Layouts
app.use(expressLayouts);
// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// For Routing (Find by deault index.js)
app.use("/", require("./routes"));

app.listen(PORT, (err) => {
  if (err) console.log("Error In Server Startup :: ", err);
  console.log("Server Running :: ", PORT);
});

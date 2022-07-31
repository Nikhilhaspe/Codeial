const express = require("express");
const app = express();
const PORT = 8000;

// For Routing (Find by deault index.js)
app.use("/", require("./routes"));

app.listen(PORT, (err) => {
  if (err) console.log("Error In Server Startup :: ", err);
  console.log("Server Running :: ", PORT);
});

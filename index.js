const path = require("path");
const sassMiddleware = require("node-sass-middleware");
const expressLayouts = require("express-ejs-layouts");
const express = require("express");
const app = express();
const db = require("./config/mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
// For session storage
const MongoStore = require("connect-mongo");
const PORT = 8000;

// SCSS File Compilation
app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);

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

// express session
app.use(
  session({
    name: "codeial",
    secret: "haspeNikhil",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost/codeial_development",
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Setting User For used By locals
app.use(passport.setAuthenticatedUser);

// For Routing (Find by deault index.js)
app.use("/", require("./routes"));

app.listen(PORT, (err) => {
  if (err) console.log("Error In Server Startup :: ", err);
  console.log("Server Running :: ", PORT);
});

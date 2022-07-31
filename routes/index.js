const express = require("express");
const router = express.Router();

// Controllers
const homeController = require("../controllers/home_controller");

router.get("/", homeController.home);

// Use routers from another file
router.use("/users", require("./users"));

module.exports = router;

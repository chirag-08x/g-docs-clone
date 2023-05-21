const express = require("express");
const router = express.Router();
const { addNewUser } = require("../controllers/userController");

router.route("/").post(addNewUser);

module.exports = router;

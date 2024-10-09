const express = require("express");
const { signupRoute, loginRoute } = require("../Controllers/UserController");
const {
  signupValidation,
  loginValidation,
} = require("../MiddleWares/AuthValidation");
const router = express.Router();

router.post("/signup", signupValidation, signupRoute);
router.post("/login", loginValidation, loginRoute);

module.exports = router;

require("../server");
const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/UsersController");

// middelwear-----
const {
  passwordsMatch,
  doesUserExist,
  isNewUser,
  validateBody,
  auth,
} = require("../middleware/usersMiddleware");
const { userSchema } = require("../src/models/user");

router.post(
  "/signup",
  isNewUser,
  passwordsMatch,
  // hashPwd,
  UsersController.signup
);

router.post("/login", doesUserExist, UsersController.login);
router.get("/loggedout", auth, UsersController.logOut);
router.get("/", UsersController.getAllUsers);
router.get("/:userId/full", UsersController.getUserById);

module.exports = router;

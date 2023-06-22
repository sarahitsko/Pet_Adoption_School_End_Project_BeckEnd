require("../server");
const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/UsersController");

// middelwear-----
const {
  doesUserExists,
  passwordsMatch,
  hashPassword,
  hashedPassword,
  userExists,
  auth,
} = require("../middleware/usersMiddleware");

router.post(
  "/signup",
  doesUserExists,
  passwordsMatch,
  hashPassword,
  UsersController.signUp
);
router.post("/login", userExists, hashedPassword, UsersController.login);
router.get("/loggedout", auth, UsersController.logOut);
router.get("/", UsersController.getAllUsers);
router.get("/:userId/full", UsersController.getUserById);

module.exports = router;

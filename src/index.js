const express = require("express");
require("./db/mongoose");
require("../server");
const User = require("./models/user");
const UsersController = require("../controllers/UsersController");
const router = express.Router();

const app = express();

app.use(express.json());

// router.post("/signup", (req, res) => {
//   const user = new User(req.body);

//   user
//     .save()
//     .then(() => {
//       res.send(user);
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     });
// });

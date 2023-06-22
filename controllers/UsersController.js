require("../src/db/mongoose");
const {
  User,
  readAllUsersModel,
  getUserByIdModel,
  userSchema,
} = require("../src/models/user");
const { savePet } = require("./PetsController");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(404).send("email and password are required");
    return;
  }
  User.findOne({ email }, (err, user) => {
    if (err) {
      res.status(400).send(err.message);
      return;
    }
    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    bcrypt.compare(password, user.password, async (err, isMatch) => {
      if (err) {
        res.status(400).send(err.message);
        return;
      }
      if (isMatch) {
        const token = jwt.sign({ id: user._id }, SECRET_KEY);
        res.cookie("token", token, {
          maxAge: 90000000,
          httpOnly: true,
        });
        res.send({ token, name: user.name, id: user._id });
      } else {
        res.status(400).send("Wrong Password");
      }
    });
  });
};

const signUp = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).send(newUser);
  } catch (err) {
    console.log(err);
    if (err.name === "ValidationError") {
      res.status(400).send(err.message);
    } else if (err.code === 11000) {
      res.status(409).send("User with that email already exists");
    } else {
      res.status(500).send(err.message);
    }
  }
};

const logOut = (req, res) => {
  try {
    res.clearCookie("token", {
      path: "/loggedout",
      maxAge: 0,
    });
    console.log(new Date());
    res.sendStatus(200);
    console.log("Cookie cleared");
  } catch (err) {
    console.log("Error:", err.message);
    res.status(500).json({ error: "An error occurred" });
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await readAllUsersModel(next);
    res.send(allUsers);
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};
const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await getUserByIdModel(userId);
    res.send(user);
  } catch (err) {
    err.statusCode = 500;
  }
  next(err);
};

// const addPetToUser = async (req, res, next) => {
//   try {
//     const userId = req.params.userId;
//     const petId = req.params.petId;
//     const updatedUser = await addPetToUserModel(userId, petId);
//     if (updatedUser) {
//       res.send(updatedUser);
//       console.log(updatedUser);
//     } else {
//       res.status(404).send("User not found");
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Failed to add pet to user");
//     next(err);
//   }
// };

module.exports = {
  signUp,
  login,
  logOut,
  getAllUsers,
  getUserById,

  savePet,
};

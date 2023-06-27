require("../src/db/mongoose");
const {
  getUserByEmailModel,
  readAllUsersModel,
  getUserByIdModel,
  userSchema,
  addUser,
} = require("../src/models/user");
const { User } = require("../src/models/user");
const { savePet } = require("./PetsController");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name: name,
      email: email,
      password: hashedPassword,
    };

    const userId = await addUser(newUser);
    res.send({ userId: userId, ok: true });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("req.body.password:", req.body.password);
  try {
    const user = await getUserByEmailModel(email);
    if (!user) {
      res.status(400).send("User with this email does not exist");
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Input Password:", password);
    console.log("Hashed Password:", user.password);
    console.log("Password Match:", isMatch);

    if (!isMatch) {
      res.status(400).send("Incorrect Password");
      return;
    }
    const token = jwt.sign({ id: user._id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      maxAge: 86000000,
      httpOnly: true,
      secure: true,
    });
    res.send({ ok: true, userId: user._id, name: user.name });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).send("An error occurred during login");
  }
};
const logOut = (req, res) => {
  try {
    res.clearCookie("token");
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
  signup,
  login,
  logOut,
  getAllUsers,
  getUserById,

  savePet,
};

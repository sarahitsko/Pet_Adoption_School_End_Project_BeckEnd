const mongoose = require("mongoose");
require("../db/mongoose");
const petId = require("../models/pet");
const validator = require("validator");

const { ObjectId } = require("mongodb");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true }, // String is shorthand for {type: String}
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw err("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
  },
  tokens: [
    {
      token: {
        type: String,
        require: true,
      },
    },
  ],
  savedPets: [
    {
      petid: { type: mongoose.Types.ObjectId, ref: "Pet" },
      userId: { type: mongoose.Types.ObjectId, ref: "User" },
    },
  ],
  isAdmin: {
    type: Boolean,
  },
});

userSchema.methods.generateAuthToken = async function () {
  try {
    user.token = user.token.concat({ token });
    await user.save();
  } catch (err) {
    console.log(err);
  }
};
userSchema.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

const User = mongoose.model("user", userSchema);

async function addUser(newUser) {
  try {
    const createdUser = await User.create(newUser);
    return createdUser;
  } catch (err) {
    console.log(err);
  }
}
// async function doesUserExistsModel(userName) {
//   const foundUser = await User. hash({ name: userName });
//   return foundUser !== null;
// }

const getUserByEmailModel = async (email) => {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (err) {
    console.log(err);
  }
};

const readAllUsersModel = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    console.log(err);
  }
};

async function getUserByIdModel(userId) {
  try {
    const user = await User.findById(userId).select("-password");
    return user;
  } catch (err) {
    console.log(err);
  }
}

// async function addPetToUserModel(userId, petId) {
//   try {
//     const user = await User.findByIdAndUpdate(
//       userId,
//       { $push: { savededPet: petId } },
//       { new: true }
//     );
//     console.log(user.savededPet);
//     return user;
//   } catch (err) {
//     console.log(err);
//   }
// }

module.exports = {
  User,
  addUser,
  getUserByEmailModel,
  // doesUserExistsModel,
  readAllUsersModel,
  getUserByIdModel,
  userSchema,
};

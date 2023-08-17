const mongoose = require("mongoose");
require("../db/mongoose");
const petId = require("../models/pet");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
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
    maxlength: 60,
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
    default: false,
  },
});

userSchema.methods.generateAuthToken = async function () {
  try {
    User.token = User.token.concat({ token });
    await User.save();
  } catch (err) {
    console.log(err);
  }
};

const User = mongoose.model("user", userSchema);

async function addUser(newUser) {
  try {
    const createdUser = await User.create(newUser);
    return createdUser;
  } catch (err) {
    console.log(err);
  }
}

const getUserByEmailModel = async (email) => {
  try {
    const user = await User.findOne({ email: email });
    console.log("Retrieved User:", user);
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
const editUserModel = async (userId, updatedUser) => {
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updatedUser },
      { new: true }
    );
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  User,
  addUser,
  getUserByEmailModel,
  editUserModel,
  readAllUsersModel,
  getUserByIdModel,
  userSchema,
};

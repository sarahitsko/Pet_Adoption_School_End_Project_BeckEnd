const mongoose = require("mongoose");
const validator = require("validator");
require("../db/mongoose");
const { MongoClient, ObjectId } = require("mongodb");

const petSchema = new mongoose.Schema({
  petId: { type: ObjectId, require: true },
  type: { type: String, require: true },
  name: { type: String, require: true, trim: true },
  adoptionStatus: { type: String, require: true, trim: true },
  imageUrl: { type: String, require: true, trim: true },
  height: { type: Number, trim: true },
  weight: { type: Number, trim: true },
  color: { type: String, require: true, trim: true },
  bio: { type: String, require: true, trim: true },
  hypoallergenic: { type: String, require: true, trim: true },
  dietery: { type: String, require: true },
  breed: { type: String, require: true, trim: true },
  date: { type: Date, default: Date.now },
  userIds: [{ type: mongoose.Types.ObjectId, ref: "User" }],
});

petSchema.pre("save", async function (next) {
  console.log("Before saving Pet");
  next();
});

const Pet = mongoose.model("Pets", petSchema);

module.exports = { Pet };

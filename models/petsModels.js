const mongoose = require("mongoose");
require("../src/db/mongoose");
const { Pet } = require("../src/models/pet");
const { User } = require("../src/models/user");
const validator = require("validator");
// Pet details: Type (dog, cat), Name, Adoption Status, Picture, Height, Weight, Color, Bio, Hypoallergenic (yes/no), dietary restrictions, breed of animal (Poodle, Siamese)

async function readAllPetsModel(req) {
  try {
    const page = req.query.page || 0;
    const petsPerPage = 9;
    const cardsList = await Pet.find()
      .skip(page * petsPerPage)
      .limit(petsPerPage);
    return cardsList;
  } catch (err) {
    throw err;
  }
}

async function addPet(newPet) {
  try {
    const createdPet = await Pet.create(newPet);
    console.log(createdPet);
    return createdPet;
  } catch (err) {
    console.log(err);
  }
}

const addPetModel = async (req, res, next) => {
  try {
    const newPet = await Pet.create(req.body);
    res.status(201).send(newPet);
  } catch (err) {
    console.log(err);
    if (err.name === "ValidationError") {
      res.status(400).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  }
};

async function getPetByIdModel(petId) {
  try {
    const pet = await Pet.findById({ _id: petId });
    return pet;
  } catch (err) {
    console.log(err);
  }
}

async function editPetModel(petId, editData) {
  try {
    const pet = await Pet.findOneAndUpdate({ _id: petId }, editData, {
      new: true,
    });
    console.log(pet);
    return pet;
  } catch (err) {
    console.log(err);
  }
}

async function editStatusModel(petId, editedStatus) {
  try {
    const pet = await Pet.findOneAndUpdate(
      { _id: petId },
      { $set: { adoptionStatus: editedStatus } },
      {
        new: true,
      }
    );

    console.log(pet, editedStatus);
    return pet;
  } catch (err) {
    console.log(err);
  }
}

async function searchPetsModel(type, name, adoptionStatus, height, weight) {
  try {
    const query = {};
    if (type) query.type = type;
    if (name) query.name = name;
    if (adoptionStatus) query.adoptionStatus = adoptionStatus;
    if (height) query.height = height;
    if (height === "short") {
      query.height = { $gte: 10, $lte: 30 };
    } else if (height === "high") {
      query.height = { $gte: 30 };
    }
    if (weight) query.weight = weight;
    if (weight === "small") {
      query.weight = { $lte: 10 };
    } else if (weight === "medium") {
      query.weight = { $gte: 10, $lte: 22 };
    } else if (weight === "large") {
      query.weight = { $gte: 22 };
    }

    const pets = await Pet.find(query);

    return pets;
  } catch (err) {
    throw new Error(err);
  }
}

async function returnPetsModel(petId) {
  try {
    const pet = await Pet.findOneAndRemove({ _id: petId });
    console.log(pet);
    console.log("the pet has removed");
    return pet;
  } catch (err) {
    console.log(err);
  }
}

async function savedPetModel(petId, userId) {
  try {
    const pet = await Pet.findByIdAndUpdate(
      petId,
      { $push: { userIds: userId } },
      { new: true }
    );

    console.log(pet);
    return pet;
  } catch (error) {
    res.status(500).send({ message: "Error saving pet" });
  }
}

const deleteSavePetModel = async (petId, userId) => {
  console.log(petId, userId, "ids before update");
  try {
    const pet = await Pet.findByIdAndUpdate(
      petId,
      {
        $pull: { userIds: mongoose.Types.ObjectId(userId) },
      },
      { new: true }
    );
    console.log(pet, "pet before update");

    if (pet.userIds.includes(userId)) {
      throw new Error("Failed to remove user ID from pet");
    }

    console.log(pet, "deleted userId");
    return pet;
  } catch (err) {
    console.log(err);
    throw new Error("Error deleting pet");
  }
};

async function getByUserIdModel(userId) {
  try {
    const pets = await Pet.find({ userIds: userId });
    if (!pets) throw new Error("No saved pets found for this user");
    console.log(pets, "pet from save");
    return pets;
  } catch (err) {
    throw err;
  }
}
async function getRandomPetFromDatabase() {
  const count = await Pet.countDocuments({
    imageUrl: { $exists: true, $ne: "" },
  });
  const randomIndex = Math.floor(Math.random() * count);
  const randomPet = await Pet.findOne({
    imageUrl: { $exists: true, $ne: "" },
  }).skip(randomIndex);
  return randomPet;
}
module.exports = {
  readAllPetsModel,
  addPetModel,

  getPetByIdModel,
  editPetModel,
  editStatusModel,
  searchPetsModel,
  returnPetsModel,
  savedPetModel,
  deleteSavePetModel,
  getByUserIdModel,
  getRandomPetFromDatabase,
};

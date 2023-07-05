const { Pet } = require("../src/models/pet");
const { MongoClient, ObjectId } = require("mongodb");
require("../collection-manager/mongodb");
// const petsCollection = db.collection("Pets");
require("../src/db/mongoose");

const {
  deletePetModel,
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
} = require("../models/petsModels");

const addPet = async (req, res, next) => {
  try {
    req.body.imageUrl = req.file.path;
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

const getAllpets = async (req, res, next) => {
  try {
    const allPets = await readAllPetsModel(req);
    res.send(allPets);
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};

const getPetById = async (req, res, next) => {
  try {
    const { petId } = req.params;
    const pet = await getPetByIdModel(petId);
    if (!pet) return res.status(404).send("Pet not found");
    res.send(pet);
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};

const editPet = async (req, res, next) => {
  try {
    const { petId } = req.params;
    req.body.imageUrl = req.file;
    console.log(req.body.imageUrl);
    const edited = await editPetModel(petId, req.body);
    if (edited) {
      res.send(edited);
    }
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};

const editPetStatus = async (req, res, next) => {
  try {
    const { petId } = req.params;
    console.log(req.params);
    console.log(req.body.adoptionStatus);
    const editedStatus = await editStatusModel(petId, req.body.adoptionStatus);
    if (editedStatus) {
      res.send(editedStatus);
    }
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};

const searchPets = async (req, res) => {
  try {
    const { type, name, adoptionStatus, height, weight } = req.query;

    const allSearchPets = await searchPetsModel(
      type,
      name,
      adoptionStatus,
      height,
      weight,
      req.params
    );
    console.log(req.query);
    if (!allSearchPets) return res.status(404).send("Pet not found");
    res.send(allSearchPets);
  } catch (err) {
    console.log(err);
  }
};

const returnPets = async (req, res, next) => {
  try {
    const { petId } = req.params;
    console.log(req.params);
    const returned = await returnPetsModel(petId, req.body.reutrn);
    if (returned) {
      res.send(returned);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const savePet = async (req, res) => {
  try {
    const { petId, userId } = req.body;

    const savedPet = await savedPetModel(petId, userId);
    res.send(savedPet);
    console.log("the pet was added to favorite");
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error saving pet" });
  }
};

const deleteSavePet = async (req, res) => {
  try {
    const { petId } = req.params;
    const { userId } = req.query;
    const pet = await deleteSavePetModel(petId, userId);
    console.log(req.params, "params of felete save");

    if (pet) {
      res.send(pet);
      console.log("the pet was deleted from favorites");
    } else {
      res.status(404).send("No pets found to delete");
    }
  } catch (err) {
    res.status(500).send("Failed to delete pet");
  }
};

const petByUserId = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const petByUser = await getByUserIdModel(userId);
    if (petByUser) {
      res.send(petByUser);
    } else {
      throw new Error("No saved pets found for this user");
    }
  } catch (err) {
    res.status(500).send("Failed to get saved pets by User");
    next(err);
  }
};

module.exports = {
  addPet,
  getAllpets,
  getPetById,
  editPet,
  editPetStatus,
  searchPets,
  returnPets,
  savePet,
  deleteSavePet,
  petByUserId,
};

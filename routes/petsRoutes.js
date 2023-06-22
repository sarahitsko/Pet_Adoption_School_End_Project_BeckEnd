const express = require("express");
const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");
require("../src/db/mongoose");
const Pet = require("../models/petsModels");
const { auth } = require("../middleware/usersMiddleware");
const UsersController = require("../controllers/UsersController");
require("../collection-manager/mongodb");

require("../server");
const PetsController = require("../controllers/PetsController");

//////////////////////////////////////////////////////////

const { upload, generateUrl } = require("../middleware/imagesMiddleware");

// router.route('/:Id')
// .get(auth, CardsController.getAllCards)
// .delete( auth, CardsController.deleteCard)
// .put( auth, CardsController.getAllCards);

///Add Validation Middleware to POST/PUT routes

// After testing add the  !!auth!!

//////////////////////////////////////////////////////////

router.post("/", upload.single("petImage"), PetsController.addPet);
//router.post("/", update.single("petImage"), PetsController.editPet);
router.get("/", PetsController.getAllpets);
router.get("/:petId", PetsController.getPetById);
router.get("/search/pet", PetsController.searchPets);
router.get("/user/:id", PetsController.petByUserId);
router.put("/:petId", PetsController.editPet);
router.post("/:petId/adopt", PetsController.editPetStatus);
router.post("/:id/return", PetsController.returnPets);
router.post("/save", UsersController.savePet);
router.delete("/:petId/deletesave/:userId", PetsController.deleteSavePet);

module.exports = router;

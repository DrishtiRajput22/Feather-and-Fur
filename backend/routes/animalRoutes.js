const express = require("express");
const router = express.Router();

const {
  addAnimal,
  getAnimals,
  getAnimalById,
  updateAnimal,
  deleteAnimal,
} = require("../controller/animalController");

const { protect } = require("../middleware/authMiddleware");


// Add a new animal
router.post("/", protect, addAnimal);


// Get all animals of logged-in user
router.get("/", protect, getAnimals);
// Get single animal
router.get("/:id", protect, getAnimalById);
router.put("/:id", protect, updateAnimal);
router.delete("/:id", protect, deleteAnimal);

module.exports = router;
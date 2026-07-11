const Animal = require("../models/Animal");


// Add Animal
const addAnimal = async (req, res) => {
  try {
    const animal = await Animal.create({
      ...req.body,
      owner: req.user.id,
    });

    res.status(201).json({
      message: "Animal added successfully",
      animal,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Get all animals of logged-in user
const getAnimals = async (req, res) => {
  try {
    const animals = await Animal.find({
      owner: req.user.id,
    });

    res.status(200).json({
      count: animals.length,
      animals,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Get single animal by ID
const getAnimalById = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);

    if (!animal) {
      return res.status(404).json({
        message: "Animal not found",
      });
    }

    res.status(200).json(animal);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Update animal
const updateAnimal = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);

    if (!animal) {
      return res.status(404).json({
        message: "Animal not found",
      });
    }

    // Check ownership
    if (animal.owner.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const updatedAnimal = await Animal.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "Animal updated successfully",
      animal: updatedAnimal,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Delete animal
const deleteAnimal = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);

    if (!animal) {
      return res.status(404).json({
        message: "Animal not found",
      });
    }

    // Check ownership
    if (animal.owner.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await animal.deleteOne();

    res.status(200).json({
      message: "Animal deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addAnimal,
  getAnimals,
  getAnimalById,
  updateAnimal,
  deleteAnimal,
};
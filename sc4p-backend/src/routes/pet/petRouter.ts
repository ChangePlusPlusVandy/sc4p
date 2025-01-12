import express from "express";
import * as PetService from "./petService";
import { CreatePet, UpdatePet } from "../../types/pet";

const petRouter = express.Router();

// GET all pets
petRouter.get("/", async (req, res) => {
  try {
    const pets = await PetService.getAllPets();
    res.status(200).json(pets);
  } catch (error) {
    console.error("Error fetching pets:", error);
    res.status(500).json({ message: "Failed to fetch pets" });
  }
});

// GET pet by ID
petRouter.get("/id/:id", async (req, res) => {
  try {
    const pet = await PetService.getPetById(Number(req.params.id));
    if (pet) {
      res.status(200).json(pet);
    } else {
      res.status(404).json({ message: "Pet not found" });
    }
  } catch (error) {
    console.error("Error fetching pet:", error);
    res.status(500).json({ message: "Failed to fetch pet" });
  }
});

// GET pets by owner ID
petRouter.get("/owner/:ownerId", async (req, res) => {
  try {
    const pets = await PetService.getPetsByOwnerId(Number(req.params.ownerId));
    res.status(200).json(pets);
  } catch (error) {
    console.error("Error fetching owner's pets:", error);
    res.status(500).json({ message: "Failed to fetch owner's pets" });
  }
});

// POST create a new pet
petRouter.post("/", async (req, res) => {
  try {
    const newPet = await PetService.createPet(req.body as CreatePet);
    res.status(201).json(newPet);
  } catch (error) {
    console.error("Error creating pet:", error);
    res.status(500).json({ message: "Failed to create pet" });
  }
});

// PUT update a pet
petRouter.put("/:id", async (req, res) => {
  try {
    const updatedPet = await PetService.updatePetById(
      Number(req.params.id),
      req.body as UpdatePet,
    );
    if (updatedPet) {
      res.status(200).json(updatedPet);
    } else {
      res.status(404).json({ message: "Pet not found" });
    }
  } catch (error) {
    console.error("Error updating pet:", error);
    res.status(500).json({ message: "Failed to update pet" });
  }
});

// DELETE a pet by ID
petRouter.delete("/id/:id", async (req, res) => {
  try {
    const pet = await PetService.getPetById(Number(req.params.id));
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    await PetService.deletePetById(Number(req.params.id));
    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting pet:", error);
    res.status(500).json({ message: "Failed to delete pet" });
  }
});

export default petRouter;

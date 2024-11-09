import express from "express";
import * as PetService from "./petService";
import { PrismaClient } from "@prisma/client";
import { Pet } from "../../types/pet";
import Joi from "joi";

const prisma = new PrismaClient();
const petRouter = express.Router();

const schema = Joi.object({
  name: Joi.string().required(),
  sex: Joi.string().valid("Male", "Female").required(),
  dateOfBirth: Joi.date().required(),
  spayedNeutered: Joi.boolean().required(),
  type: Joi.string().required(),
  microchipId: Joi.string(),
  licenseNumber: Joi.string(),
  medicalHistory: Joi.string(),
  specialNeeds: Joi.string(),
  specialDiet: Joi.string(),
  behavioralHabits: Joi.string(),
  commands: Joi.string(),
  dailyRoutine: Joi.string(),
  allowedOutside: Joi.boolean(),
  sleepLocation: Joi.string(),
  likesChildren: Joi.boolean(),
  homeAccess: Joi.string(),
  favoriteItems: Joi.string(),
  fleaPrevention: Joi.string(),
  allergies: Joi.string(),
  specialCareInstructions: Joi.string(),
  medicalHistoryLocation: Joi.string(),
  foodBrand: Joi.string(),
  foodAmount: Joi.string(),
  feedingSchedule: Joi.string(),
  medications: Joi.string(),
  emergencySupplies: Joi.string(),
  healthInsuranceProvider: Joi.string(),
  healthInsurancePolicyNumber: Joi.string(),
  healthInsuranceCost: Joi.number().integer(),
  euthanasiaDecision: Joi.string().required(),
  remainsCare: Joi.string().required(),
  allocatedRemainsFund: Joi.number().integer(),
  createdAt: Joi.date().optional(),
});

// GET all pets
petRouter.get("/", async (req, res) => {
  try {
    const pets = await PetService.getAllPets();
    res.status(200).json(pets);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching pets" });
  }
});

// GET pet by ID
petRouter.get("/id/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pet = await PetService.getPetById(Number(id));
    if (pet) {
      res.status(200).json(pet);
    } else {
      res.status(404).json({ message: "Pet not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching pet" });
  }
});

// POST create a new pet
petRouter.post("/", async (req, res) => {
  const petInfo = req.body;
  try {
    const data = (await schema.validateAsync(petInfo)) as Pet;
    const newPet = await PetService.createPet(data);
    res.status(201).json(newPet);
  } catch (error) {
    res.status(500).json({ message: "Error creating pet" });
  }
});

// PUT update a pet
petRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = (await schema.validateAsync(req.body)) as Pet;
  try {
    const updatedPet = await PetService.updatePetById(Number(id), data);
    res.status(200).json(updatedPet);
  } catch (error) {
    res.status(500).json({ message: "Error updating pet" });
  }
});

// DELETE a pet by ID
petRouter.delete("/id/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await PetService.deletePetById(Number(id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting pet" });
  }
});

export default petRouter;

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
  allocatedRemainsFund: Joi.number().integer().allow(null),
  createdAt: Joi.date().optional(),
});

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

// POST create a new pet
petRouter.post("/", async (req, res) => {
  try {
    const validatedData = await schema.validateAsync(req.body);
    const newPet = await PetService.createPet(validatedData);
    res.status(201).json(newPet);
  } catch (error: any) {
    if (error.isJoi) {
      res.status(400).json({
        message: "Validation error",
        details: error.details.map((d: any) => d.message),
      });
    } else {
      console.error("Error creating pet:", error);
      res.status(500).json({ message: "Failed to create pet" });
    }
  }
});

// PUT update a pet
petRouter.put("/:id", async (req, res) => {
  try {
    const validatedData = await schema.validateAsync(req.body);
    const updatedPet = await PetService.updatePetById(
      Number(req.params.id),
      validatedData,
    );
    if (updatedPet) {
      res.status(200).json(updatedPet);
    } else {
      res.status(404).json({ message: "Pet not found" });
    }
  } catch (error: any) {
    if (error.isJoi) {
      res.status(400).json({
        message: "Validation error",
        details: error.details.map((d: any) => d.message),
      });
    } else {
      console.error("Error updating pet:", error);
      res.status(500).json({ message: "Failed to update pet" });
    }
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

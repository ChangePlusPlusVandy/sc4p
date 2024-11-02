import express from "express";
import * as PetService from "./petService";
import { PrismaClient } from "@prisma/client";
import { Pet } from "../../types/pet";
import Joi from "joi";

const prisma = new PrismaClient();
const petRouter = express.Router();

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
  const schema = Joi.object({
    name: Joi.string().required(),
    sex: Joi.string().valid("Male", "Female").required(),
    date_of_birth: Joi.date().required(),
    spayed_neutered: Joi.boolean().required(),
    type: Joi.string().required(),
    microchip_id: Joi.string(),
    license_number: Joi.string(),
    medical_history: Joi.string(),
    special_needs: Joi.string(),
    special_diet: Joi.string(),
    behavioral_habits: Joi.string(),
    commands: Joi.string(),
    daily_routine: Joi.string(),
    allowed_outside: Joi.boolean(),
    sleep_location: Joi.string(),
    likes_children: Joi.boolean(),
    home_access: Joi.string(),
    favorite_items: Joi.string(),
    flea_prevention: Joi.string(),
    allergies: Joi.string(),
    special_care_instructions: Joi.string(),
    medical_history_location: Joi.string(),
    food_brand: Joi.string(),
    food_amount: Joi.string(),
    feeding_schedule: Joi.string(),
    medications: Joi.string(),
    emergency_supplies: Joi.string(),
    health_insurance_provider: Joi.string(),
    health_insurance_policy_number: Joi.string(),
    health_insurance_cost: Joi.number(),
    euthanasia_decision: Joi.string(),
    remains_care: Joi.string(),
    allocated_remains_fund: Joi.number(),
    created_at: Joi.date(),
  });
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
  const schema = Joi.object({
    name: Joi.string().required(),
    sex: Joi.string().valid("Male", "Female").required(),
    date_of_birth: Joi.date().required(),
    spayed_neutered: Joi.boolean().required(),
    type: Joi.string().required(),
    microchip_id: Joi.string(),
    license_number: Joi.string(),
    medical_history: Joi.string(),
    special_needs: Joi.string(),
    special_diet: Joi.string(),
    behavioral_habits: Joi.string(),
    commands: Joi.string(),
    daily_routine: Joi.string(),
    allowed_outside: Joi.boolean(),
    sleep_location: Joi.string(),
    likes_children: Joi.boolean(),
    home_access: Joi.string(),
    favorite_items: Joi.string(),
    flea_prevention: Joi.string(),
    allergies: Joi.string(),
    special_care_instructions: Joi.string(),
    medical_history_location: Joi.string(),
    food_brand: Joi.string(),
    food_amount: Joi.string(),
    feeding_schedule: Joi.string(),
    medications: Joi.string(),
    emergency_supplies: Joi.string(),
    health_insurance_provider: Joi.string(),
    health_insurance_policy_number: Joi.string(),
    health_insurance_cost: Joi.number(),
    euthanasia_decision: Joi.string(),
    remains_care: Joi.string(),
    allocated_remains_fund: Joi.number(),
    created_at: Joi.date(),
  });
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

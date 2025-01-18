import express from "express";
import * as VetService from "./vetService";
import {
  CreateVeterinarian,
  UpdateVeterinarian,
} from "../../types/veterinarian";

const vetRouter = express.Router();

// GET all vets
vetRouter.get("/", async (req, res) => {
  try {
    const vets = await VetService.getAllVeterinarians();
    res.status(200).json(vets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching veterinarians" });
  }
});

// GET vets by owner ID
vetRouter.get("/owner/:ownerId", async (req, res) => {
  try {
    const vets = await VetService.getVeterinariansByOwnerId(
      Number(req.params.ownerId),
    );
    res.status(200).json(vets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching veterinarians" });
  }
});

// GET vet by ID
vetRouter.get("/:id", async (req, res) => {
  try {
    const vet = await VetService.getVeterinarianById(Number(req.params.id));
    if (vet) {
      res.status(200).json(vet);
    } else {
      res.status(404).json({ message: "Veterinarian not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching veterinarian" });
  }
});

// POST create new vet
vetRouter.post("/", async (req, res) => {
  try {
    const vetData: CreateVeterinarian = {
      owner_id: Number(req.body.owner_id),
      name: req.body.name,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
    };

    const vet = await VetService.CreateVeterinarian(vetData);
    res.status(201).json(vet);
  } catch (error) {
    res.status(400).json({
      message: "Error creating veterinarian",
      error: (error as Error).message,
    });
  }
});

// PUT update vet
vetRouter.put("/:id", async (req, res) => {
  try {
    const updateData: UpdateVeterinarian = {
      name: req.body.name,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
    };

    const vet = await VetService.UpdateVeterinarian(
      Number(req.params.id),
      updateData,
    );
    res.status(200).json(vet);
  } catch (error) {
    res.status(500).json({ message: "Error updating veterinarian" });
  }
});

// DELETE vet
vetRouter.delete("/:id", async (req, res) => {
  try {
    await VetService.deleteVeterinarian(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting veterinarian" });
  }
});

export default vetRouter;

import express from "express";
import * as CaregiverService from "./caregiverService";
import { CreateCaregiver, UpdateCaregiver } from "../../types/caregiver";

const caregiverRouter = express.Router();

// GET all caregivers
caregiverRouter.get("/", async (req, res) => {
  try {
    const caregivers = await CaregiverService.getAllCaregivers();
    res.status(200).json(caregivers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching caregivers" });
  }
});

// GET caregivers by owner ID
caregiverRouter.get("/owner/:ownerId", async (req, res) => {
  try {
    const caregivers = await CaregiverService.getCaregiversByOwnerId(
      Number(req.params.ownerId),
    );
    res.status(200).json(caregivers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching caregivers" });
  }
});

// GET caregiver by ID
caregiverRouter.get("/:id", async (req, res) => {
  try {
    const caregiver = await CaregiverService.getCaregiverById(
      Number(req.params.id),
    );
    if (caregiver) {
      res.status(200).json(caregiver);
    } else {
      res.status(404).json({ message: "Caregiver not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching caregiver" });
  }
});

// POST create new caregiver
caregiverRouter.post("/", async (req, res) => {
  try {
    const caregiverData: CreateCaregiver = {
      owner_id: Number(req.body.owner_id),
      name: req.body.name,
      care_type: req.body.care_type,
      primary: Boolean(req.body.primary),
      accepted: Boolean(req.body.accepted),
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      phone: req.body.phone,
      email: req.body.email,
    };

    const caregiver = await CaregiverService.createCaregiver(caregiverData);
    res.status(201).json(caregiver);
  } catch (error) {
    res.status(400).json({
      message: "Error creating caregiver",
      error: (error as Error).message,
    });
  }
});

// PUT update caregiver
caregiverRouter.put("/:id", async (req, res) => {
  try {
    const updateData: UpdateCaregiver = {
      name: req.body.name,
      care_type: req.body.care_type,
      primary:
        req.body.primary !== undefined ? Boolean(req.body.primary) : undefined,
      accepted:
        req.body.accepted !== undefined
          ? Boolean(req.body.accepted)
          : undefined,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      phone: req.body.phone,
      email: req.body.email,
    };

    const caregiver = await CaregiverService.updateCaregiver(
      Number(req.params.id),
      updateData,
    );
    res.status(200).json(caregiver);
  } catch (error) {
    res.status(500).json({ message: "Error updating caregiver" });
  }
});

// DELETE caregiver
caregiverRouter.delete("/:id", async (req, res) => {
  try {
    await CaregiverService.deleteCaregiver(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting caregiver" });
  }
});

export default caregiverRouter;

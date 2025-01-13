import express from "express";
import {
  getAllEmergencyContacts,
  getEmergencyContactsByOwnerId,
  getEmergencyContactById,
  createEmergencyContact,
  updateEmergencyContact,
  deleteEmergencyContact,
} from "./emergencyContactService";

const emergencyContactRouter = express.Router();

// Get all emergency contacts
emergencyContactRouter.get("/", async (_req, res) => {
  try {
    const emergencyContacts = await getAllEmergencyContacts();
    res.json(emergencyContacts);
  } catch (error) {
    res.status(500).json({ error: "Failed to get all emergency contacts" });
  }
});

// Get all emergency contacts for a specific owner
emergencyContactRouter.get("/owner/:ownerId", async (req, res) => {
  try {
    const ownerId = parseInt(req.params.ownerId);
    const emergencyContacts = await getEmergencyContactsByOwnerId(ownerId);
    res.json(emergencyContacts);
  } catch (error) {
    res.status(500).json({ error: "Failed to get emergency contacts" });
  }
});

// Get a specific emergency contact by ID
emergencyContactRouter.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const emergencyContact = await getEmergencyContactById(id);
    if (!emergencyContact) {
      return res.status(404).json({ error: "Emergency contact not found" });
    }
    res.json(emergencyContact);
  } catch (error) {
    res.status(500).json({ error: "Failed to get emergency contact" });
  }
});

// Create a new emergency contact
emergencyContactRouter.post("/", async (req, res) => {
  try {
    const newEmergencyContact = await createEmergencyContact(req.body);
    res.status(201).json(newEmergencyContact);
  } catch (error) {
    res.status(500).json({ error: "Failed to create emergency contact" });
  }
});

// Update an emergency contact
emergencyContactRouter.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updatedEmergencyContact = await updateEmergencyContact(id, req.body);
    res.json(updatedEmergencyContact);
  } catch (error) {
    res.status(500).json({ error: "Failed to update emergency contact" });
  }
});

// Delete an emergency contact
emergencyContactRouter.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await deleteEmergencyContact(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete emergency contact" });
  }
});

export default emergencyContactRouter;

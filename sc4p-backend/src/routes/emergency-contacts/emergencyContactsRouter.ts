import express from "express";
import * as emergencyContactsService from "./emergencyContactsService";
import { PrismaClient } from "@prisma/client";
import Joi from "joi";

const prisma = new PrismaClient();
const emergencyContacts = express.Router();

const schema = Joi.object({
  id: Joi.number().integer().positive(), // Primary key, optional for creation
  ownerId: Joi.number().integer().positive().required(), // Foreign key to owners
  contactName: Joi.string().min(1).max(255).required(),
  address: Joi.string().min(1).max(255).required(),
  city: Joi.string().min(1).max(255).required(),
  state: Joi.string().min(1).max(255).required(),
  zip: Joi.string().min(1).max(10).required(),
  homePhone: Joi.string()
    .pattern(/^[0-9\-\(\)\s]+$/)
    .allow(null, ""),
  cellPhone: Joi.string()
    .pattern(/^[0-9\-\(\)\s]+$/)
    .required(),
  email: Joi.string().email().required(),
  createdAt: Joi.date().default(() => new Date()),
});

// GET all emergencyContacts
emergencyContacts.get("/", async (req, res) => {
  try {
    const contacts = await emergencyContactsService.getAllContacts();
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Failed to fetch contacts" });
  }
});

// GET emergencyContact by ID
emergencyContacts.get("/id/:id", async (req, res) => {
  try {
    const contact = await emergencyContactsService.getContactById(
      Number(req.params.id),
    );
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (error) {
    console.error("Error fetching contact:", error);
    res.status(500).json({ message: "Failed to fetch contact" });
  }
});

// POST create a new emergency contact
emergencyContacts.post("/", async (req, res) => {
  try {
    const validatedData = await schema.validateAsync(req.body);
    const newContact =
      await emergencyContactsService.createContact(validatedData);
    res.status(201).json(newContact);
  } catch (error: any) {
    if (error.isJoi) {
      res.status(400).json({
        message: "Validation error",
        details: error.details.map((d: any) => d.message),
      });
    } else {
      console.error("Error creating contact:", error);
      res.status(500).json({ message: "Failed to create contact" });
    }
  }
});

// PUT update an emergency contact
emergencyContacts.put("/:id", async (req, res) => {
  try {
    const validatedData = await schema.validateAsync(req.body);
    const updatedContact = await emergencyContactsService.updateContactById(
      Number(req.params.id),
      validatedData,
    );
    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (error: any) {
    if (error.isJoi) {
      res.status(400).json({
        message: "Validation error",
        details: error.details.map((d: any) => d.message),
      });
    } else {
      console.error("Error updating contact:", error);
      res.status(500).json({ message: "Failed to update contact" });
    }
  }
});

// DELETE an emergency contact by ID
emergencyContacts.delete("/id/:id", async (req, res) => {
  try {
    const contact = await emergencyContactsService.getContactById(
      Number(req.params.id),
    );
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    await emergencyContactsService.deleteContactById(Number(req.params.id));
    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ message: "Failed to delete contact" });
  }
});

export default emergencyContacts;

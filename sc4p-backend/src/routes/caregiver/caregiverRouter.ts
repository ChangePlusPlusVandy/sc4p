import express from "express";
import * as CaregiverService from "./caregiverService";
import Joi from "joi";

const caregiverRouter = express.Router();

const caregiverSchema = Joi.object({
    owner_id: Joi.number().required(),
    caregiver_id: Joi.number().required(),
    care_type: Joi.string().valid("short-term", "long-term", "both").required(),
    primary: Joi.boolean().required(),
    accepted: Joi.boolean().required(),
    created_at: Joi.date(),
  });
  
  // GET all caregivers
  caregiverRouter.get("/", async (req, res) => {
    try {
      const caregivers = await CaregiverService.getAllCaregivers();
      res.status(200).json(caregivers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching caregivers" });
    }
  });
  
  // GET caregiver by composite key (owner_id and caregiver_id)
  caregiverRouter.get("/:owner_id/:caregiver_id", async (req, res) => {
    const { owner_id, caregiver_id } = req.params;
    try {
      const caregiver = await CaregiverService.getCaregiverById(Number(owner_id), Number(caregiver_id));
      if (caregiver) {
        res.status(200).json(caregiver);
      } else {
        res.status(404).json({ message: "Caregiver not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching caregiver" });
    }
  });
  
  // POST create a new caregiver
  caregiverRouter.post("/", async (req, res) => {
    try {
      const data = await caregiverSchema.validateAsync(req.body);
      const newCaregiver = await CaregiverService.createCaregiver(data);
      res.status(201).json(newCaregiver);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error creating caregiver" });
    }
  });
  
  // PUT update a caregiver by composite key (owner_id and caregiver_id)
  caregiverRouter.put("/:owner_id/:caregiver_id", async (req, res) => {
    const { owner_id, caregiver_id } = req.params;
    try {
      const data = await caregiverSchema.validateAsync(req.body);
      const updatedCaregiver = await CaregiverService.updateCaregiverById(Number(owner_id), Number(caregiver_id), data);
      res.status(200).json(updatedCaregiver);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating caregiver" });
    }
  });
  
  // DELETE a caregiver by composite key (owner_id and caregiver_id)
  caregiverRouter.delete("/:owner_id/:caregiver_id", async (req, res) => {
    const { owner_id, caregiver_id } = req.params;
    try {
      await CaregiverService.deleteCaregiverById(Number(owner_id), Number(caregiver_id));
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting caregiver" });
    }
  });
  
  export default caregiverRouter;
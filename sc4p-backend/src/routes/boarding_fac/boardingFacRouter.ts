import express from "express";
import * as BoardingFacService from "./boardingFacService";
import { PrismaClient } from "@prisma/client";
import { BoardingFac } from "../../types/boardingFac";
import Joi from "joi";

const boardingFacilityRouter = express.Router();

const schema = Joi.object({
    owner_id: Joi.number().integer().required(),
    contact_name: Joi.string().required(),
    daily_charge: Joi.number().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zip: Joi.string().required(),
    home_phone: Joi.string().required(),
    cell_phone: Joi.string().required(),
    email: Joi.string().required(),
});

// GET all boarding facilities
boardingFacilityRouter.get("/", async (req, res) => {
    try {
        const boardingFacs = await BoardingFacService.getAllBoardingFacs();
        res.status(200).json(boardingFacs);
    } catch (error) {
        console.error("Error fetching boarding facilities:", error);
        res.status(500).json({ message: "Failed to fetch boarding facilities" });
    }
});

// GET boarding facility by ID
boardingFacilityRouter.get("/id/:id", async (req, res) => {
    try {
        const boardingFac = await BoardingFacService.getBoardingFacById(parseInt(req.params.id));
        res.status(200).json(boardingFac);
    } catch (error) {
        console.error("Error fetching boarding facility:", error);
        res.status(500).json({ message: "Failed to fetch boarding facility" });
    }
});

// POST new boarding facility
boardingFacilityRouter.post("/", async (req, res) => {
    try {
        const newBoardingFac: BoardingFac = req.body;
        console.log(newBoardingFac);
        const { error } = schema.validate(newBoardingFac);
        if (error) {
            console.error("Validation error:", error);
            return res.status(400).json({ message: "Invalid request body" });
        }
        const boardingFac = await BoardingFacService.createBoardingFac(newBoardingFac);
        res.status(201).json(boardingFac);
    } catch (error) {
        console.error("Error creating boarding facility:", error);
        res.status(500).json({ message: "Failed to create boarding facility" });
    }
});

// PUT update boarding facility by ID
boardingFacilityRouter.put("/:id", async (req, res) => {
    try {
        const updatedBoardingFac: BoardingFac = req.body;
        const { error } = schema.validate(updatedBoardingFac);
        if (error) {
            console.error("Validation error:", error);
            return res.status(400).json({ message: "Invalid request body" });
        }
        const boardingFac = await BoardingFacService.updateBoardingFacById(parseInt(req.params.id), updatedBoardingFac);
        res.status(200).json(boardingFac);
    } catch (error) {
        console.error("Error updating boarding facility:", error);
        res.status(500).json({ message: "Failed to update boarding facility" });
    }
});

// DELETE boarding facility by ID
boardingFacilityRouter.delete("/:id", async (req, res) => {
    try {
        await BoardingFacService.deleteBoardingFacById(parseInt(req.params.id));
        res.status(204).end();
    } catch (error) {
        console.error("Error deleting boarding facility:", error);
        res.status(500).json({ message: "Failed to delete boarding facility" });
    }
});

export default boardingFacilityRouter;
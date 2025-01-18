import express from "express";
import * as BoardingFacService from "./boardingFacService";
import { CreateBoardingFac, UpdateBoardingFac } from "../../types/boardingFac";

const boardingFacRouter = express.Router();

// GET all boarding facilities
boardingFacRouter.get("/", async (req, res) => {
  try {
    const boardingFacs = await BoardingFacService.getAllBoardingFacs();
    res.status(200).json(boardingFacs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching boarding facilities" });
  }
});

// GET boarding facility by ID
boardingFacRouter.get("/id/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const boardingFac = await BoardingFacService.getBoardingFacById(Number(id));
    if (boardingFac) {
      res.status(200).json(boardingFac);
    } else {
      res.status(404).json({ message: "Boarding facility not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching boarding facility" });
  }
});

// GET boarding facilities by owner ID
boardingFacRouter.get("/owner/:owner_id", async (req, res) => {
  const { owner_id } = req.params;
  try {
    const boardingFacs = await BoardingFacService.getBoardingFacsByOwnerId(
      Number(owner_id),
    );
    res.status(200).json(boardingFacs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching boarding facilities" });
  }
});

// POST create a new boarding facility
boardingFacRouter.post("/", async (req, res) => {
  try {
    const boardingFacData: CreateBoardingFac = {
      owner_id: req.body.owner_id,
      contact_name: req.body.contact_name,
      daily_charge: req.body.daily_charge || null,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      home_phone: req.body.home_phone || null,
      cell_phone: req.body.cell_phone,
      email: req.body.email || null,
    };
    const boardingFac =
      await BoardingFacService.createBoardingFac(boardingFacData);
    res.status(201).json(boardingFac);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// PUT update a boarding facility
boardingFacRouter.put("/id/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBoardingFac = await BoardingFacService.updateBoardingFac(
      Number(id),
      req.body,
    );
    res.status(200).json(updatedBoardingFac);
  } catch (error) {
    res.status(500).json({ message: "Error updating boarding facility" });
  }
});

// DELETE a boarding facility
boardingFacRouter.delete("/id/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await BoardingFacService.deleteBoardingFac(Number(id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting boarding facility" });
  }
});

export default boardingFacRouter;

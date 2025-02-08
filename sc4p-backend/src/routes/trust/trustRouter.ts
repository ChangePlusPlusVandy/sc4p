import express from "express";
import * as TrustService from "./trustService";
import {
  CreateTrustFundInfo,
  CreateTrustee,
  UpdateTrustee,
} from "../../types/trust";

const trustRouter = express.Router();

// Trust Fund Info Routes
trustRouter.get("/fund/:ownerId", async (req, res) => {
  try {
    const trustFundInfo = await TrustService.getTrustFundInfoByOwnerId(
      Number(req.params.ownerId),
    );
    if (!trustFundInfo) {
      return res.status(404).json({ message: "Trust fund info not found" });
    }
    res.status(200).json(trustFundInfo);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trust fund info" });
  }
});

trustRouter.post("/fund", async (req, res) => {
  try {
    const trustFundData: CreateTrustFundInfo = {
      owner_id: Number(req.body.owner_id),
      funding_plan: req.body.funding_plan || null,
      bank_account_details: req.body.bank_account_details || null,
      life_insurance_policy_number:
        req.body.life_insurance_policy_number || null,
      other_funding_details: req.body.other_funding_details || null,
    };
    const trustFundInfo = await TrustService.createTrustFundInfo(trustFundData);
    res.status(201).json(trustFundInfo);
  } catch (error) {
    res.status(400).json({
      message: "Error creating trust fund info",
      error: (error as Error).message,
    });
  }
});

trustRouter.put("/fund/:ownerId", async (req, res) => {
  try {
    const updatedTrustFundInfo = await TrustService.updateTrustFundInfo(
      Number(req.params.ownerId),
      req.body,
    );
    res.status(200).json(updatedTrustFundInfo);
  } catch (error) {
    res.status(500).json({ message: "Error updating trust fund info" });
  }
});

trustRouter.delete("/fund/:ownerId", async (req, res) => {
  try {
    await TrustService.deleteTrustFundInfo(Number(req.params.ownerId));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting trust fund info" });
  }
});

// Trustee Routes
trustRouter.get("/trustees", async (_req, res) => {
  try {
    const trustees = await TrustService.getAllTrustees();
    res.status(200).json(trustees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trustees" });
  }
});

trustRouter.get("/trustees/fund/:trustFundId", async (req, res) => {
  try {
    const trustees = await TrustService.getTrusteesByTrustFundId(
      Number(req.params.trustFundId),
    );
    res.status(200).json(trustees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trustees" });
  }
});

trustRouter.get("/trustees/:id", async (req, res) => {
  try {
    const trustee = await TrustService.getTrusteeById(Number(req.params.id));
    if (!trustee) {
      return res.status(404).json({ message: "Trustee not found" });
    }
    res.status(200).json(trustee);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trustee" });
  }
});

trustRouter.post("/trustees", async (req, res) => {
  try {
    const trusteeData: CreateTrustee = {
      trust_fund_id: Number(req.body.trust_fund_id),
      trustee_name: req.body.trustee_name,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      home_phone: req.body.home_phone || null,
      cell_phone: req.body.cell_phone,
      emergency_phone: req.body.emergency_phone || null,
      email: req.body.email,
      allocated_amount: req.body.allocated_amount || null,
    };
    const trustee = await TrustService.createTrustee(trusteeData);
    res.status(201).json(trustee);
  } catch (error) {
    res.status(400).json({
      message: "Error creating trustee",
      error: (error as Error).message,
    });
  }
});

trustRouter.put("/trustees/:id", async (req, res) => {
  try {
    const updateData: UpdateTrustee = {
      trustee_name: req.body.trustee_name,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      home_phone: req.body.home_phone,
      cell_phone: req.body.cell_phone,
      emergency_phone: req.body.emergency_phone,
      email: req.body.email,
      allocated_amount: req.body.allocated_amount,
    };
    const trustee = await TrustService.updateTrustee(
      Number(req.params.id),
      updateData,
    );
    res.status(200).json(trustee);
  } catch (error) {
    res.status(500).json({ message: "Error updating trustee" });
  }
});

trustRouter.delete("/trustees/:id", async (req, res) => {
  try {
    await TrustService.deleteTrustee(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting trustee" });
  }
});

export default trustRouter;

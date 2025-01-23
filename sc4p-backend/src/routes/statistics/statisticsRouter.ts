import express from "express";
import * as StatisticsService from "./statisticsService";
// import { CreateCaregiver, UpdateCaregiver } from "../../types/caregiver";

const statisticsRouter = express.Router();

// GET user form submission count
statisticsRouter.get("/", async (req, res) => {
  try {
    const statistics = await StatisticsService.getStatistics();
    res.status(200).json(statistics);
  } catch (error) {
    res.status(500).json({ message: "Error fetching statistics" });
  }
});

// PUT increment user form submission count
statisticsRouter.put("/form-submission", async (req, res) => {
  try {
    const formSubmissionCount = await StatisticsService.incrementFormSubmissionCount();
    res.status(200).json(formSubmissionCount);
  } catch (error) {
    res.status(500).json({ message: "Error incrementing form submission count" });
  }
});

export default statisticsRouter;
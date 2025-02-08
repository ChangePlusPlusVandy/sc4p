import express, { type Express, type Request, type Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { exampleRoute } from "./routes/exampleRoute";
import userRouter from "./routes/user/userRouter";
import petRouter from "./routes/pet/petRouter";
import boardingFacilityRouter from "./routes/boarding_fac/boardingFacRouter";
import adminRouter from "./routes/admin/adminRouter";
import { verifyToken } from "./middlewares/verifyToken";
import { notFound, errorHandler } from "./middlewares/errors";
import caregiverRouter from "./routes/caregiver/caregiverRouter";
import emergencyContactRouter from "./routes/emergency_contact/emergencyContactRouter";
import vetRouter from "./routes/vet/vetRouter";
import trustRouter from "./routes/trust/trustRouter";
import statisticsRouter from "./routes/statistics/statisticsRouter";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); // Allow cross-origin requests (for frontend to communicate with backend on different ports/address)
app.use(express.json()); // Parses incoming JSON requests and uts the parsed data in req
app.use(express.urlencoded({ extended: true })); // Parses incoming requests with urlenconded payloads
// error handling and better logging
app.use(morgan("dev"));
app.use(helmet());

/**
 * Uses the verifyToken middleware to protect the "/data" route
 * Use the verifyToken to protect all the routes that require authentication
 */
app.use("/example", verifyToken, exampleRoute);
app.use("/user", userRouter);
app.use("/pet", petRouter);
app.use("/boarding-fac", boardingFacilityRouter);
app.use("/admin", adminRouter);
app.use("/caregiver", caregiverRouter);
app.use("/emergency-contacts", emergencyContactRouter);
app.use("/vet", vetRouter);
app.use("/trust", trustRouter);
app.use("/statistics", statisticsRouter);

// Default route: Unprotected
app.get("/", (_req: Request, res: Response) => {
  res.send("Express + Typescript Auth Server Temp!");
});

// error handling route
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

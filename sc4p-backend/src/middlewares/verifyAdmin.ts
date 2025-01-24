import { type Request, type Response, type NextFunction } from "express";
import { auth } from "../../config/firebase-config";

export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decodedToken = await auth.verifyIdToken(token);
    const userRecord = await auth.getUser(decodedToken.uid);

    if (!userRecord.customClaims?.admin) {
      return res
        .status(403)
        .json({ message: "Unauthorized: Requires admin access" });
    }

    next();
  } catch (error) {
    console.error("Admin verification failed:", error);
    res.status(401).json({ message: "Invalid token or unauthorized" });
  }
};

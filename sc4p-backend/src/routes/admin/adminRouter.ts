import { Router } from "express";
import { auth } from "../../../config/firebase-config";
import { verifyAdmin } from "../../middlewares/verifyAdmin";

const adminRouter = Router();

// Get all admins
adminRouter.get("/", verifyAdmin, async (req, res) => {
  try {
    const listUsersResult = await auth.listUsers();
    const admins = (
      await Promise.all(
        listUsersResult.users.map(async (user) => {
          const claims = (await auth.getUser(user.uid)).customClaims;
          if (claims?.admin) {
            return {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
            };
          }
          return null;
        }),
      )
    ).filter(Boolean);

    res.json(admins);
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).json({ message: "Failed to fetch admins" });
  }
});

// Add admin
adminRouter.post("/:uid", verifyAdmin, async (req, res) => {
  try {
    const { uid } = req.params;
    await auth.setCustomUserClaims(uid, { admin: true });
    res.json({ message: "Admin role added successfully" });
  } catch (error) {
    console.error("Error adding admin:", error);
    res.status(500).json({ message: "Failed to add admin role" });
  }
});

// Remove admin
adminRouter.delete("/:uid", verifyAdmin, async (req, res) => {
  try {
    const { uid } = req.params;
    await auth.setCustomUserClaims(uid, { admin: false });
    res.json({ message: "Admin role removed successfully" });
  } catch (error) {
    console.error("Error removing admin:", error);
    res.status(500).json({ message: "Failed to remove admin role" });
  }
});

adminRouter.get("/user/:email", verifyAdmin, async (req, res) => {
  try {
    const { email } = req.params;
    const user = await auth.getUserByEmail(email);
    res.json({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(404).json({ message: "User not found" });
  }
});

export default adminRouter;

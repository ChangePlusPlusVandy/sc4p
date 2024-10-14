import express from "express";
import {
  getAllUsers,
  getUserByEmail,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "./userService";

const userRouter = express.Router();

// GET all users
userRouter.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Get user by email
userRouter.get("/:email", async (req, res) => {
    const { email } = req.params;
    try {
        const user = await getUserByEmail(email);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching user" });
    }
});

// GET user by ID
userRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(Number(id));
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
});

// POST create a new user
userRouter.post("/", async (req, res) => {
  const { name, email } = req.body;
  try {
    const newUser = await createUser(name, email);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
});

// PUT update a user
userRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const updatedUser = await updateUser(Number(id), name, email);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
});

// DELETE a user
userRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await deleteUser(Number(id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

export default userRouter;

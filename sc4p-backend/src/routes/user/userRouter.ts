import express from "express";
import * as UserService from "./userService";
import { CreateUser, UpdateUser } from "../../types/user";

const userRouter = express.Router();

// GET all users
userRouter.get("/", async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// GET user by email or ID
userRouter.get("/:type/:value", async (req, res) => {
  const { type, value } = req.params;
  try {
    const user =
      type === "email"
        ? await UserService.getUserByEmail(value)
        : await UserService.getUserById(Number(value));

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
});

// POST: Create a new user
userRouter.post("/", async (req, res) => {
  try {
    const userData: CreateUser = {
      email: req.body.email,
      name: req.body.name,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      home_phone: req.body.home_phone || null,
      cell_phone: req.body.cell_phone || null,
      work_phone: req.body.work_phone || null,
    };
    const user = await UserService.createUser(userData);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// PUT update a user by email
userRouter.put("/email/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const updatedUser = await UserService.updateUser(email, {
      name: req.body.name,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      home_phone: req.body.home_phone || null,
      cell_phone: req.body.cell_phone || null,
      work_phone: req.body.work_phone || null,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
});

// PUT update a user by ID
userRouter.put("/id/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await UserService.updateUserById(Number(id), {
      name: req.body.name,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      home_phone: req.body.home_phone || null,
      cell_phone: req.body.cell_phone || null,
      work_phone: req.body.work_phone || null,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
});

// DELETE a user by email
userRouter.delete("/email/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const user = await UserService.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await UserService.deleteUser(user.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

// DELETE a user by ID
userRouter.delete("/id/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await UserService.deleteUser(Number(id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

export default userRouter;

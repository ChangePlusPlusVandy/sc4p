import express from "express";
import * as UserService from "./userService";
import { PrismaClient } from "@prisma/client";
import { User } from "../../types/user";
import Joi from "joi";

const prisma = new PrismaClient();
const userRouter = express.Router();

// GET all users
userRouter.get("/", async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Error fetching users" });
  }
  
});

// GET user by email
userRouter.get("/email/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const user = await UserService.getUserByEmail(email);
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
userRouter.get("/id/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserService.getUserById(Number(id));
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
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email().required(),
    address: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    zip: Joi.string(),
    home_phone: Joi.string(),
    cell_phone: Joi.string(),
    work_phone: Joi.string(),
    created_at: Joi.date(),
  });
  const userInfo = req.body;
  try {
    const data = (await schema.validateAsync(userInfo)) as User;
    const newUser = await UserService.createUser(data);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
});

// PUT update a user
userRouter.put("/:id", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email().required(),
    address: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    zip: Joi.string(),
    home_phone: Joi.string(),
    cell_phone: Joi.string(),
    work_phone: Joi.string(),
    created_at: Joi.date(),
  });
  const { id } = req.params;
  const data = (await schema.validateAsync(req.body)) as User;
  try {
    const updatedUser = await UserService.updateUserById(Number(id), data);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
});

// DELETE a user by ID
userRouter.delete("/id/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await UserService.deleteUserById(Number(id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

// DELETE a user by email
userRouter.delete("/email/:email", async (req, res) => {
  const { email } = req.params;
  try {
    await UserService.deleteUserByEmail(email);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

export default userRouter;

import express from "express";
// import controllers functions
import {
  registerUser,
  getUsers,
  deleteUser,
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", registerUser); // Registers a new user
router.get("/", getUsers); // Retrieves all users from the database
router.delete("/:id", deleteUser); // Deletes a user by ID
router.put("/:id", updateUser); // Updates a user by ID

export default router;

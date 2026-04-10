import express from "express";
import {
  registerUser,
  getUsers,
  deleteUser,
  updateUser,
  loginUser,
  getCurrentUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", registerUser);
router.get("/", getUsers);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);
router.get("/me", getCurrentUser);
router.post("/login", loginUser);

export default router;

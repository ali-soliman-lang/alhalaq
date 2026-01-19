import express from "express";
import {
  createBarber,
  deleteBarber,
  getBarber,
  getBarbers,
  updateBarber,
} from "../controllers/barberController";

const router = express.Router();

router.post("/", createBarber);
router.get("/", getBarbers);
router.get("/:id", getBarber);
router.patch("/:id", updateBarber);
router.delete("/:id", deleteBarber);

export default router;

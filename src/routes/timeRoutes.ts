import express from "express";
import {
  getAllTimes,
  createTime,
  getTimeById,
  updateTime,
  deleteTime,
} from "../controllers/timeController";

const router = express.Router();

router
  .post("/create", createTime)
  .get("/", getAllTimes)
  .get("/:id", getTimeById)
  .put("/:id", updateTime)
  .delete("/:id", deleteTime);

export default router;

import express from "express";
import {
  getAllTimes,
  createTime,
  getTimeById,
  updateTime,
  deleteTime,
} from "../controllers/timeController";
import { checkDuplicateTime } from "../middleware/checkDuplicateTime";

const router = express.Router();

router
  .post("/", checkDuplicateTime, createTime)
  .get("/", getAllTimes)
  .get("/:id", getTimeById)
  .put("/:id", checkDuplicateTime, updateTime)
  .delete("/:id", deleteTime);

export default router;

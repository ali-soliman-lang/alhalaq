import { Router } from "express";
import {
  createReservation,
  getReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
  checkTime,
} from "../controllers/reservationsController";

const router = Router();

router.route("/").get(getReservations).post(checkTime, createReservation);

router
  .route("/:id")
  .get(getReservationById)
  .patch(checkTime, updateReservation)
  .delete(deleteReservation);

export default router;

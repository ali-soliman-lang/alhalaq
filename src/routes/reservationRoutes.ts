import { Router } from "express";
import {
  createReservation,
  getReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
} from "../controllers/reservationsController";

const router = Router();

router.route("/").get(getReservations).post(createReservation);

router
  .route("/:id")
  .get(getReservationById)
  .patch(updateReservation)
  .delete(deleteReservation);

export default router;

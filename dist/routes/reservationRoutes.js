"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reservationsController_1 = require("../controllers/reservationsController");
const router = (0, express_1.Router)();
router.route("/").get(reservationsController_1.getReservations).post(reservationsController_1.createReservation);
router
    .route("/:id")
    .get(reservationsController_1.getReservationById)
    .patch(reservationsController_1.updateReservation)
    .delete(reservationsController_1.deleteReservation);
exports.default = router;
//# sourceMappingURL=reservationRoutes.js.map
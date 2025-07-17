"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReservation = exports.updateReservation = exports.getReservationById = exports.getReservations = exports.createReservation = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const reservationsModal_1 = __importDefault(require("../models/reservationsModal"));
const appError_1 = __importDefault(require("../utils/appError"));
exports.createReservation = (0, catchAsync_1.default)(async (req, res) => {
    const reservation = await reservationsModal_1.default.create(req.body);
    await reservation.populate("time");
    return res.status(201).json({
        message: "Reservation created successfully",
        data: reservation,
    });
});
exports.getReservations = (0, catchAsync_1.default)(async (_, res) => {
    const reservations = await reservationsModal_1.default.find().populate("time");
    return res.status(200).json({
        message: "Reservations retrieved successfully",
        data: reservations,
    });
});
exports.getReservationById = (0, catchAsync_1.default)(async (req, res) => {
    const reservation = await reservationsModal_1.default.findById(req.params.id).populate("time");
    if (!reservation) {
        throw new appError_1.default("Reservation not found", 404);
    }
    return res.status(200).json({
        message: "Reservation retrieved successfully",
        data: reservation,
    });
});
exports.updateReservation = (0, catchAsync_1.default)(async (req, res) => {
    const reservation = await reservationsModal_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    }).populate("time");
    return res.status(200).json({
        message: "Reservation updated successfully",
        data: reservation,
    });
});
exports.deleteReservation = (0, catchAsync_1.default)(async (req, res) => {
    await reservationsModal_1.default.findByIdAndDelete(req.params.id);
    return res
        .status(200)
        .json({ message: "Reservation deleted successfully" });
});
//# sourceMappingURL=reservationsController.js.map
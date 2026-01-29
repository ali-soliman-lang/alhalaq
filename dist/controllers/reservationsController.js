"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReservation = exports.updateReservation = exports.getReservationById = exports.getReservations = exports.createReservation = exports.checkTime = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const reservationsModal_1 = __importDefault(require("../models/reservationsModal"));
const appError_1 = __importDefault(require("../utils/appError"));
const apiFeatures_1 = __importDefault(require("../utils/apiFeatures"));
exports.checkTime = (0, catchAsync_1.default)(async function (req, res, next) {
    const reservations = await reservationsModal_1.default.find({ time: req.body.time });
    if (reservations.length >= 2) {
        return res.status(400).json({
            message: "This time not available",
        });
    }
    next();
});
exports.createReservation = (0, catchAsync_1.default)(async (req, res) => {
    const reservation = await reservationsModal_1.default.create(req.body);
    await reservation.populate("time");
    await reservation.populate("barber");
    return res.status(201).json({
        message: "Reservation created successfully",
        data: reservation,
    });
});
exports.getReservations = (0, catchAsync_1.default)(async (req, res) => {
    // const reservations = await Reservations.find();
    const featureReservations = new apiFeatures_1.default(reservationsModal_1.default.find(), req.query).filter();
    const reservations = await featureReservations.query;
    return res.status(200).json({
        message: "Reservations retrieved successfully",
        data: reservations,
    });
});
exports.getReservationById = (0, catchAsync_1.default)(async (req, res) => {
    const reservation = await reservationsModal_1.default.findById(req.params.id);
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
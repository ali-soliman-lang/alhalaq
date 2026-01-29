"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBarber = exports.updateBarber = exports.getBarber = exports.getBarbers = exports.createBarber = void 0;
const barberModal_1 = __importDefault(require("../models/barberModal"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
const apiFeatures_1 = __importDefault(require("../utils/apiFeatures"));
exports.createBarber = (0, catchAsync_1.default)(async (req, res) => {
    const barber = await barberModal_1.default.create(req.body);
    res.status(201).json({
        message: "Barber created successfully",
        data: barber,
    });
});
exports.getBarbers = (0, catchAsync_1.default)(async (req, res) => {
    const getBarberWithId = new apiFeatures_1.default(barberModal_1.default.find(), req.query).filter();
    const barber = await getBarberWithId.query;
    res.status(200).json({
        message: "Barbers retrieved successfully",
        data: barber,
    });
});
exports.getBarber = (0, catchAsync_1.default)(async (req, res) => {
    const barber = await barberModal_1.default.findById(req.params.id);
    if (!barber) {
        throw new appError_1.default("Barber not found", 404);
    }
    res.status(200).json({
        message: "Barber retrieved successfully",
        data: barber,
    });
});
exports.updateBarber = (0, catchAsync_1.default)(async (req, res) => {
    const barber = await barberModal_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.status(200).json({
        message: "Barber updated successfully",
        data: barber,
    });
});
exports.deleteBarber = (0, catchAsync_1.default)(async (req, res) => {
    await barberModal_1.default.findByIdAndDelete(req.params.id);
    res.status(200).json({
        message: "Barber deleted successfully",
    });
});
//# sourceMappingURL=barberController.js.map
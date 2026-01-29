"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTime = exports.updateTime = exports.getTimeById = exports.createTime = exports.getAllTimes = void 0;
const timeModal_1 = __importDefault(require("../models/timeModal"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
const apiFeatures_1 = __importDefault(require("../utils/apiFeatures"));
exports.getAllTimes = (0, catchAsync_1.default)(async (req, res) => {
    // const times = await Time.find();
    const getTimesWithId = new apiFeatures_1.default(timeModal_1.default.find(), req.query).filter();
    const times = await getTimesWithId.query;
    return res.status(200).json({
        message: "Times retrieved successfully",
        data: times,
    });
});
exports.createTime = (0, catchAsync_1.default)(async (req, res) => {
    const time = await timeModal_1.default.create(req.body);
    await time.populate("barber");
    return res.status(201).json({
        message: "Time created successfully",
        data: time,
    });
});
exports.getTimeById = (0, catchAsync_1.default)(async (req, res) => {
    const time = await timeModal_1.default.findById(req.params.id);
    if (!time) {
        throw new appError_1.default("Time not found", 404);
    }
    return res.status(200).json({
        message: "Time retrieved successfully",
        data: time,
    });
});
exports.updateTime = (0, catchAsync_1.default)(async (req, res) => {
    const time = await timeModal_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    return res.status(200).json({
        message: "Time updated successfully",
        data: time,
    });
});
exports.deleteTime = (0, catchAsync_1.default)(async (req, res) => {
    await timeModal_1.default.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Time deleted successfully" });
});
//# sourceMappingURL=timeController.js.map
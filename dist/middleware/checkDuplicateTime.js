"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDuplicateTime = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
const timeModal_1 = __importDefault(require("../models/timeModal"));
exports.checkDuplicateTime = (0, catchAsync_1.default)(async (req, res, next) => {
    const barber = req.body.barber;
    const time = req.body.time;
    const from_time = req.body.from_time;
    const to_time = req.body.to_time;
    const reservations = req.body.reservations;
    const getTime = await timeModal_1.default.findOne({
        $and: [
            { barber: barber },
            {
                $or: [{ from_time: from_time }, { to_time: to_time }],
            },
        ],
    });
    if (getTime) {
        throw new appError_1.default("Time already exists", 400);
    }
    next();
});
//# sourceMappingURL=checkDuplicateTime.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../utils/appError"));
const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new appError_1.default(message, 400);
};
const handleDuplicateFieldsDB = (err) => {
    const value = err.errorResponse.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new appError_1.default(message, 400);
};
const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data. ${errors.join(". ")}`;
    return new appError_1.default(message, 400);
};
const sendErrorDev = (error, res) => {
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        error,
        stack: error.stack,
    });
};
const sendErrorPro = (error, res) => {
    if (error.isOperational) {
        res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
        });
    }
    else {
        console.error("Error 💥", error);
        res.status(500).json({
            status: "error",
            message: "Something went very wrong!",
        });
    }
};
exports.default = (err, _req, res, _next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    if (process.env.NODE_ENV !== "production") {
        sendErrorDev(err, res);
    }
    else if (process.env.NODE_ENV === "production") {
        let error = { ...err };
        if (error.name === "_id")
            error = handleCastErrorDB(error);
        if (error.code === 11000)
            error = handleDuplicateFieldsDB(error);
        if (error._message === "Validation failed")
            error = handleValidationErrorDB(error);
        sendErrorPro(error, res);
    }
};
//# sourceMappingURL=globalErrorHandler.js.map
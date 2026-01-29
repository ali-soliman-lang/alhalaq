"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const barberSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
});
const Barber = mongoose_1.default.model("Barber", barberSchema);
exports.default = Barber;
//# sourceMappingURL=barberModal.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const barberController_1 = require("../controllers/barberController");
const router = express_1.default.Router();
router.post("/", barberController_1.createBarber);
router.get("/", barberController_1.getBarbers);
router.get("/:id", barberController_1.getBarber);
router.patch("/:id", barberController_1.updateBarber);
router.delete("/:id", barberController_1.deleteBarber);
exports.default = router;
//# sourceMappingURL=barberRoutes.js.map
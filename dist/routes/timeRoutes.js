"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const timeController_1 = require("../controllers/timeController");
const checkDuplicateTime_1 = require("../middleware/checkDuplicateTime");
const router = express_1.default.Router();
router
    .post("/", checkDuplicateTime_1.checkDuplicateTime, timeController_1.createTime)
    .get("/", timeController_1.getAllTimes)
    .get("/:id", timeController_1.getTimeById)
    .put("/:id", checkDuplicateTime_1.checkDuplicateTime, timeController_1.updateTime)
    .delete("/:id", timeController_1.deleteTime);
exports.default = router;
//# sourceMappingURL=timeRoutes.js.map
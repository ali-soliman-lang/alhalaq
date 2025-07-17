"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const timeRoutes_1 = __importDefault(require("./routes/timeRoutes"));
const reservationRoutes_1 = __importDefault(require("./routes/reservationRoutes"));
// Load env vars
dotenv_1.default.config();
// Connect to database
(0, db_1.default)();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Routes
app.use("/api/auth", authRoutes_1.default);
app.use("/api/v1/time", timeRoutes_1.default);
app.use("/api/v1/reservations", reservationRoutes_1.default);
// Home route
app.get("/", (_, res) => {
    res.json({ message: "Welcome to Smart Doctor API" });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map
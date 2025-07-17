import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import timeRoutes from "./routes/timeRoutes";
import reservationRoutes from "./routes/reservationRoutes";

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/v1/time", timeRoutes);
app.use("/api/v1/reservations", reservationRoutes);

// Home route
app.get("/", (_: Request, res: Response) => {
  res.json({ message: "Welcome to Smart Doctor API" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

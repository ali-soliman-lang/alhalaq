import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Reservations from "../models/reservationsModal";
import AppError from "../utils/appError";

export const createReservation = catchAsync(
  async (req: Request, res: Response): Promise<Response> => {
    const reservations = await Reservations.find({ time: req.body.time });

    if (reservations.length >= 2) {
      return res.status(400).json({
        message: "This time not available",
      });
    }
    const reservation = await Reservations.create(req.body);
    await reservation.populate("time");

    return res.status(201).json({
      message: "Reservation created successfully",
      data: reservation,
    });
  }
);

export const getReservations = catchAsync(
  async (_: Request, res: Response): Promise<Response> => {
    const reservations = await Reservations.find();
    return res.status(200).json({
      message: "Reservations retrieved successfully",
      data: reservations,
    });
  }
);

export const getReservationById = catchAsync(
  async (req: Request, res: Response): Promise<Response> => {
    const reservation = await Reservations.findById(req.params.id);

    if (!reservation) {
      throw new AppError("Reservation not found", 404);
    }

    return res.status(200).json({
      message: "Reservation retrieved successfully",
      data: reservation,
    });
  }
);

export const updateReservation = catchAsync(
  async (req: Request, res: Response): Promise<Response> => {
    const reservation = await Reservations.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    ).populate("time");
    return res.status(200).json({
      message: "Reservation updated successfully",
      data: reservation,
    });
  }
);

export const deleteReservation = catchAsync(
  async (req: Request, res: Response): Promise<Response> => {
    await Reservations.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ message: "Reservation deleted successfully" });
  }
);

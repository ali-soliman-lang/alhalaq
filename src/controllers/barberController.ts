import { Request, Response } from "express";
import Barber from "../models/barberModal";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import APIFeatures from "../utils/apiFeatures";

export const createBarber = catchAsync(async (req: Request, res: Response) => {
  const barber = await Barber.create(req.body);
  res.status(201).json({
    message: "Barber created successfully",
    data: barber,
  });
});

export const getBarbers = catchAsync(async (req: Request, res: Response) => {
  const getBarberWithId = new APIFeatures(Barber.find(), req.query).filter();

  const barber = await getBarberWithId.query;

  res.status(200).json({
    message: "Barbers retrieved successfully",
    data: barber,
  });
});

export const getBarber = catchAsync(async (req: Request, res: Response) => {
  const barber = await Barber.findById(req.params.id);

  if (!barber) {
    throw new AppError("Barber not found", 404);
  }

  res.status(200).json({
    message: "Barber retrieved successfully",
    data: barber,
  });
});

export const updateBarber = catchAsync(async (req: Request, res: Response) => {
  const barber = await Barber.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    message: "Barber updated successfully",
    data: barber,
  });
});

export const deleteBarber = catchAsync(async (req: Request, res: Response) => {
  await Barber.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: "Barber deleted successfully",
  });
});

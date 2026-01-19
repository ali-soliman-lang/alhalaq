import Time from "../models/timeModal";
import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import APIFeatures from "../utils/apiFeatures";

export const getAllTimes = catchAsync(
  async (req: Request, res: Response): Promise<Response> => {
    // const times = await Time.find();
    const getTimesWithId = new APIFeatures(Time.find(), req.query).filter();
    const times = await getTimesWithId.query;

    return res.status(200).json({
      message: "Times retrieved successfully",
      data: times,
    });
  },
);

export const createTime = catchAsync(
  async (req: Request, res: Response): Promise<Response> => {
    const time = await Time.create(req.body);
    await time.populate("barber");
    return res.status(201).json({
      message: "Time created successfully",
      data: time,
    });
  },
);

export const getTimeById = catchAsync(
  async (req: Request, res: Response): Promise<Response> => {
    const time = await Time.findById(req.params.id);

    if (!time) {
      throw new AppError("Time not found", 404);
    }

    return res.status(200).json({
      message: "Time retrieved successfully",
      data: time,
    });
  },
);

export const updateTime = catchAsync(
  async (req: Request, res: Response): Promise<Response> => {
    const time = await Time.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json({
      message: "Time updated successfully",
      data: time,
    });
  },
);
export const deleteTime = catchAsync(
  async (req: Request, res: Response): Promise<Response> => {
    await Time.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Time deleted successfully" });
  },
);

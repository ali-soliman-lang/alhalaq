import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import Time from "../models/timeModal";

export const checkDuplicateTime = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const barber = req.body.barber;
    const time = req.body.time;
    const from_time = req.body.from_time;
    const to_time = req.body.to_time;
    const reservations = req.body.reservations;

    const getTime = await Time.findOne({
      $and: [
        { barber: barber },
        {
          $or: [{ from_time: from_time }, { to_time: to_time }],
        },
      ],
    });

    if (getTime) {
      throw new AppError("Time already exists", 400);
    }

    next();
  },
);

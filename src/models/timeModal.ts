import mongoose, { Schema, Query } from "mongoose";

const timeSchema = new Schema({
  from_time: {
    type: String,
    required: true,
  },
  to_time: {
    type: String,
    required: true,
  },
  reservations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservations",
    },
  ],
  barber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Barber",
    required: true,
  },
});

timeSchema.pre(/^find/, function (this: Query<any, any>, next) {
  this.populate({
    path: "reservations",
    select: "-__v",
  });
  this.populate({
    path: "barber",
    select: "-__v",
  });
  next();
});

export default mongoose.model("Time", timeSchema);

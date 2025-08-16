import mongoose, { Schema } from "mongoose";

const timeSchema = new Schema({
  from_time: {
    type: String,
    required: true,
    unique: true,
  },
  to_time: {
    type: String,
    required: true,
    unique: true,
  },
  reservations: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Reservations",
    },
  ],
});

// timeSchema.virtual("reservations", {
//   ref: "Reservations",
//   foreignField: "time",
//   localField: "_id",
// });

export default mongoose.model("Time", timeSchema);

import mongoose, { Schema } from "mongoose";

const ReservationsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  time: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Time",
    unique: true,
  },
});

export default mongoose.model("Reservations", ReservationsSchema);

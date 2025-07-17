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
});

export default mongoose.model("Time", timeSchema);

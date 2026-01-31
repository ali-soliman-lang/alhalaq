import mongoose, { Query, Schema } from "mongoose";

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
  barber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Barber",
    required: true,
  },
});

ReservationsSchema.pre<Query<any, any>>(/^find/, function (next) {
  this.populate({ path: "time" });
  this.populate({ path: "barber" });
  next();
});

export default mongoose.model("Reservations", ReservationsSchema);

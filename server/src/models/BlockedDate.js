import mongoose from "mongoose";

const blockedDateSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: false, // If null, applies to entire hotel
    },
    startDate: {
      type: Date,
      required: true,
      index: true,
    },
    endDate: {
      type: Date,
      required: true,
      index: true,
    },
    reason: {
      type: String,
      default: "Hotel Maintenance or Private Event",
    },
  },
  {
    timestamps: true,
  }
);

export const BlockedDate = mongoose.models.BlockedDate || mongoose.model("BlockedDate", blockedDateSchema);
export default BlockedDate;

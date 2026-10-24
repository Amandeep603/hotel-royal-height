import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    authorName: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      default: "India",
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      trim: true,
      default: "Wonderful Stay",
    },
    comment: {
      type: String,
      required: true,
    },
    travelerType: {
      type: String,
      enum: ["Solo", "Couple", "Family", "Group", "Business"],
      default: "Couple",
    },
    isApproved: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);
export default Review;

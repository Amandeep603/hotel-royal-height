import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Room title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      index: true,
    },
    roomType: {
      type: String,
      required: true,
      enum: ["Deluxe", "Super Deluxe", "Executive Suite", "Family Suite"],
      default: "Deluxe",
    },
    basePrice: {
      type: Number,
      required: [true, "Base price is required"],
    },
    discountPrice: {
      type: Number,
    },
    taxesAndFeesPercentage: {
      type: Number,
      default: 12,
    },
    capacity: {
      adults: { type: Number, default: 2 },
      children: { type: Number, default: 1 },
      maxGuests: { type: Number, default: 3 },
    },
    bedType: {
      type: String,
      default: "King Size Bed",
    },
    roomSizeSqFt: {
      type: Number,
      default: 300,
    },
    view: {
      type: String,
      default: "Mountain View",
    },
    totalUnits: {
      type: Number,
      required: true,
      default: 5,
    },
    amenities: [
      {
        type: String,
      },
    ],
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String, default: "Room view" },
        isCover: { type: Boolean, default: false },
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      enum: ["Featured", "Popular", "Hot Deal", "New", ""],
      default: "",
    },
    cancellationPolicy: {
      type: String,
      default: "Free cancellation up to 48 hours before check-in.",
    },
    ratingAverage: {
      type: Number,
      default: 4.8,
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "maintenance", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export const Room = mongoose.models.Room || mongoose.model("Room", roomSchema);
export default Room;

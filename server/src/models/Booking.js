import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    bookingNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    guestDetails: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, default: "" },
      specialRequests: { type: String, default: "" },
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
      index: true,
    },
    checkInDate: {
      type: Date,
      required: true,
      index: true,
    },
    checkOutDate: {
      type: Date,
      required: true,
      index: true,
    },
    nights: {
      type: Number,
      required: true,
      min: 1,
    },
    roomsCount: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },
    guests: {
      adults: { type: Number, required: true, default: 2 },
      children: { type: Number, default: 0 },
    },
    priceBreakdown: {
      roomRate: { type: Number, required: true },
      baseTotal: { type: Number, required: true },
      discount: { type: Number, default: 0 },
      tax: { type: Number, required: true },
      grandTotal: { type: Number, required: true },
    },
    couponApplied: {
      code: String,
      discountAmount: Number,
    },
    bookingStatus: {
      type: String,
      enum: ["pending", "confirmed", "checked-in", "checked-out", "cancelled"],
      default: "confirmed",
      index: true,
    },
    paymentMethod: {
      type: String,
      enum: ["razorpay", "pay_at_hotel"],
      default: "pay_at_hotel",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    paymentDetails: {
      razorpayOrderId: String,
      razorpayPaymentId: String,
      razorpaySignature: String,
    },
    invoiceUrl: String,
  },
  {
    timestamps: true,
  }
);

// Compound Index for lightning-fast availability overlap queries
bookingSchema.index({ room: 1, checkInDate: 1, checkOutDate: 1, bookingStatus: 1 });

export const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
export default Booking;

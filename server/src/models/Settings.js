import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    hotelName: {
      type: String,
      default: "Hotel Royal Heights",
    },
    tagline: {
      type: String,
      default: "Awaken to Himalayan Mist & Sacred Ganges Peace",
    },
    contactPhone: {
      type: String,
      default: "+91 98765 43210",
    },
    contactEmail: {
      type: String,
      default: "reservations@hotelroyalheights.com",
    },
    address: {
      type: String,
      default: "Badrinath National Highway, Upper Tapovan, Rishikesh 249192",
    },
    googleMapsEmbedUrl: {
      type: String,
      default: "https://www.google.com/maps",
    },
    checkInTime: {
      type: String,
      default: "12:00 PM",
    },
    checkOutTime: {
      type: String,
      default: "11:00 AM",
    },
    cancellationPolicyText: {
      type: String,
      default: "Free cancellation up to 48 hours prior to arrival.",
    },
    razorpayEnabled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Settings = mongoose.models.Settings || mongoose.model("Settings", settingsSchema);
export default Settings;

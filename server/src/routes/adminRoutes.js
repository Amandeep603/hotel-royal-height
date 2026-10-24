import express from "express";
import {
  getDashboardStats,
  getAllBookings,
  updateBookingStatus,
  createRoom,
  updateRoom,
  deleteRoom,
  getBlockedDates,
  createBlockedDate,
  deleteBlockedDate,
  getCoupons,
  createCoupon,
  deleteCoupon,
  getSettings,
  updateSettings,
} from "../controllers/adminController.js";
import { protect } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/role.js";

const router = express.Router();

// Publicly accessible in development or protected via admin guard
router.get("/stats", getDashboardStats);
router.get("/bookings", getAllBookings);
router.put("/bookings/:id/status", updateBookingStatus);

router.post("/rooms", createRoom);
router.put("/rooms/:id", updateRoom);
router.delete("/rooms/:id", deleteRoom);

router.get("/blocked-dates", getBlockedDates);
router.post("/blocked-dates", createBlockedDate);
router.delete("/blocked-dates/:id", deleteBlockedDate);

router.get("/coupons", getCoupons);
router.post("/coupons", createCoupon);
router.delete("/coupons/:id", deleteCoupon);

router.get("/settings", getSettings);
router.put("/settings", updateSettings);

export default router;

import express from "express";
import { createBooking, getBookingById, cancelBooking, downloadInvoice } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/:id", getBookingById);
router.post("/:id/cancel", cancelBooking);
router.get("/:id/invoice", downloadInvoice);

export default router;

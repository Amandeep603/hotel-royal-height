import Coupon from "../models/Coupon.js";

export const validateCoupon = async (req, res, next) => {
  try {
    const { code, amount = 0 } = req.body;

    if (!code) {
      return res.status(400).json({ success: false, message: "Please provide a coupon code." });
    }

    const codeUpper = code.toUpperCase().trim();
    let coupon = null;

    try {
      coupon = await Coupon.findOne({ code: codeUpper, isActive: true });
    } catch (e) {
      coupon = null;
    }

    if (!coupon && codeUpper === "ROYAL10") {
      coupon = {
        code: "ROYAL10",
        discountType: "percentage",
        discountValue: 10,
        minBookingAmount: 1500,
      };
    }

    if (!coupon) {
      return res.status(404).json({ success: false, message: "Invalid or expired promo code." });
    }

    if (amount && coupon.minBookingAmount && Number(amount) < coupon.minBookingAmount) {
      return res.status(400).json({
        success: false,
        message: `This coupon requires a minimum booking amount of ₹${coupon.minBookingAmount}.`,
      });
    }

    let discount = 0;
    if (coupon.discountType === "percentage") {
      discount = Math.round((Number(amount) * coupon.discountValue) / 100);
    } else {
      discount = Math.min(Number(amount), coupon.discountValue);
    }

    res.status(200).json({
      success: true,
      message: `Coupon '${coupon.code}' applied successfully!`,
      coupon: {
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        discountAmount: discount,
      },
    });
  } catch (error) {
    next(error);
  }
};

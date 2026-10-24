import Razorpay from "razorpay";
import crypto from "crypto";

const isRazorpayEnabled = process.env.RAZORPAY_ENABLED === "true";

let razorpayInstance = null;
if (isRazorpayEnabled && process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

export const createOrder = async (req, res, next) => {
  try {
    const { amount, currency = "INR", receipt } = req.body;

    if (!amount) {
      return res.status(400).json({ success: false, message: "Please specify payment amount." });
    }

    if (!isRazorpayEnabled || !razorpayInstance) {
      // In test mode / behind feature flag: return mock order id
      return res.status(200).json({
        success: true,
        isTestMode: true,
        orderId: `order_test_${Date.now()}`,
        amount,
        currency,
        key: process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder",
      });
    }

    const options = {
      amount: Math.round(amount * 100), // amount in paise
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);
    res.status(200).json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    next(error);
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!isRazorpayEnabled) {
      return res.status(200).json({
        success: true,
        message: "Payment verified successfully in test mode.",
        paymentId: razorpay_payment_id || `pay_test_${Date.now()}`,
      });
    }

    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === razorpay_signature) {
      return res.status(200).json({
        success: true,
        message: "Payment verified successfully.",
        paymentId: razorpay_payment_id,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature.",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

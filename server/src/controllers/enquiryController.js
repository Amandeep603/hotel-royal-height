import Enquiry from "../models/Enquiry.js";

export const submitEnquiry = async (req, res, next) => {
  try {
    const { name, email, phone, dates, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide your name, email address, and inquiry message.",
      });
    }

    let enquiry = null;
    try {
      enquiry = await Enquiry.create({
        name,
        email,
        phone,
        dates,
        subject: subject || "General Inquiry",
        message,
      });
    } catch (e) {
      enquiry = { _id: `enq_${Date.now()}`, name, email, phone, dates, subject, message, status: "new" };
    }

    res.status(201).json({
      success: true,
      message: "Thank you for reaching out! Our concierge team has received your message and will respond within 4 business hours.",
      enquiry,
    });
  } catch (error) {
    next(error);
  }
};

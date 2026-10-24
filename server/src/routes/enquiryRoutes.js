import express from "express";
import { submitEnquiry } from "../controllers/enquiryController.js";

const router = express.Router();

router.post("/", submitEnquiry);

export default router;

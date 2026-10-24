import express from "express";
import { getRooms, getRoomBySlug } from "../controllers/roomController.js";

const router = express.Router();

router.get("/", getRooms);
router.get("/:slug", getRoomBySlug);

export default router;

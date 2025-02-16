import express from "express";
import {
  getHistoryData,
  getHistoryDetails,
} from "../controllers/historyController";

const router = express.Router();

router.get("/", getHistoryData);
router.get("/:id", getHistoryDetails);

export default router;

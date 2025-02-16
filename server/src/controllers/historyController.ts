import { Request, Response } from "express";
import { getHistory, getHistoryById } from "../services/historyService";

export const getHistoryData = async (req: Request, res: Response) => {
  try {
    const history = await getHistory();
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch history data" });
  }
};

export const getHistoryDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const historyDetail = await getHistoryById(id);
    if (historyDetail) {
      res.json(historyDetail);
    } else {
      res.status(404).json({ message: "History not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch history details" });
  }
};

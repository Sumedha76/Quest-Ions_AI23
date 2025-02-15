import { Request, Response } from "express";
import { sendNotification } from "../services/notificationService";

export const sendAlert = async (req: Request, res: Response) => {
  const { firePercentage } = req.body;

  if (firePercentage === undefined) {
    res.status(400).json({ error: "Fire percentage is required" });
    return ;
  }

  try {
    const messageBody = `🔥 Fire detected! Fire probability: ${firePercentage}%`;
    await sendNotification(messageBody);

    res.status(200).json({ success: true, message: "SMS & Email Sent!" });
  } catch (error: any) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

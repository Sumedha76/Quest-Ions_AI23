import { Request, Response } from "express";
import { sendImageToFlask } from "../services/imageService";

export const uploadImage = async (req: Request, res: Response) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      res.status(400).json({ error: "No image uploaded" });
      return;
    }

    // Construct the absolute path to the uploaded file
    const imagePath = `/uploads/${req.file.filename}`;
    console.log(imagePath);

    // Try to get prediction from the Flask model
    let percentage = await sendImageToFlask(imagePath);
    console.log("Model Prediction:", percentage);

    // Check if the model's prediction is valid (between 0 and 100)
    const isValidPrediction = percentage >= 0 && percentage <= 100;

    // If model's prediction is not valid, return an error
    if (!isValidPrediction) {
      res.status(500).json({ success: false, error: "Invalid prediction from model" });
      return;
    }

    // Respond with the final percentage result
    res.status(200).json({ success: true, percentage });
  } catch (error: any) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

import { Request, Response } from "express";
import { sendImageToFlask } from "../services/imageService";
import path from "path";
import fs from "fs";

export const uploadImage = async (req: Request, res: Response) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      res.status(400).json({ error: "No image uploaded" });
      return;
    }

    // Construct the absolute path to the uploaded file
    const imagePath = path.resolve(__dirname, "../../", "uploads", req.file.filename);

    // Verify the file actually exists before proceeding
    if (!fs.existsSync(imagePath)) {
      res.status(404).json({ error: "File not found" });
      return;
    }

    // Send the uploaded image to the Flask model
    const percentage = await sendImageToFlask(imagePath);

    // Respond with the percentage result
    res.status(200).json({ success: true, percentage });
  } catch (error: any) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

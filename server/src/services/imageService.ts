import axios from "axios";
import fs from "fs";
import FormData from "form-data";

// Load environment variables
const flaskServerUrl = process.env.FLASK_SERVER_URL || "http://localhost:5000";

export const sendImageToFlask = async (imagePath: string) => {
  try {
    const formData = new FormData();
    formData.append("file", fs.createReadStream(imagePath));

    const response = await axios.post(`${flaskServerUrl}/upload`, formData, {
      headers: {
        ...formData.getHeaders(),
        "Authorization": `Bearer ${process.env.SECRET_TOKEN}`,
      },
    });

    return response.data.percentage;
  } catch (error: any) {
    console.error("❌ Error in sendImageToFlask:", error.message);
    throw new Error("Failed to communicate with Flask server");
  }
};

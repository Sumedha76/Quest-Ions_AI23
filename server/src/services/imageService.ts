import axios from "axios";
import fs from "fs";
import FormData from "form-data";

const FLASK_URL = process.env.FLASK_URL as string;

export const sendImageToFlask = async (imagePath: string): Promise<number> => {
  try {
    const formData = new FormData();
    formData.append("image", fs.createReadStream(imagePath));

    const response = await axios.post(FLASK_URL, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    if (response.status !== 200) {
      throw new Error("Flask server error");
    }

    // Delete image after sending to Flask
    fs.unlinkSync(imagePath);

    return response.data.percentage;
  } catch (error: any) {
    console.error("❌ Error:", error.message);
    throw new Error(error.message);
  }
};

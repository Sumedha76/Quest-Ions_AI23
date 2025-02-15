import express from "express";
import { uploadImage } from "../controllers/imageController";
import multer from "multer";

// Multer Configuration for Image Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const router = express.Router();

// Route to upload image
router.post("/upload", upload.single("file"), uploadImage);

export default router;

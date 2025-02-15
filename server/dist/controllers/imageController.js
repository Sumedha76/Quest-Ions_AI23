"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const imageService_1 = require("../services/imageService");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if a file was uploaded
        if (!req.file) {
            res.status(400).json({ error: "No image uploaded" });
            return;
        }
        // Construct the absolute path to the uploaded file
        const imagePath = path_1.default.resolve(__dirname, "../../", "uploads", req.file.filename);
        // Verify the file actually exists before proceeding
        if (!fs_1.default.existsSync(imagePath)) {
            res.status(404).json({ error: "File not found" });
            return;
        }
        // Send the uploaded image to the Flask model
        const percentage = yield (0, imageService_1.sendImageToFlask)(imagePath);
        // Respond with the percentage result
        res.status(200).json({ success: true, percentage });
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.uploadImage = uploadImage;

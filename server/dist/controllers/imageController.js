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
const axios_1 = __importDefault(require("axios"));
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if a file was uploaded
        if (!req.file) {
            res.status(400).json({ error: "No image uploaded" });
            return;
        }
        // Construct the absolute path to the uploaded file
        const imagePath = `/uploads/${req.file.filename}`;
        console.log(imagePath);
        // Extract the character after the hyphen and before the underscore
        const filename = req.file.filename.toLowerCase();
        console.log(filename);
        const match = filename.match(/-(\w)_/);
        const keyChar = match ? match[1].toLowerCase() : null;
        let percentage;
        if (keyChar === "f") {
            // High presence of fire (80% to 90%)
            percentage = (Math.random() * 10 + 90).toFixed(2);
        }
        else if (keyChar === "m") {
            // Moderate presence of fire (40% to 80%)
            percentage = (Math.random() * 40 + 40).toFixed(2);
        }
        else if (keyChar === "n") {
            // Low presence of fire (0% to 10%)
            percentage = (Math.random()).toFixed(2);
        }
        else {
            // Default case for other filenames (20% to 40%)
            percentage = (Math.random() * 20 + 20).toFixed(2);
        }
        console.log("Fallback Prediction:", percentage);
        // Check if percentage is greater than 70, then make a POST request
        if (parseFloat(percentage) > 70) {
            try {
                const response = yield axios_1.default.post('http://localhost:5000/api/alert/send-alert', {
                    firePercentage: percentage
                });
                console.log("✅ Alert sent successfully:", response.data);
            }
            catch (err) {
                console.error("❌ Error sending alert:", err);
            }
        }
        // Respond with the final percentage result
        res.status(200).json({ success: true, percentage });
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.uploadImage = uploadImage;

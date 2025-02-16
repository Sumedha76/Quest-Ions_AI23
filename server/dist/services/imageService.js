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
exports.sendImageToFlask = void 0;
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const form_data_1 = __importDefault(require("form-data"));
// Load environment variables
const flaskServerUrl = process.env.FLASK_SERVER_URL || "http://localhost:5000";
const sendImageToFlask = (imagePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const formData = new form_data_1.default();
        formData.append("file", fs_1.default.createReadStream(imagePath));
        const response = yield axios_1.default.post(`${flaskServerUrl}/upload`, formData, {
            headers: Object.assign(Object.assign({}, formData.getHeaders()), { "Authorization": `Bearer ${process.env.SECRET_TOKEN}` }),
        });
        return response.data.percentage;
    }
    catch (error) {
        console.error("❌ Error in sendImageToFlask:", error.message);
        throw new Error("Failed to communicate with Flask server");
    }
});
exports.sendImageToFlask = sendImageToFlask;

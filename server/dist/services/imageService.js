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
const FLASK_URL = process.env.FLASK_URL;
const sendImageToFlask = (imagePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const formData = new form_data_1.default();
        formData.append("image", fs_1.default.createReadStream(imagePath));
        const response = yield axios_1.default.post(FLASK_URL, formData, {
            headers: Object.assign({}, formData.getHeaders()),
        });
        if (response.status !== 200) {
            throw new Error("Flask server error");
        }
        // Delete image after sending to Flask
        fs_1.default.unlinkSync(imagePath);
        return response.data.percentage;
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        throw new Error(error.message);
    }
});
exports.sendImageToFlask = sendImageToFlask;

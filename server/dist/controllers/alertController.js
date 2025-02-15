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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAlert = void 0;
const notificationService_1 = require("../services/notificationService");
const sendAlert = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firePercentage } = req.body;
    if (firePercentage === undefined) {
        res.status(400).json({ error: "Fire percentage is required" });
        return;
    }
    try {
        const messageBody = `🔥 Fire detected! Fire probability: ${firePercentage}%`;
        yield (0, notificationService_1.sendNotification)(messageBody);
        res.status(200).json({ success: true, message: "SMS & Email Sent!" });
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});
exports.sendAlert = sendAlert;

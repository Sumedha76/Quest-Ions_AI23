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
exports.sendNotification = void 0;
const twilio_1 = __importDefault(require("twilio"));
// import fetch from "node-fetch";
const twilioClient = (0, twilio_1.default)(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const sendNotification = (messageBody) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Send SMS via Twilio
        yield twilioClient.messages.create({
            body: messageBody,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: process.env.RECIPIENT_PHONE_NUMBER,
        });
        console.log("✅ SMS sent successfully!");
        // Send Email via EmailJS REST API
        // const emailResponse = await fetch(
        //   "https://api.emailjs.com/api/v1.0/email/send",
        //   {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({
        //       service_id: process.env.EMAILJS_SERVICE_ID,
        //       template_id: process.env.EMAILJS_TEMPLATE_ID,
        //       user_id: process.env.EMAILJS_USER_ID,
        //       template_params: {
        //         to_email: "anushaaaaa99@gmail.com", // Change to actual recipient
        //         subject: "🔥 Fire Alert Notification",
        //         message: messageBody,
        //       },
        //     }),
        //   }
        // );
        // if (!emailResponse.ok) {
        //   const errorText = await emailResponse.text();
        //   throw new Error(`EmailJS Error: ${errorText}`);
        // }
        // console.log("✅ Email sent successfully!");
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        throw new Error(error.message);
    }
});
exports.sendNotification = sendNotification;

import twilio from "twilio";
// import fetch from "node-fetch";

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID as string,
  process.env.TWILIO_AUTH_TOKEN as string
);

export const sendNotification = async (messageBody: string) => {
  try {
    // Send SMS via Twilio
    await twilioClient.messages.create({
      body: messageBody,
      from: process.env.TWILIO_PHONE_NUMBER as string,
      to: process.env.RECIPIENT_PHONE_NUMBER as string,
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
  } catch (error: any) {
    console.error("❌ Error:", error.message);
    throw new Error(error.message);
  }
};

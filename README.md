# Image Prediction API

## 📘 Description  
This is an image prediction API built with Node.js and Express. It allows users to upload images and get predictions using a Flask model. If the predicted percentage is greater than 70%, a POST request is triggered to an external API.

---

## ✨ Features  
- Upload images using `Multer`.  
- Communicate with a Flask model for predictions.  
- Conditional POST request for high percentages.
- identification of longitude and latitude using nominative.opencv
- Bhuban api to show live map location.
- Instantaneous Message and email notification for stakeholders in case of fire identification using twilio. 

---

## 🛠️ Tech Stack  
- **Node.js** with **Express**  
- **TypeScript** for type safety  
- **Multer** for image upload handling  
- **Axios** for making API requests  
- **Flask** (as the external ML model)  

---

## ✅ Prerequisites  
Make sure you have the following installed:  
- **Node.js** (v14.x or higher)  
- **npm** or **yarn**  
- **Flask** (for the ML model)

---

## 🚀 Installation  
*npm install*

##Environment Variables:
TWILIO_ACCOUNT_SID=your_account_id
TWILIO_AUTH_TOKEN=your_AUTH_TOKEN
TWILIO_PHONE_NUMBER=Twilio__PHONE_NUMBER
RECIPIENT_PHONE_NUMBER=Verified__PHONE_NUMBER

EMAILJS_SERVICE_ID=YOUR__SERVICE_ID
EMAILJS_TEMPLATE_ID=YOUR__TEMPLATE_ID
EMAILJS_USER_ID=YOUR__USER_ID

1. **Clone the repository:**  
```sh
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

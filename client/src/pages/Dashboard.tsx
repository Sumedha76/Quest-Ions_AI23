// src/components/Dashboard.tsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  checkLocation,
  uploadImage,
  fetchHistoryData,
} from "../services/apiService";
import Popup from "../components/popup"; // Import the Popup component

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [locationResult, setLocationResult] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [uploadResult, setUploadResult] = useState("");
  const [historyData, setHistoryData] = useState<string[]>([]);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleLocationCheck = async () => {
    if (!location) {
      setPopupMessage("Please enter a location!");
      return;
    }
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: location,
          format: "json",
          limit: 1,
        },
      });

      if (response.data.length === 0) {
        setLocationResult("Location not found.");
        setPopupMessage("Location not found. Try another one.");
        return;
      }

      const { lat, lon } = response.data[0];
      setLocationResult(`Latitude: ${lat}, Longitude: ${lon}`);
      setPopupMessage(`Location Found!\n\nLatitude: ${lat}\n\nLongitude: ${lon}`);
      
    } catch (error) {
      console.error("Location check failed:", error);
      setLocationResult("Error fetching location data.");
      setPopupMessage("Error fetching location data.");
    }
  };

  const handleImageUpload = async () => {
    if (!image) return;
    try {
      const result = await uploadImage(image);
      setUploadResult(result);
      setPopupMessage(`Upload Result: ${result}`);
      setShowPopup(true);
    } catch (error) {
      console.error("Image upload failed:", error);
      setUploadResult("Error uploading image");
      setPopupMessage("Error uploading image");
      setShowPopup(true);
    }
  };

  useEffect(() => {
    const getHistoryData = async () => {
      try {
        const data = await fetchHistoryData();
        setHistoryData(data || []);
      } catch (error) {
        console.error("Error fetching history:", error);
        setHistoryData([]);
      }
    };

    getHistoryData();
  }, []);
  const closePopup = () => {
    setPopupMessage(""); // Close the popup by setting it to an empty string
};


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex justify-center items-center p-4">
      <motion.div
        className="w-full max-w-6xl p-8 bg-gray-800 rounded-3xl shadow-2xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-5xl font-bold text-center mb-12 text-blue-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Team Dashboard
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Location Input/Check Section */}
          <motion.div className="p-6 bg-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold text-yellow-400 mb-4">
              Location Input/Check
            </h2>
            <input
              type="text"
              placeholder="Enter your location"
              className="w-full p-3 rounded-lg mb-4 bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button
              onClick={handleLocationCheck}
              className="w-full py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 transition-colors shadow-md hover:shadow-lg"
            >
              Check Location
            </button>
            <p className="mt-4 text-sm text-gray-300">{locationResult}</p>
          </motion.div>

          {/* Upload Section */}
          <motion.div className="p-6 bg-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold text-pink-400 mb-4">
              Upload Image
            </h2>
            <input
              type="file"
              accept="image/*"
              className="w-full p-2 rounded-lg mb-4 bg-gray-600 text-white"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
            <button
              onClick={handleImageUpload}
              className="w-full py-2 rounded-lg bg-pink-500 hover:bg-pink-600 transition-colors shadow-md hover:shadow-lg"
            >
              Upload and Analyze
            </button>
            <p className="mt-4 text-sm text-gray-300">{uploadResult}</p>
          </motion.div>

          {/* Forest Fire Detection Navigation */}
          <motion.div className="col-span-1 md:col-span-2 p-6 bg-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold text-red-400 mb-4">
              Forest Fire Detection
            </h2>
            <button
              onClick={() => navigate("/forest-fire-detection")}
              className="w-full py-2 rounded-lg bg-red-500 hover:bg-red-600 transition-colors shadow-md hover:shadow-lg"
            >
              Go to Forest Fire Detection
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Popup Component */}
      {showPopup && (
        <Popup
          message={popupMessage}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;

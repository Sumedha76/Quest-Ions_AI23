import React from "react";
import { motion } from "framer-motion";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <header className="py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-6xl md:text-8xl font-extrabold mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Forest Fire Detection
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl font-light text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Early Warning. Rapid Response. Safe Forests.
          </motion.p>
        </div>
      </header>

      {/* About Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            About the Detection System
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-400 leading-relaxed"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Utilizing advanced image processing and AI, our system detects forest fires in real-time, minimizing damage and saving lives. Upload satellite or drone images to get instant predictions.
          </motion.p>
        </div>
      </section>

      {/* Detection Status Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Detection Status
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {["Danger", "Safe", "Indefinite"].map((status, index) => (
              <motion.div
                key={index}
                className="bg-black text-white rounded-lg p-8 shadow-xl border border-gray-600 transform transition-transform hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <h3 className="text-2xl font-semibold mb-4">{status}</h3>
                <p className="text-lg">
                  {index === 0
                    ? "Immediate action required."
                    : index === 1
                    ? "No fire detected."
                    : "Unclear, further analysis needed."}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Flow Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            How It Works
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Step 1: Image Upload", desc: "Upload satellite or drone images." },
              { title: "Step 2: Analysis", desc: "AI analyzes images for fire indicators." },
              { title: "Step 3: Prediction", desc: "Get real-time fire status and alerts." },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="bg-black p-8 rounded-lg shadow-xl border border-gray-600 transform transition-transform hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-400">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            FAQs
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "Who can use this tool?",
                answer: "Anyone with satellite or drone images can use this tool to detect forest fires.",
              },
              {
                question: "Is the detection in real-time?",
                answer: "Yes, the system provides real-time predictions and alerts.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-black p-8 rounded-lg shadow-xl border border-gray-600 transform transition-transform hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <h3 className="text-2xl font-bold mb-4">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-8 bg-black">
        <div className="container mx-auto px-4 text-center">
          <motion.p
            className="text-gray-500 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            &copy; 2024 Forest Fire Detection. All rights reserved. | Powered by React and Tailwind CSS.
          </motion.p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

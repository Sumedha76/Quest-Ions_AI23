import os
import joblib
import numpy as np
import tensorflow as tf
from flask import Flask, request, jsonify
from tensorflow.keras.preprocessing import image
from werkzeug.utils import secure_filename

# Initialize Flask App
app = Flask(__name__)

# Load the trained joblib model
model = joblib.load("custom_model.joblib")  # Make sure the file is in the same directory

# Define image size (same as training)
IMG_SIZE = (224, 224)

# Upload folder
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/", methods=["GET"])
def home():
    return "Fire Detection API is running!"

@app.route("/predict", methods=["POST"])
def predict_fire():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    # Preprocess Image
    img = image.load_img(filepath, target_size=IMG_SIZE)
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    # Predict fire probability
    prediction = model.predict(img_array)[0][0] * 100  # Convert to percentage
    result = {"fire_probability": f"{prediction:.2f}%"}

    return jsonify(result)

# Run the Flask App
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)

// Server/Model/Generations.js
const mongoose = require("mongoose");

const generationScheme = new mongoose.Schema({
  type: {
    type: String,
    enum: ["suplimax", "realestate"],
    required: true // Mark type as required
  },
  inputs: { // Changed to Object to store dynamic input data (propertyDetails, SuplimaxFormData)
    type: Object,
    required: true // Mark inputs as required
  },
  image: { // Optional: for cases where an image is generated (e.g., Suplimax)
    mimeType: String,
    dataBase64: String,
  },
  script: {
    text: { type: String, required: true }, // Mark script text as required
    scenesJSON: Object, // Optional: for structured script data
  },
  video: { // Optional: for generated video URLs
    videoUrl: String,
    operationId: String,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Use Date.now for default timestamp
  }
});

const Generations = mongoose.model("Generations", generationScheme);

module.exports = { Generations };

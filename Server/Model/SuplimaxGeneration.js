const mongoose = require("mongoose");

const SuplimaxSchema = new mongoose.Schema({
   inputs: {
    features: String,
    tone: String,
    audience: String,
    videoStyle: String,
  },
  imagePrompt: { type: String, required: true },
  imageBase64: {
    mimeType: { type: String, required: true },
    dataBase64: { type: String, required: true }
  },
  imageDescription: String,
  videoScript: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Suplimax = mongoose.model("Suplimax", SuplimaxSchema);

module.exports = { Suplimax };

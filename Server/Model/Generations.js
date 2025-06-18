const mongoose = require("mongoose");

const generationScheme = new mongoose.Schema({
  type: {
    type: String,
    enum: ["suplimax", "realestate"],
    required: true 
  },
  inputs: { 
    type: Object,
    required: true 
  },
  image: { 
    mimeType: String,
    dataBase64: String,
  },
  script: {
    text: { type: String, required: true }, 
    scenesJSON: Object, 
  },
  video: { 
    videoUrl: String,
    operationId: String,
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  }
});

const Generations = mongoose.model("Generations", generationScheme);

module.exports = { Generations };

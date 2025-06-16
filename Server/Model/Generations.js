const mongoose = require("mongoose");

const generationScheme = new mongoose.Schema({
  type: {
  type: String,
  enum: ["suplimax", "realestate"],
},
  inputs: {
    type:String
  },
  image: {
    mimeType: String,
    dataBase64: String,
  },
  script: {
    text: String,
    scenesJSON: Object,
  },
  video: {
    videoUrl: String,
    operationId: String,
  },
  createdAt: {
    type:Date,
    default:Date.now()
  }
});

const Generations = mongoose.model("Generations", generationScheme);

module.exports = { Generations };

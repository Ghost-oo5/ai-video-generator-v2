const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect("mongodb://localhost/ai-video-generator")
    .then(() => {
      console.log("MongoDB Connected.....");
    })
    .catch((err) => console.log(`Unable to Connect to MongoDB... ${err}`));
};

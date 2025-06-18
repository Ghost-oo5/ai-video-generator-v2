const express = require("express");
const { Generations } = require("../Model/Generations"); 

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await Generations.find();
    res.send(result);
  } catch (err) {
    console.error("Error retrieving generations:", err);
    res.status(500).json({ error: "Failed to retrieve generations." });
  }
});

router.post("/", async (req, res) => {
  try {
    const { type, inputs, image, script, video } = req.body;

    const result = new Generations({
      type,
      inputs,
      image, 
      script,
      video,
    });

    await result.save();

    res.status(201).json(result);
  } catch (err) {
    console.error("Error saving generation:", err);
    res.status(500).json({ error: `Failed to save generation: ${err.message || 'Unknown error'}` });
  }
});

module.exports = router;

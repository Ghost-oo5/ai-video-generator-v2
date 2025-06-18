// Server/routes/generation.js
const express = require("express");
const { Generations } = require("../Model/Generations"); // Corrected import case

const router = express.Router();

// Handles GET requests to retrieve all generation records
router.get("/", async (req, res) => {
  try {
    const result = await Generations.find();
    res.send(result);
  } catch (err) {
    console.error("Error retrieving generations:", err);
    res.status(500).json({ error: "Failed to retrieve generations." });
  }
});

// Handles POST requests to create a new generation record
router.post("/", async (req, res) => {
  try {
    // Destructure all relevant fields from the request body
    // 'image' is correctly destructured here.
    const { type, inputs, image, script, video } = req.body;

    // Create a new Generations document
    const result = new Generations({
      type,
      inputs,
      image, // CORRECTED: Use the destructured 'image' variable directly
      script,
      video,
    });

    // Save the document to the database
    await result.save();

    // Send the saved document as a JSON response with 201 status
    res.status(201).json(result);
  } catch (err) {
    // Log the full error for debugging and send a user-friendly error message
    console.error("Error saving generation:", err);
    res.status(500).json({ error: `Failed to save generation: ${err.message || 'Unknown error'}` });
  }
});

module.exports = router;

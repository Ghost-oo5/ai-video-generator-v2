const express = require("express")
const { Suplimax } = require("../Model/SuplimaxGeneration");


const router = express.Router();

router.get("/", async (req, res) => {
  const result = await Suplimax.find();
  res.send(result);
  res.send('suplimax');
});

router.post('/', async (req, res) => {
  try {
    const {
      inputs,           
      imagePrompt,      
      image,            
      imageDescription, 
      videoScript       
    } = req.body;

    const record = await Suplimax.create({
      inputs,
      imagePrompt,
      imageBase64: image,
      imageDescription,
      videoScript
    });

    res.status(201).json({ success: true, id: record._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save Suplimax generation' });
  }
});

module.exports =  router;

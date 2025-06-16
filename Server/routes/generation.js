const express = require("express");
const { Generations } = require("../Model/generations");
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await Generations.find();
  res.send(result);
});

router.post("/", async (req, res) => {
  const result = new Generations({
    type: req.body.type,
    image: req.body.image,
    script: req.body.script,
    video: req.body.video,
  });
  await result.save();
  res.send(result);
});

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  gamPratinidhiLogin
} = require("../controllers/gamPratinidhiLogin");

router.post("/login", gamPratinidhiLogin);

router.post("/add", async (req, res) => {
  const GamPratinidhi = require("../models/GamPratinidhi");
  try {
    const data = await GamPratinidhi.create(req.body);
    res.status(201).json({ message: "GamPratinidhi added", data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

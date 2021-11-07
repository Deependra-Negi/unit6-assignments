const express = require('express');
const router = express.Router();

const Music = require('../models/music.model');
const authenticate = require("../middleware/authenticate");

router.post("", async (req, res) => {
    const music = await Music.create(req.body);
    return res.status(201).send({ music });
});

router.get("", authenticate, async (req, res) => {
    const music = await Music.find().lean().exec();
    return res.status(200).json({ music });
})

module.exports = router;;
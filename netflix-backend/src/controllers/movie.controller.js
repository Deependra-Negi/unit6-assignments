const express = require('express');
const router = express.Router();

const Movie = require('../models/movie.model');

router.post("", async (req, res) => {
    const movie = await Movie.create(req.body);
    return res.status(201).send({ movie });
});

router.get("", async (req, res) => {
    const movie = await Movie.find().lean().exec();
    return res.status(200).send({ movie });
})
module.exports = router;
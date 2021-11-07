const express = require('express');
const router = express.Router();

const Series = require('../models/series.model');
const authenticate = require("../middleware/authenticate");


router.post("", async (req, res) => {
    const series = await Series.create(req.body);
    return res.status(201).send({ series });
});

router.get("", authenticate, async (req, res) => {
    //console.log('workinggggggggggg')
    const q = req.query.title;
    if (req.user.user.plan != "premium") {
                return res.status(400).send({ status: "failed", message: "You don't have a premium plan!" });
    }
    
    if (q) {
            console.log(q)
            const series = await Series.find({ title: q }).lean().exec();
            return res.status(200).send({ series });
    }
    //console.log('workingggggggggggg belowwwwwwww')
    const series = await Series.find().lean().exec();
    return res.status(200).send({ series });
});


module.exports = router;
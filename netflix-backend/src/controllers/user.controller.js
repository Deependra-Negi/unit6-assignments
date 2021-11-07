const express = require('express');
const router = express.Router();

const User = require('../models/user.model');

router.get("", async (req, res) => {
    const user = await User.find().lean().exec();
    return res.status(200).json({ user });
});

router.patch("", async (req, res) => {
    console.log(req.query)
    if (req.query.plan != 'basic' && req.query.plan != 'premium') {
        return res.status(400).send({status:"failed", message:"Somthing went wrong"})
    }
    const user = await User.findByIdAndUpdate(req.query.id, { plan: req.query.plan },{new:true});
    return res.status(201).json({user})
})

module.exports = router;;
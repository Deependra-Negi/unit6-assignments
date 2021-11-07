const mongoose = require('mongoose');

const seriesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    release_date: { type: String, required: false },
    genre: { type: String, required: false },
    rating: { type: Number, required: false },
    cast: [{ type: String, required: true }],
    director: { type: String, required: false },
    thumbUrl: { type: String, required: true },
    part:{type:Number, required: true,default:1},
    episode: { type: Number, required: true }
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model("series", seriesSchema);
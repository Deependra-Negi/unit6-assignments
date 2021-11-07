const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    release_date: { type: String, required: true },
    genre: { type: String, required: true },
    rating: { type: Number, required: true },
    cast: [{ type: String, required: true }],
    director: { type: String, required: true },
    thumbUrl: { type: String, required: true},
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model("movie", movieSchema);
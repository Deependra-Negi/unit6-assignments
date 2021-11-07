const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
    title:{ type: String, required: true},
    singer: { type: String, required: true },
    music : { type: String, required: false },
    lyricist: { type: String, required: false },
    genre: { type: String, required: false },
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model("music", musicSchema);
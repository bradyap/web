const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    urlId: {
        type: String,
    },
    origUrl: {
        type: String,
    },
    shortUrl: {
        type: String,
    },
    clicks: {
        type: Number,
        default: 0,
    },
    updated: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('url', urlSchema);
const mongoose = require('mongoose');

const pasteSchema = new mongoose.Schema({
    pasteId: {
        type: String,
    },
    data: {
        type: String,
    },
    url: {
        type: String,
    },
    clicks: {
        type: Number,
        default: 0,
    },
    date: {
        type: String,
        default: Date.now,
    },
});

module.exports = mongoose.model('paste', pasteSchema);
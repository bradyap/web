const mongoose = require("mongoose");

const pastedb = require("../../config.json");

mongoose.connect(pastedb.pastedb, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

module.exports = db;
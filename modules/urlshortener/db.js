const mongoose = require("mongoose");

const urldb = require("../../config.json");

mongoose.connect(urldb.urldb, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

module.exports = db;
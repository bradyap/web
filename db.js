const mongoose = require("mongoose");

const dburl = require("./config.json");

mongoose.connect(dburl.dburl, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

module.exports = db;
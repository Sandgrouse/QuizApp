// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Quiz Schema
const EpisodeSchema = new Schema({
    name: String,
    level: Number,
    lesson: Number
});

module.exports = Episode = mongoose.model('Episode', EpisodeSchema);

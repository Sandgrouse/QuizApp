// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Quiz Schema
const CourseSchema = new Schema({
    id: Number,
    name: String,
    episodes: Array
});

module.exports = Course = mongoose.model('Course', CourseSchema);

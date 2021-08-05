//TODO
const mongoose = require('mongoose');
const Faculty = require('./facultyModel');

const positionSchema = new mongoose.Schema({
    //TODO
});

const Position = mongoose.model('position', positionSchema);

module.exports = Position;

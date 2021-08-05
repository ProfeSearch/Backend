//TODO
const mongoose = require('mongoose');
const Student = require('./studentModel');

const applicationSchema = new mongoose.Schema({
    //TODO
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;

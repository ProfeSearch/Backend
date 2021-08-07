const mongoose = require('mongoose');
const Student = require('./studentModel');
const appStatusEnums = require('../enums/appStatusEnums');

const applicationSchema = new mongoose.Schema({
    position: {
        type: mongoose.Schema.ObjectId,
        ref: 'Position',
        required: [true, 'An application must be to a position'],
    },
    student: {
        type: mongoose.Schema.ObjectId,
        ref: 'Student',
        required: [true, 'An application must have an applicant'],
    },
    status: {
        type: String,
        set: (el) => appStatusEnums[el], // starts from -1
        required: [true, 'An application must have a status'],
    }
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;

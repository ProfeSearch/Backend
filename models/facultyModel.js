const mongoose = require('mongoose');
const validator = require('validator');
const fieldEnums = require('../enums/fieldEnums');
const univEnums = require('../enums/univEnums');

const facultySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A faculty must have an account!'],
    },
    name: {
        type: String,
    },
    //changed for enum
    institution: {
        type: String,
        set: (el) => univEnums[el],
        default: 'University Of Southern California',
    },
    post: {
        type: String,
        default: 'Faculty',
    },
    // changed for enum
    field: {
        type: String,
        set: (el) => fieldEnums[el],
        default: fieldEnums[8],
    },
    website: {
        type: String,
        validate: [validator.isURL, 'Invalid URL!'],
    },
    positions: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Position',
        },
    ],
});

facultySchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: '_id email',
    });
    next();
});

const Faculty = mongoose.model('Faculty', facultySchema);

module.exports = Faculty;

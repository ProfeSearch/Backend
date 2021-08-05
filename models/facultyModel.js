//TODO
const mongoose = require('mongoose');
const validator = require('validator');

const facultySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A faculty must have an account!'],
    },
    name: {
        type: String,
        required: [true, 'A faculty must have a name!'],
    },
    institution: {
        type: String,
        required: [true, 'A faculty must have an institution!'],
        default: 'University Of Southern California',
    },
    post: {
        type: String,
        required: [true, 'A faculty must have a post!'],
        enum: ['Professor','Assistant Professor', 'Faculty'],
        default: 'Faculty'
    },
    fields: {
        type: String,
        default: 'Computer Science',
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
});

const Faculty = mongoose.model('Faculty', facultySchema);

module.exports = Faculty;
